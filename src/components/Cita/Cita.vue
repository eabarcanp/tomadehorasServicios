<template>
  <v-main>
    <!--  landing con dos step, el primero es para consultar rut y el segundo para ver o anular cita medica -->
    <v-container fluid class="justify-center align-cente fill-height gradientBackground">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" >
          <v-stepper v-model="e1" vertical class="mt-5" style="border-radius: 15px">
            <v-stepper-step :complete="e1 > 1" step="1">
              Consulta de Cita Reservada
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-text-field
                        v-model="rut"
                        label="Rut"
                        :rules="rutRules"
                        outlined
                        dense
                        @keyup="formatRut()"
                        required
                    ></v-text-field>
                    <v-btn color="primary" @click="buscarCita" :disabled="!rutValido">Buscar</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-stepper-content>
            <v-stepper-step :complete="e1 > 2" step="2">
              Cita
            </v-stepper-step>
            <v-stepper-content step="2">
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" lg="6" v-for="(cita, index) in citas" :key="index">
                      <v-card
                          class="mx-auto"
                          max-width="344"
                          outlined
                      >
                        <v-card-title class="headline"
                                      style="word-break: break-word; text-align: center">
                          {{ cita.doctor_name }}
                        </v-card-title>
                        <v-card-subtitle>
                          {{ cita.specialty_name }}
                          <strong>{{ cita.telemedicine ?
                              'Telemedicina' :
                              'Presencial'
                          }}</strong>
                        </v-card-subtitle>
                        <v-card-text>
                          {{ formatDate(cita.date) }}
                        </v-card-text>
                        <v-card-text>
                          {{ cita.start_time }}
                        </v-card-text>
                        <v-card-actions
                          class="d-flex justify-start flex-wrap align-center"
                          >

                          <v-btn
                              color="blue"
                              text
                              outlined
                              @click="anularCita(cita)"
                              class="ma-2"
                          >
                            Anular
                          </v-btn>
                          <v-btn
                              color="blue"
                              dark
                              @click="confirmarCita(cita)"
                          >
                            Confirmar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6" v-if="citas.length === 0">
                      <v-card
                          class="mx-auto"
                          max-width="344"
                          outlined
                      >
                        <v-card-title class="headline">
                          No se encontraron citas
                        </v-card-title>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-btn color="primary" @click="volverAtras">Volver</v-btn>
                    </v-col>


                  </v-row>
                </v-card-text>
              </v-card>
            </v-stepper-content>
          </v-stepper>
        </v-col>

      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {format, validate} from "rut.js";
import {confirmAppointment, deleteAppointment, getAppointmentByRut} from "@/helpers/api/horas_medicas";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "Cita",
  data() {
    return {
      e1: 1,
      rut: "",
      rutRules: [
        v => !!v || "Rut es requerido",
        v => validate(v) || "Rut no es valido"
      ],
      citas: [],
      id_cita: null,
      documents: "",
      rutValido: false,
      loading: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.id_cita = this.$route.params.id;
    }
    if (this.$route.query.rut) {
      this.rut = this.$route.query.rut;
      this.buscarCita();
    }
  },
  methods: {
    formatRut() {
      this.rut = format(this.rut)
      this.rutValido = validate(this.rut)
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY")
    },
    buscarCita() {
      const data = {
        rut: this.rut,
        id_appointment: this.id_cita
      };
      getAppointmentByRut(data).then(response => {
        this.citas = response.data
        this.e1 = 2
      }).catch(error => {
        console.log(error)
      })
    },
    volverAtras() {
      this.e1 = 1
      this.citas = []
    },
    async anularCita(item) {
      Swal.fire({
        title: '¿Está seguro de anular la cita?',
        html: `<p>Fecha: <b>${this.formatDate(item.date)}</b></p>
        <p>Hora: <b>${item.start_time}</b></p>
        <p>Gestión: <b>${item.doctor_name}</b></p>
        <p>Área: <b>${item.specialty_name}</b></p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, anular cita!'
      }).then((result) => {
        if (result.value) {
          deleteAppointment(item.id).then(response => {
            Swal.fire(
                'Anulado!',
                'La cita ha sido anulada.',
                'success'
            )
            this.volverAtras()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    async confirmarCita(item) {
      const docs =  item.required_documents ? item.required_documents.split('#*#') : []
      const concatenatedString = docs.map(str => `<li style="margin-top: 5px; ">• ${str}</li>`).join("");
      console.log(docs);
      Swal.fire({
        title: '¿Está seguro de confirmar la cita?',
        html: `<p>Fecha: <b>${this.formatDate(item.date)}</b></p>
        <p>Hora: <b>${item.start_time}</b></p>
        <p>Gestión: <b>${item.doctor_name}</b></p>
        <p>Área: <b>${item.specialty_name}</b></p>
        <p>Requisitos:</p>
        <ul style="text-align: justify;">
          ${concatenatedString}
        </ul>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmar cita!'
      }).then((result) => {
        if (result.value) {
          confirmAppointment(item.id).then(response => {
            Swal.fire(
                'Confirmado!',
                'La cita ha sido confirmada.',
                'success'
            )
            this.volverAtras()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    }
  }
};


</script>

<style scoped>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%,  #318BFD 100%);
  overflow-y: scroll;
}
.lista-docs {
  text-align: left;
  list-style: circle;
}
</style>
