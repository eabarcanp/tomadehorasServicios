<template>
  <v-main style="height: 100%">
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <v-snackbar
          v-model="showMessage"
          vertical
          bottom
          center
          :color="messageColor"
      >
        <p class="mb-0">{{ message }}</p>
      </v-snackbar>

        <v-row class="justify-center" :class="{'datos-personales': this.step == 2 }">                                      
        <v-col cols="1" md="2" lg="3" class="ma-0 pa-0 d-flex justify-end align-start mt-10 pt-10 ">
          <v-btn
              height="80"
              elevation="4"
              tile
              color="grey darken-1"
              class="white--text d-none d-md-flex"
              style="border-radius: 10px 0 0 10px"
              @click="subsStep()"
              v-if="step > 1"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" md="8" lg="6" class="ma-0 pa-0">
      
          <v-card class="elevation-12 rounded-xl" :class="{'card-reserva': this.step == 5}">
            <v-row class="justify-center ">
        <img style="opacity:1" src="../../assets/servicio.jpg"  alt="" width="259" />
      </v-row>    
            <v-card-title class="justify-start align-center ma-2">
              <v-icon
                  color="blue"
                  size="40"
                  class="d-none d-md-flex"
              >
                {{ switchIcon() }}
              </v-icon>
              <v-btn
              height="65"
              elevation="0"
              color="transparent"
              class="primary--text d-md-none"
              style="border-radius: 50px;"
              @click="subsStep()"
              v-if="step > 1">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
              <h3 class=" ma-2 mx-4 card-title">
                {{ switchTitle() }}
              </h3>
            </v-card-title>
            <hr>
            <v-card-text class="justify-center align-center">
              <v-form
                  ref="form"
                  v-model="valid"
                  class="justify-center align-center"
              >
                <!--              step 1, ingresar rut-->
                <v-row class="justify-center align-center" v-if="step === 1">
                  <v-col cols="12" sm="8" md="6" class="justify-center align-center d-flex flex-column">
                    <v-col cols="12" sm="12" md="12" class="justify-center align-center d-flex">

                      <v-text-field
                          v-model="patient.rut"
                          :rules="rutRules"
                          label="Ingrese su rut"
                          required
                          dense
                          clearable
                          @keyup="(rut) => {formatRut(patient.rut)}"
                          v-if="step === 1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6" class="justify-center align-center d-flex">
                      <v-btn
                          color="primary"
                          class="white--text"
                          @click="searchRut"
                          outlined
                          rounded
                          :disabled="loading || !validRut"
                      >
                        Reservar
                      </v-btn>
                    </v-col>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center" v-if="step === 2">
                  <v-col cols="12" sm="12" md="12" class="justify-center align-center d-flex flex-row flex-wrap">
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                          v-model="patient.name"
                          :rules="nombreRules"
                          label="Nombre"
                          required
                          clearable
                          outlined
                          dense
                          class="inputForm"
                          :disabled="!isEditPatient"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-menu
                          ref="menuBirth"
                          v-model="menuBirth"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="patient.birthday"
                              label="Fecha de Nacimiento"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                              class="inputForm"

                              dense
                              :disabled="!isEditPatient"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="patient.birthday"
                            :active-picker.sync="activePicker"
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            min="1940-01-01"
                            @change="saveDateBirth"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                          v-model="patient.phone"
                          :rules="telefonoRules"
                          label="Telefono"
                          required
                          clearable
                          class="inputForm"
                          outlined
                          dense
                          :disabled="!isEditPatient"
                          placeholder="Ej: 56912345678"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                          v-model="patient.email"
                          :rules="emailRules"
                          label="Email"
                          required
                          clearable
                          outlined
                          class="inputForm"
                          dense
                          :disabled="!isEditPatient"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                          v-model="patient.address"
                          :rules="direccionRules"
                          label="Direccion"
                          required
                          clearable
                          class="inputForm"
                          outlined
                          dense
                          :disabled="!isEditPatient"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="10" sm="6" md="5" class="justify-space-around align-center d-flex flex-row flex-wrap">
                      <v-btn
                          v-show="!isNewPatient"
                          color="primary"
                          class="white--text"
                          @click="isEditPatient = !isEditPatient"
                          outlined
                          rounded
                          block
                          :disabled="loading || !validRut"
                      >
                        <v-icon>mdi-square-edit-outline</v-icon>
                        Editar datos
                      </v-btn>
                    </v-col>
                    <v-col cols="10" sm="6" md="5" class="justify-space-around align-center d-flex flex-row flex-wrap">
                      <v-btn
                          color="primary"
                          class="white--text"
                          @click="() => {isEditPatient ? createPaciente() : nextStepSpecialty()}"
                          rounded
                          block
                          :disabled="!patient.name || !patient.birthday || !patient.phone || !patient.email || !patient.address || loading || !validRut"
                      >
                        Siguiente
                      </v-btn>
                    </v-col>
                  </v-col>
                </v-row>
