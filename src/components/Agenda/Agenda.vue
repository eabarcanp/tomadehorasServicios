<template>
  <v-main>
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <v-row class="justify-center">
        <v-col cols="12" md="12" v-if="!loading">

          <!--          titulo -->
          <v-card class="elevation-12 rounded ">
            <v-card-title class="justify-center align-center">
              <h2 class="headline mb-0">Agenda Medico: {{ medico.name }}</h2>
            </v-card-title>
            <!--            visualizacion de agenda-->
            <v-card-text>
              <v-col>
                <v-sheet height="64">
                  <v-toolbar
                      flat
                  >
                    <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                    >
                      Hoy
                    </v-btn>
                    <v-btn
                        fab
                        small
                        color="primary darken-0 mx-1"
                        @click="prev"
                    >
                      <v-icon small>
                        mdi-chevron-left
                      </v-icon>
                    </v-btn>
                    <v-btn
                        fab
                        small
                        color="primary darken-0 mx-1"
                        @click="next"
                    >
                      <v-icon small>
                        mdi-chevron-right
                      </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                      {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu
                        bottom
                        right
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            outlined
                            color="grey darken-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                          <span>{{ typeToLabel[type] }}</span>
                          <v-icon right>
                            mdi-menu-down
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="type = 'week'">
                          <v-list-item-title>Semana</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </v-sheet>
              </v-col>
              <v-sheet
                  height="600"
                  class="overflow-y-auto"
              >
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    first-interval="16"
                    interval-count="22"
                    interval-minutes="30"
                    interval-height="50"
                    locale="es"
                    weekdays="1,2,3,4,5"
                    :short-weekdays=false
                    :short-intervals=false

                >
                </v-calendar>

<!--                label indicadores de color-->

              </v-sheet>
              <v-sheet
                  color="grey lighten-4"
                  height="50"
                  width="100%"
              >
                <v-row
                    align="center"
                    justify="center"
                >
                  <v-col cols="auto">
                    <v-icon color="warning">mdi-circle</v-icon>
                    <span class="black--text">Pendiente</span>
                  </v-col>
                  <v-col cols="auto">
                    <v-icon color="primary">mdi-circle</v-icon>
                    <span class="black--text">Confirmada</span>
                  </v-col>
                  <v-col cols="auto">
                    <v-icon color="success">mdi-circle</v-icon>
                    <span class="black--text">Atendido</span>
                  </v-col>
                </v-row>
              </v-sheet>
              <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-x
              >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                  <v-toolbar
                      :color="selectedEvent.color"
                      dark
                  >
                    <v-btn icon @click="showPacientEvent">
                      <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-card-text>
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
   getAppointmentByIdDoctor,
  getDoctor,
} from "@/helpers/api/horas_medicas";

export default {
  name: "Horarios",
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
      editedItem: {
        name: '',
        details: '',
        start: '',
        end: '',
        color: 'primary',
        day: '',
        startTime: '',
        endTime: '',
      },
      especialidad: "",
      especialidades: [],
      especialidadesNombre: [],
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
      recurringSchedules: [],
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
      type: 'week',
      typeToLabel: {
        // month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        // '4day': '4 Days',
      },
      valid: false,
      weekPage: 0,
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
    } else {
      this.$router.back()
    }
    this.getAgendaMedico()
    this.getMedico()
    this.$refs.calendar.checkChange()
  },
  methods: {
    getMedico() {
      getDoctor(this.id).then((response) => {
        this.medico = response.doctor[0]
      })
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    showPacientEvent() {
      this.$router.push({name: "Ficha", params: {id: this.selectedEvent.patient_id}, query: {especialidad: this.selectedEvent.specialty_id}})
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
    getEventColor(event) {
      return event.color
    },
    async setToday() {
      this.weekPage = 0
      await this.getAgendaMedico()
      this.focus = ''
    },
    async prev() {
      this.weekPage--
      await this.getAgendaMedico()
      this.$refs.calendar.prev()
    },
    async next() {
      this.weekPage++
      await this.getAgendaMedico()
      this.$refs.calendar.next()
    },
    async getAgendaMedico() {
      this.loading = true
      try {
        let from = moment().startOf('week').add(this.weekPage, 'week').format('YYYY-MM-DD');
        let to = moment().endOf('week').add(this.weekPage, 'week').format('YYYY-MM-DD');
        let data = {
          doctor_id: this.id,
          from: from,
          to: to
        }
        let events = []

        await getAppointmentByIdDoctor(data).then(response => {
          this.loading = false
          if (response.medicalAppointments) {
            response.medicalAppointments.forEach(item => {
              let event = {
                "name": item.patient_name,
                "start": item.date + ' ' + item.start_time,
                "end": item.date + ' ' + item.end_time,
                "timed": true,
                "color": item.assistance ? 'green' : item.confirmed ? 'primary' : 'warning',
                "id": item.id,
                "patient_id": item.id_patient,
                "patient_name": item.patient_name,
                "specialty_id": item.id_specialty,
                "specialty_name": item.specialty_name,
                "doctor_id": item.id_doctor,
                "doctor_name": item.doctor_name,
                "details": `Paciente: ${item.patient_name} - Horario: ${item.start_time} - ${item.end_time} - Especialidad: ${item.specialty_name}`,
              }
              events.push(event)
            })
          }
          this.events = events
        }).catch(error => {
          this.loading = false
          console.log(error)
        })

      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    formatDate(date) {
      return moment(date).format("LLLL");
    },
    formatRut(rut) {
      this.rut = format(rut)
    },
  }
}
</script>

<style scoped>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%,  #318BFD 100%);
  overflow-y: scroll;
}
</style>
