<template>
  <v-main style="height: 100%">
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <v-row class="justify-center">
        <v-col cols="12" md="12" v-if="!loading">

          <v-card class="elevation-12  rounded-xl">
            <!--          titulo -->
            <v-card-title class="justify-center align-center">
              <h2 class="headline mb-0">Ficha de Atención: {{ paciente.name }}</h2>
            </v-card-title>
            <!-- datos del paciente -->
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="paciente.name"
                      label="Nombre"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="paciente.rut"
                      label="RUT"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="paciente.phone"
                      label="Telefono"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="paciente.email"
                      label="Email"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="paciente.address"
                      label="Direccion"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="paciente.birthday"
                      label="Fecha de Nacimiento"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                  v-if="nuevoRegistroDisponible"
                  color="primary"
                  class="white--text"
                  @click="agregarRegistro"
              >
                Nuevo Registro
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12"  v-if="nuevoRegistro">
          <v-card class="elevation-12 rounded ">
            <v-card-title class="justify-center align-center">
              <h2 class="headline mb-0">Nuevo Registro</h2>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="registro.doctor"
                      label="Doctor"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                      v-model="registro.specialty"
                      label="Especialidad"
                      outlined
                      dense
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="12">
                  <v-textarea
                      v-model="registro.description"
                      label="Descripcion"
                      outlined
                      dense
                  ></v-textarea>
                </v-col>
              </v-row>

              <!--              botones para cancelar o guardar nuevo registro-->
              <v-card-actions>
                <v-btn
                    color="primary"
                    class="white--text"
                    outlined
                    @click="cancelNuevoRegistro"
                >
                  Cancelar
                </v-btn>
                <v-btn
                    color="primary"
                    class="white--text"
                    @click="guardarNuevoRegistro"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card-text>

          </v-card>
        </v-col>


        <v-col cols="12">


            <v-card class="elevation-12  rounded-xl ">

              <!--          lista de registros medico con expansion pannel-->
              <v-card-title class="justify-center align-center">
                <h2 class="headline mb-0">Registros de Atención</h2>
              </v-card-title>

                  <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item, i) in registros"
                        :key="i"
                    >
                      <v-expansion-panel-header>
                        {{ item.doctor_name }} - {{ item.specialty_name }} - {{ formatDate(item.created_at) }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" md="6" lg="4">
                              <v-text-field
                                  v-model="item.doctor_name"
                                  label="Gestión"
                                  outlined
                                  dense
                                  readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="4">
                              <v-text-field
                                  v-model="item.specialty_name"
                                  label="Departamento"
                                  outlined
                                  dense
                                  readonly
                              ></v-text-field>
                            </v-col>
<!--                            update_at-->
                            <v-col cols="12" md="6" lg="4">
                              <v-text-field
                                  :value="formatDate(item.created_at)"
                                  label="Fecha"
                                  outlined
                                  dense
                                  readonly
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="12" lg="12">
                              <v-textarea
                                  v-model="item.description"
                                  label="Descripcion"
                                  outlined
                                  dense
                                  readonly
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-expansion-panel-content>



                    </v-expansion-panel>
                  </v-expansion-panels>


            </v-card>

        </v-col>
        <v-col cols="12" md="6" v-if="loading">
          <v-card class="elevation-12 rounded ">
            <v-card-title class="justify-center align-center">
              <h2 class="headline mb-0">Cargando...</h2>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
          v-model="showMessage"
          vertical
          bottom
          center
          :color="messageColor"
      >
        <p class="mb-0">{{ message }}</p>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import {format, validate} from 'rut.js';
import moment from "moment";
import {
  createMedicalRecord,
  getMedicalRecords,
  getPatientById,
  getSpecialtyById,
  } from "@/helpers/api/horas_medicas";
import Swal from "sweetalert2";

export default {
  name: "Ficha",
  data: () => {
    return {
      date: null,
      days: [{value: "monday", text: "Lunes"}, {value: "tuesday", text: "Martes"}, {
        value: "wednesday",
        text: "Miércoles"
      }, {value: "thursday", text: "Jueves"}, {value: "friday", text: "Viernes"}, {
        value: "saturday",
        text: "Sabado"
      }, {value: "sunday", text: "Domingo"}],
      dialog: false,
      doctor: "",
      especialidad: {},
      events: [],
      filteredDoctors: [],
      filteredSpecialties: [],
      focus: '',
      formTitle: '',
      id: "",
      isEditing: false,
      loading: false,
      medico: {},
      menu: false,
      menu2: false,
      menu3: false,
      message: "",
      messageColor: "",
      registro: {},
      nuevoRegistro: false,
      nuevoRegistroDisponible: false,
      paciente: {},
      recurringSchedules: [],
      registros: [],
      rut: "",
      rutRules: [
        v => !!v || "Rut es requerido",
        v => validate(v) || "Rut no es valido"
      ],
      search: "",
      selectedElement: null,
      selectedEvent: {},
      selectedOpen: false,
      showMessage: false,
      step: 1,
      type: 'week',
      typeToLabel: {
        // month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        // '4day': '4 Days',
      },
      valid: false
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
    } else {
      this.id = this.$store.state.patientData.id
    }
    this.getPaciente()
    this.medicalRecord()
    this.getEspecialidad()
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    },
    async getEspecialidad() {
      let id_especialidad;
      if(this.$route.query.especialidad ) {
        id_especialidad = this.$route.query.especialidad
      } else {
        id_especialidad = this.$store.state.patientData.specialty_id
      }
      getSpecialtyById(id_especialidad).then(res => {
        this.especialidad = res.especialidades[0]
      })
    },
    async medicalRecord() {
      this.loading = true
      await getMedicalRecords(this.id).then(res => {
        this.registros = res.medicalRecords
        this.nuevoRegistroDisponible = res.canAddMedicalRecord
        console.log(res)
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.showMessage = true
        this.message = "Error al cargar registros"
        this.messageColor = "error"
      })
    },
    guardarNuevoRegistro() {
      const data = {
        id_patient: this.id,
        id_doctor: this.$store.state.userData.id,
        id_specialty: this.especialidad.id,
        description: this.registro.description
      }

      createMedicalRecord(data).then(res => {
        Swal.fire({
          title: 'Registro guardado',
          icon: 'success',
          confirmButtonText: 'Aceptar',


        }).then(() => {
          this.nuevoRegistro = false
          this.registro = {}
          this.medicalRecord()
        })
       }).catch(err => {
         Swal.fire({
           title: 'Error al guardar registro',
           icon: 'error',
           confirmButtonText: 'Aceptar'
         })
       })
    },
    cancelNuevoRegistro() {
      this.nuevoRegistro = false
      this.registro = {}
    },
    async getPaciente() {
      await getPatientById(this.id).then(response => {
        this.paciente = response
        this.loading = false
      }).catch(error => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal!',
        })
      })
    },
    agregarRegistro() {
      this.nuevoRegistro = true
      this.registro = {
        doctor: this.$store.state.userData.name,
        specialty: this.especialidad.name
      }
    },
  }
}
</script>

<style scoped>
.v-main {
 padding: 0 !important;
}
.zind9999999 {
  z-index: 9999999 !important;
  background-color: red;
}
</style>