<!--                step 3, seleccionar presencial o telemedicina -->
                <v-row
                    class="justify-center align-center"
                    v-if="step === 3"
                >
                  <v-col cols="12" sm="12" md="12" class="justify-center align-center d-flex flex-row flex-wrap">
                    <v-col cols="12" sm="6" md="6" class="justify-center align-center d-flex flex-row flex-wrap">
                      <v-btn
                          color="primary"
                          class="white--text"
                          @click="() => {nextStepTeleOrPresencial(false)}"
                          rounded
                          block
                      >
                        Presencial
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="justify-center align-center d-flex flex-row flex-wrap">
                      <v-btn
                          color="primary"
                          class="white--text"
                          @click="() => {nextStepTeleOrPresencial(true)}"
                          rounded
                          block
                      >
                        Telemática
                      </v-btn>
                    </v-col>
                  </v-col>
                </v-row>

                <!--              step 4, seleccionar especialidad-->
                <v-row class="justify-center align-center" v-if="step >= 4">
                  <v-col cols="12" sm="10" md="10">
                    <div
                        class="black--text font-weight-medium"
                    >
                      {{ patient.name }} | {{ patient.rut }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="10" md="10">
                    <v-row v-if="step === 4">
<!--                      <v-col cols="12" class="">-->
<!--                        <v-text-field-->
<!--                            v-model="search"-->
<!--                            append-icon="mdi-magnify"-->
<!--                            label="Buscar Especialidad"-->
<!--                            single-line-->
<!--                            hide-details-->
<!--                            dense-->
<!--                            outlined-->
<!--                            class="inputForm"-->
<!--                            @keyup="searchEspecialidad"-->
<!--                            :disabled="loading"-->
<!--                        ></v-text-field>-->
<!--                      </v-col>-->
                      <hr class="hrForm">
                      <v-col cols="12" class="">
                        <v-row>
                          <div v-for="(item, i) in filteredSpecialities"
                               :key="i"
                               @click="() => {
                              !loading && selectSpeciality(item)}"
                               class="chips"
                               :style="{backgroundColor: item.color}">
                            {{ item.name }}
                          </div>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <hr v-if="step >= 5">
                <!--              step 5, doctores de la especialidad-->
                <v-row class="justify-center align-center" v-if="step >= 5">

                  <v-col cols="12" sm="12" md="12">
                    <v-row v-if="step === 5" style="width: 100%" class="d-flex justify-center align-center">
                      <!--                      titulo para presencial-->
                      <v-col cols="12" md="12" class="d-flex justify-center align-center flex-row flex-wrap"
                             v-if="filteredDoctors.length > 0">
                        <v-col cols="12" sm="12" md="12" lg="12"
                               class="d-flex justify-center align-center"
                               v-for="(item, i) in filteredDoctors">
                          <v-row class="d-flex justify-center align-center" :key="i">
                            <v-col cols="12" md="5" class="d-flex align-center">
                              <div  class="rounded-xl justify-center align-center d-flex"
                                   style="width: 100px; height: 100px; background-color: #e0e0e0; overflow: hidden">
                              <v-img
                                  :src="item.avatar"
                                  width="100"
                                  height="100"
                                  v-if="item.avatar"
                              ></v-img>
                                <v-icon v-else class="white--text" style="font-size: 80px">mdi-account</v-icon>
                              </div>

                              <div class="d-flex justify-center align-start flex-column mx-2">
                                <div
                                    style="word-break: break-word;"
                                    class="font-weight-medium black--text"
                                >
                                  {{ item.name }}
                                </div>
                                <div
                                    class="font-weight-medium black--text"
                                    style="word-break: break-word;">
                                  {{ especialidad.name }}
                                </div>
                              </div>
                            </v-col>
                            <v-col cols="12" md="4" class="d-flex justify-center align-center flex-column">
                              <div v-if="item.slots">
                                {{ formatDate(item.slots) }}
                              </div>
                              <v-btn
                                  color="blue"
                                  class="white--text mt-2"
                                  @click="() => {!loading && selectHour(item)}"
                                  rounded
                                  v-if="item.slots"
                              >
                                Seleccionar
                              </v-btn>
                            </v-col>
                            <v-col cols="3" class="d-flex justify-center align-center flex-column">
                              <v-btn
                                  color="blue"
                                  class="white--text"
                                  @click="() => {
                              !loading && selectDoctor(item)}"
                                  outlined
                              >
                                <v-icon
                                    class="mr-2"
                                >mdi-calendar-month-outline
                                </v-icon>
                                Ver Agenda
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!--                v-if si no hay doctores disponibles para la especialidad-->
                <v-row v-if="step === 5 && filteredDoctors.length === 0 && filteredDoctorsTelemedicine.length === 0">
                  <v-col cols="12" class="d-flex justify-center align-center">
                    <span class="text-h6">
                      No hay atenciones disponibles para esta categoría
                    </span>
                  </v-col>
                </v-row>
                <!--              step 6, lista de horas disponibles-->
                <v-row class="d-flex justify-center align-center" v-if="step >= 6">
                  <v-col cols="12" md="6" class="d-flex justify-center align-center flex-column">
                    <v-date-picker
                        v-model="selectedDate"
                        :min="minDate"
                        :max="maxDate"
                        @change="getAvailableHours"
                        locale="es-cl"
                        :no-title="true"
                        :events="schedulesDays"
                        event-color="green lighten-1"
                    ></v-date-picker>
                  </v-col>
                  <v-col cols="12" md="6" class="d-flex justify-center align-center flex-column">
                    <v-select
                        v-model="selectedEvent"
                        :items="availableHours"
                        :item-text="item => item.start"
                        :item-value="item => item"
                        :label="selectedEvent.name ? 'Hora Seleccionada' : 'Seleccione una hora'"

                        :rules="[v => !!v || 'Seleccione una hora']"
                        outlined
                        dense
                        :prepend-inner-icon="selectedEvent.name ? 'mdi-check' : 'mdi-clock-outline'"
                        @change="() => {logger(selectedEvent)}"
                        v-if="!loading && availableHours.length > 0"
                    ></v-select>
<!--                    texto que indica que no hay horas disponibles -->
                    <span v-if="!loading && availableHours.length === 0" class="text-h6">
                      No hay horas disponibles para esta fecha
                    </span>
                    <v-progress-circular
                        v-if="loading"
                        indeterminate
                        color="primary"
                        size="64"
                    ></v-progress-circular>
                    <v-btn
                        color="primary"
                        class="white--text"
                        @click="() => { !loading && takeHour()}"
                        :disabled="!selectedEvent.name"
                        v-if="!loading"
                    >
                      Aceptar
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center" v-if="loading">
                  <v-col cols="12" sm="4" md="4" class="justify-center align-center">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        class="mb-4"
                    ></v-progress-circular>
                  </v-col>
                </v-row>


              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"  md="2" lg="3">

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {validate, format} from 'rut.js';
import moment from "moment";
import {
  createAppointment,
  createPatient, getBookingSlotsByDoctor,
  getBookingSlotsBySpecialty,
  getListSpecialties,
  getPatientByRut,
  getGeneralParams,
  sendWhatsapp
} from "@/helpers/api/horas_medicas";
import Swal from "sweetalert2";

export default {
  name: "Horas",
  data: () => {
    return {
      activePicker: null,
      date: null,
      dialogPaciente: false,
      isNewPatient: false,
      titleDialogPaciente: "Nuevo Usuario",
      isEditPatient: true,
      direccion: "",
      direccionRules: [
        v => !!v || "Direccion es requerido"
      ],
      doctor: "",
      doctores: [],
      doctoresTelemedicine: [],
      email: "",
      emailRules: [
        v => !!v || "Email es requerido",
        v => /.+@.+\..+/.test(v) || "Email debe ser valido"
      ],
      especialidad: "",
      especialidades: [],
      events: [],
      filteredDoctors: [],
      filteredDoctorsTelemedicine: [],
      filteredSpecialities: [],
      focus: '',
      from: null,
      horas: [],
      loading: false,
      menu: false,
      menuBirth: false,
      message: "",
      messageColor: "",
      nacimiento: "",
      nacimientoRules: [
        v => !!v || "Fecha de nacimiento es requerido"
      ],
      nombre: "",
      nombreRules: [
        v => !!v || "Nombre es requerido"
      ],
      page: 1,
      patient: {
        rut: "",
        name: "",
        email: "",
        birthday: "",
        address: "",
        phone: ""

      },
      availableHours: [],
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      rut: "",
      rutRules: [
        v => !!v || "Rut es requerido",
        v => validate(v) || "Rut no es valido"
      ],
      search: "",
      searchType: "",
      selectedElement: null,
      selectedEvent: {},
      selectedOpen: false,
      selectedHour: {},
      showMessage: false,
      selectedDate: null,
      step: 1,
      telefono: "",
      telefonoRules: [
        v => !!v || "Teléfono es requerido",
        v => /^569\d{8}$/.test(v) || "Teléfono no es valido"
      ],
      schedulesDays:  [],
      telemedicina: false,
      to: null,
      type: 'week',
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().substr(0, 10),
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        '4day': '4 Days',
      },
      valid: false,
      validRut: false,
      weekPage: 0,
      enable_telemedicine: null,
    }
  },
  mounted() {
    this.from = moment().startOf('week').add(this.weekPage, 'week').format('YYYY-MM-DD')
    this.to = moment(this.from).add(30, 'days').format('YYYY-MM-DD')

    this.checkTelemedicine()
  },
  watch: {
    menuBirth(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    step(val) {
        if (val === 1) {
        this.patient = {
        rut: "",
        name: "",
        email: "",
        birthday: "",
        address: "",
        phone: ""
      }
      }
    }
  },

  methods: {
    setGeneralParams() {
getGeneralParams().then((res) => {
          this.$store.commit("setGeneralParams", res);
          this.enable_telemedicine = res[1].value
        });
    },

    randomColor() {
      const listColor = [
        "#c488d7",
        "#719acc",
        "#7b68d0",
        "#6fc16d",
        "#81c8ba"
      ]
      return listColor[Math.floor(Math.random() * listColor.length)]
    },
    switchTitle() {
      switch (this.step) {
        case 1:
          return "RESERVAR HORA SERVICIOS";
        case 2:
          return "DATOS PERSONALES"
        case 4:
          return "SELECCIONAR UNA CATEGORIA"
        case 5:
          return "SELECCIONAR UNA CATEGORIA"
        case 6:
          return "SELECCIONAR UN HORARIO"
        default:
          return "RESERVAR HORA SERVICIOS"
      }
    },
    switchIcon() {
      switch (this.step) {
        case 1:
          return "mdi-comment-text-multiple-outline"
        case 2:
          return "mdi-account"
        case 4:
          return "mdi-account-group"
        case 5:
          return "mdi-account-group"
        case 6:
          return "mdi-calendar-clock"
        default:
          return "mdi-comment-text-multiple-outline"
      }
    },
    validate,
    checkTelemedicine() {
      this.setGeneralParams()
    },
    saveDateBirth(date) {
      this.$refs.menuBirth.save(date)
    },
    cancelDialogPaciente() {
      this.dialogPaciente = false;
      this.isNewPatient = false;
      this.isEditPatient = false;
      this.titleDialogPaciente = "Nuevo Usuario";
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    createPaciente() {
      this.loading = true;
      let data = {
        rut: this.patient.rut,
        name: this.patient.name,
        email: this.patient.email,
        phone: this.patient.phone,
        address: this.patient.address,
        birthday: this.patient.birthday,
      };
      createPatient(data).then(async (response) => {
        this.loading = false;
        //this.patient = response
        if (this.isNewPatient) {
        await Swal.fire({
          title: 'Usuario creado',
          text: 'Usuario creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        } else if (!this.isNewPatient) {
            await Swal.fire({
              title: "Usuario Editado",
              text: "Usuario Editado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          }
        await this.nextStepSpecialty();


      }).catch((error) => {
        this.loading = false;
        console.log(error);
      });

      this.loading = false;
    },
    async getEspecialidades() {
      this.loading = true;
      getListSpecialties().then((response) => {
        this.especialidades = response.especialidades.map((item) => {
          return {
            ...item,
            color: this.randomColor()
          }
        });
        this.filteredSpecialities = this.especialidades;
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      })
    },
    async getAvailableHours(e) {
      this.loading = true
      let horas = [];
      let events = [];
      this.availableHours = [];
      this.selectedEvent = {};
      let params = {
        doctor_id: this.doctor.id_doctor,
        specialty_id: this.especialidad.id,
        from: e,
        to: e,
        telemedicine: this.telemedicina
      }
      await getBookingSlotsByDoctor(params).then(response => {
        horas = response.availableSlots;
        horas.length > 0 && horas.forEach(item => {
          let dates = [];
          let from = moment(e);
          let to = moment(e);
          while (from.isSameOrBefore(to)) {
            dates.push(
                {
                  day: from.format("YYYY-MM-DD"),
                  dayNumber: from.format("d"),
                });
            from.add(1, 'days');
          }
          let date = dates.find(date => date.dayNumber === item.day);
          date && item.slots.forEach(slot => {

            let starts_at = moment(date.day + " " + slot, "YYYY-MM-DD HH:mm");
            let ends_at = moment(date.day + " " + slot, "YYYY-MM-DD HH:mm").add(15, 'minutes');
            if (starts_at.isAfter(moment())) {
              events.push({
                start: starts_at.format("YYYY-MM-DD HH:mm"),
                end: ends_at.format("YYYY-MM-DD HH:mm"),
                color: 'primary',
                timed: true,
                id_schedule: item.id_schedule,
                id_doctor: item.id_doctor,
                id_specialty: item.id_specialty,
                name: this.especialidad.name + " - " + (item.telemedicine ? "Telemática" : "Presencial"),
                details: `Categoría: ${this.especialidad.name} - Horario: ${moment(starts_at).format("HH:mm")} - ${moment(ends_at).format("HH:mm")}`,
                telemedicine: item.telemedicine
              })
            }
          })
        })
        if(response.schedulesDays && response.schedulesDays.length > 0){
          let dates = [];
          let eventsDates = [];
          let from = moment().add(1, 'days');
          let to = moment().add(30, 'days');
          while (from.isBefore(to)) {
            dates.push(
                {
                  day: from.format("YYYY-MM-DD"),
                  dayNumber: from.format("d"),
                });
            from.add(1, 'days');
          }
          // filter dates with schedulesDays
          dates = dates.filter(date => response.schedulesDays.some(schedule => schedule === date.dayNumber))
          dates.forEach(day => {
            let starts_at = moment(day.day , "YYYY-MM-DD");
            if (starts_at.isAfter(moment())) {
              eventsDates.push(starts_at.format("YYYY-MM-DD"))
            }
          })
          this.schedulesDays = eventsDates
        }
        if (events.length > 0) {
          this.availableHours = events;
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    async getHorarios(dif) {

      this.loading = true;
      let events = [];
      let horas = [];
      let color = 'primary';
      this.weekPage = this.weekPage + dif;

      let data = {
        specialty_id: this.especialidad.id,
        from: moment().startOf('week').add(this.weekPage, 'week').format('YYYY-MM-DD'),
        to: moment().endOf('week').add(this.weekPage, 'week').format('YYYY-MM-DD'),
        doctor_id: this.doctor.id_doctor,
        telemedicine: this.telemedicina
      }

      await getBookingSlotsByDoctor(data).then(response => {
        horas = response.availableSlots;
        horas.forEach(item => {
          let dates = [];
          let from = moment(data.from);
          let to = moment(data.to);
          while (from.isBefore(to)) {
            dates.push(
                {
                  day: from.format("YYYY-MM-DD"),
                  dayNumber: from.format("d"),
                });
            from.add(1, 'days');
          }
          item.slots.forEach(slot => {
            let date = dates.find(date => date.dayNumber === item.day);
            let starts_at = moment(date.day + " " + slot, "YYYY-MM-DD HH:mm");
            let ends_at = moment(date.day + " " + slot, "YYYY-MM-DD HH:mm").add(15, 'minutes');
            if (starts_at.isAfter(moment())) {
              events.push({
                start: starts_at.format("YYYY-MM-DD HH:mm"),
                end: ends_at.format("YYYY-MM-DD HH:mm"),
                color: color,
                timed: true,
                id_schedule: item.id_schedule,
                id_doctor: item.id_doctor,
                id_specialty: item.id_specialty,
                name: this.especialidad.name + " - " + (item.telemedicine ? "Telemática" : "Presencial"),
                details: `Categoría: ${this.especialidad.name} - Horario: ${moment(starts_at).format("HH:mm")} - ${moment(ends_at).format("HH:mm")}`,
                telemedicine: item.telemedicine
              })
            }
          })
        })
        this.events = events;
        this.loading = false;
      }).catch(error => {
        console.log(error);
        this.loading = false;
      })
    },
    updateRange({start, end}) {
      //this.getHorarios()
    },
    logger(e) {
      console.log(e)
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    async prev() {
      if (this.weekPage > 0) {
        this.loading = true;
        await this.getHorarios(-1);
        this.loading = false;
        this.$refs.calendar.prev()
      }
    },
    async next() {
      this.loading = true;
      await this.getHorarios(1);
      this.loading = false;
      this.$refs.calendar.next()
    },

    formatDate(slots) {
      let day = moment().format('d')
      if (slots.day < day) {
        return `${moment().add(1, 'week').day(slots.day).locale('es').format('DD-MM-YYYY')} / ${slots.slot}`
        // moment().add(1, 'week').day(slots.day).locale('es').format('dddd DD-MM-YYYY') + '/' + slots.slot
      } else {
        return `${moment().add(1, 'day').day(slots.day).locale('es').format('DD-MM-YYYY')} / ${slots.slot}`
        // moment().add(1, 'day').day(slots.day).locale('es').format('dddd DD-MM-YYYY') + '/' + slots.slot
      }
    },
    clearRut() {
      this.patient.rut = "";
      this.validRut = false;
      this.step = 1;
    },
    formatRut(rut) {
      this.patient.rut = format(rut)
      this.validRut = validate(this.patient.rut)
    },
    clearSpeciality() {
      this.especialidad = "";
      this.step = 2;
    },
    clearDoctor() {
      this.doctor = "";
      this.step = 3;
    },
    async searchRut() {
      this.loading = true;
      await getPatientByRut(this.patient.rut)
          .then(response => {
            this.loading = false;
            if (response.id) {
              this.patient = response;
              this.isEditPatient = false;
              this.isNewPatient = false;
              this.step = 2;
            } else {
              this.isNewPatient = true;
              this.isEditPatient = true;
              this.step = 2;
            }

          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
    },

    async nextStepSpecialty() {
      await this.checkTelemedicine();
      if(this.enable_telemedicine == 1){
        this.step = 3;
      }else{
        await this.getEspecialidades();
        this.step = 4;
      }
    },
    nextStep() {
      this.step++;
    },
    async nextStepTeleOrPresencial(e) {
      this.telemedicina = e;
      await this.getEspecialidades();
      this.step = 4;
    },

    async selectSpeciality(item) {
      this.especialidad = item;
      if(this.especialidad.name === "Defensoria a tu casa"){
        await Swal.fire({
          title: 'Requisitos para Defensoria a tu casa',
          html: '<ul><li>1.- Ser adulto mayor</li>' +
              '<li>2.- Encontrarse en situación de discapacidad</li>' +
              '<li>3.- Movilidad reducida</li>' +
              '<li>4.- Tratarse de consulta jurídica o legal</li>' +
              '*Requisitos no copulativos. Es suficiente uno de ellos.' +
              '</ul>',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
      this.search = "";
      this.loading = true;
      let data = {
        from: moment().format('YYYY-MM-DD') + 'T' + moment().format('HH:mm:ss'),
        to: moment().add(7, 'days').format("YYYY-MM-DD") + 'T23:59:59',
        specialty_id: this.especialidad.id,
        telemedicine: this.telemedicina
      }
      await getBookingSlotsBySpecialty(data).then(response => {
        this.doctores = response.data;
        this.filteredDoctors = response.data;
        this.loading = false;
        this.nextStep();
      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
      // if (this.enable_telemedicine) {
      //   data.telemedicine = true;
      //   await getBookingSlotsBySpecialty(data).then(response => {
      //     this.doctoresTelemedicine = response.data;
      //     this.filteredDoctorsTelemedicine = response.data;
      //     this.loading = false;
      //   }).catch(error => {
      //     console.log(error);
      //     this.loading = false;
      //   });
      // }
    },
    obtainDoctors(horas) {
      let doctors = [];
      horas.forEach(item => {
        //  verificar si el doctor ya está en el array
        let doctor = doctors.find(doctor => doctor.id === item.resources[0].id);
        if (!doctor) {
          doctors.push({
            id: item.resources[0].id,
            name: item.resources[0].name,
            starts_at: item.starts_at,
            ends_at: item.ends_at,
          })
        }
        //  si esta, verificar la hora de inicio es menor a la hora de inicio del doctor
        else {
          let doctorIndex = doctors.findIndex(doctor => doctor.id === item.resources[0].id);
          let doctorStart = moment(doctor.starts_at).format("HH:mm");
          let itemStart = moment(item.starts_at).format("HH:mm");
          if (doctorStart > itemStart) {
            doctors[doctorIndex].starts_at = item.starts_at;
          }
        }
      })
      this.doctores = doctors;
      this.filteredDoctors = this.doctores;
      this.nextStep();
    }
    ,
    async selectDoctor(item ) {
      this.focus = "";
      this.weekPage = 0;
      this.doctor = item;
      this.search = ""
      this.loading = true;
      this.schedulesDays = [];
      this.availableHours = [];
      let events = [];
      let color = 'primary';
      let data = {
        specialty_id: this.especialidad.id,
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
        doctor_id: this.doctor.id_doctor,
        telemedicine: this.telemedicina
      }
      await getBookingSlotsByDoctor(data).then(response => {
        response.availableSlots.length > 0 &&  response.availableSlots.forEach(item => {
          let dates = [];
          let from = moment(data.from);
          let to = moment(data.to);
          while (from.isBefore(to)) {
            dates.push(
                {
                  day: from.format("YYYY-MM-DD"),
                  dayNumber: from.format("d"),
                });
            from.add(1, 'days');
          }
          item.slots.forEach(slot => {
            let date = dates.filter(date => date.dayNumber === item.day);
            let starts_at = moment(date.day + " " + slot, "YYYY-MM-DD HH:mm");
            let ends_at = moment(date.day + " " + slot, "YYYY-MM-DD HH:mm").add(15, 'minutes');
            if (starts_at.isAfter(moment())) {
              events.push({
                start: starts_at.format("YYYY-MM-DD HH:mm"),
                end: ends_at.format("YYYY-MM-DD HH:mm"),
                color: color,
                timed: true,
                id_schedule: item.id_schedule,
                id_doctor: item.id_doctor,
                id_specialty: item.id_specialty,
                name: this.especialidad.name,
                details: `Categoría: ${this.especialidad.name} - Horario: ${moment(starts_at).format("HH:mm")} - ${moment(ends_at).format("HH:mm")}`,
                telemedicine: this.telemedicina
              })
            }
          })
        })
        if(response.schedulesDays && response.schedulesDays.length > 0){
          let dates = [];
          let eventsDates = [];
          let from = moment().add(1, 'days');
          let to = moment().add(30, 'days');
          while (from.isBefore(to)) {
            dates.push(
                {
                  day: from.format("YYYY-MM-DD"),
                  dayNumber: from.format("d"),
                });
            from.add(1, 'days');
          }
          dates = dates.filter(date => response.schedulesDays.some(schedule => schedule === date.dayNumber))
          dates.forEach(day => {
            let starts_at = moment(day.day , "YYYY-MM-DD");
            if (starts_at.isAfter(moment())) {
              eventsDates.push(starts_at.format("YYYY-MM-DD"))
            }
          })
          this.schedulesDays = eventsDates
        }
        if (events.length > 0) {
          this.availableHours = events;
        }
        this.loading = false;
        this.nextStep();
      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
    }
    ,
    searchEspecialidad() {
      this.filteredSpecialities = this.especialidades.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
    ,
    selectHour(item) {
      let day = moment().format('d')
      let date = null;
      if (item.slots.day < day) {
        date = moment().add(1, 'week').day(item.slots.day).format('YYYY-MM-DD')
      } else {
        date = moment().add(1, 'day').day(item.slots.day).format('YYYY-MM-DD')
      }
      let data = {
        id_patient: this.patient.id,
        id_doctor: item.slots.doctor_id,
        id_specialty: item.slots.specialty_id,
        id_schedule: item.slots.id,
        start_time: item.slots.slot,
        end_time: moment(item.slots.slot, "HH:mm").add(15, 'minutes').format("HH:mm"),
        date: date,
        telemedicine: this.telemedicina
      }
      createAppointment(data).then(async response => {
/*         sendWhatsapp(data).then(res => {
        console.log(res);
      }) */
        await Swal.fire({
          title: 'Cita creada',
          text: 'La cita se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(result => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }).catch(async error => {
        console.log(error.response.data.msg);
        await Swal.fire({
          title: 'Error',
          text: error.response.data.msg || 'Ha ocurrido un error al crear la cita',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      })
    }
    ,
    selectHourTelemedicine(item) {
      console.log(item);
    }
    ,
    searchDoctor() {
      this.filteredDoctors = this.doctores.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
      this.filteredDoctorsTelemedicine = this.doctoresTelemedicine.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
    ,
    subsStep() {
      this.step--;
      if(this.step === 3 && this.enable_telemedicine == 0){
        this.step--;
      }
    },
    takeHour() {
      let data = {
        id_patient: this.patient.id,
        id_doctor: this.selectedEvent.id_doctor,
        id_specialty: this.selectedEvent.id_specialty,
        id_schedule: this.selectedEvent.id_schedule,
        start_time: moment(this.selectedEvent.start).format("HH:mm"),
        end_time: moment(this.selectedEvent.end).format("HH:mm"),
        date: moment(this.selectedEvent.start).format("YYYY-MM-DD"),
        telemedicine: this.selectedEvent.telemedicine
      }
      createAppointment(data).then(async response => {
/*         sendWhatsapp(data).then(res => {
          console.log(res);
        }) */
        await Swal.fire({
          title: 'Cita creada',
          text: 'La cita se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(result => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }).catch(async error => {
        console.log(error);
        await Swal.fire({
          title: 'Error',
          text: error.response.data.msg || 'Ha ocurrido un error al crear la cita',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      })
    }
  }
}
</script>

<style scoped>
.inputForm {
  border-radius: 10px !important;
}

.chips {
  border-radius: 20px !important;
  color: white;
  margin: 10px;
  padding: 5px 30px;
  cursor: pointer;
}

.hrForm {
  margin: 10px 0;
  width: 100%;

}
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%,  #318BFD 100%);
  overflow-y: auto;
  height: 100%;
}

.card-title {
  font-size: .8rem ;
}

  @media (min-width: 475px) {
    .card-title {
      font-size: 1rem ;
    }
} 

.card-reserva {
  margin-top: 80px;
}
@media (min-width: 475px) {
  .card-reserva {
    margin-top: 0;
  }
}
.subtitle {
  font-size: 12px;
}
  @media (min-width: 475px) {
    .subtitle {
      font-size: 16px;
    }
}


.datos-personales {
  margin-top:70px;
}
@media (min-width: 475px) {
  .datos-personales {
    margin-top: 0;
  }
}



</style>
