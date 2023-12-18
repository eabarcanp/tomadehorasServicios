<template>
  <v-main>
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <v-row class="justify-center">
        <v-col cols="12" md="3">
             <v-row>
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center card-selector flex-row pa-4 ">
                <label class="label-selector">Atenciones</label>
<!--                numero de pacientes esperando consulta -->
                <div
                    class="d-flex justify-center align-center flex-column pa-4"
                    style="background-color: #F5F5F5; border-radius: 10px; height: 50px; width: 50px"
                >
                  {{statistics.day && ( statistics.day.total  - statistics.day.attended )}}
                </div>
              </div>
            </v-col>

          </v-row>
          <v-row>
<!--            barras horizontales con indicado de pacientes atendidos por dia, semana y mes -->
            <v-col cols="12">
              <div class="d-flex justify-center align-center card-selector flex-column pa-4 ">
                <label class="label-selector ma-1">Atenciones</label>
                <v-progress-linear
                    color="#5773FF"
                    rounded
                    height="25"
                    :value="statistics.day.percentage"
                >       <strong>
                  {{statistics.day.percentage}}% - {{statistics.day.total}} atenciones
                </strong></v-progress-linear>
                <br>
                <v-progress-linear
                    color="#3497FD"
                    rounded
                    height="25"
                    :value="statistics.week.percentage"
                >       <strong>
                  {{statistics.week.percentage}}% - {{statistics.week.total}} atenciones
                </strong></v-progress-linear>
                <br>
                <v-progress-linear
                    color="#3ACCE1"
                    rounded
                    height="25"
                    :value="statistics.month.percentage"
                >
                  <strong>
                    {{statistics.month.percentage}}% - {{statistics.month.total}} atenciones
                  </strong>
                </v-progress-linear>
                <br>
                <v-row
                    align="center"
                    justify="center"
                >
                  <v-col cols="auto">
                    <v-icon color="#5773FF">mdi-circle</v-icon>
                    <span class="black--text">Dia</span>
                  </v-col>
                  <v-col cols="auto">
                    <v-icon color="#3497FD">mdi-circle</v-icon>
                    <span class="black--text">Semana</span>
                  </v-col>
                  <v-col cols="auto">
                    <v-icon color="#3ACCE1">mdi-circle</v-icon>
                    <span class="black--text">Mes</span>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="8" class="order-first order-md-last" v-if="!loading">

          <div class="d-flex justify-space-between card-selector flex-column pa-4 ">
          <div class="d-flex justify-space-between align-center">
            <h3 class="label-selector mb-5">Consultas <v-tooltip bottom><template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="ml-2" color="info">mdi-information-outline</v-icon>
                  </template>
              <span>Acceso a ficha de atención y/o atención telemática</span>
            </v-tooltip></h3>

        <div  class="ml-2 justify-space-between align-center" style="display:flex; gap: 20px;">
<!--           <v-select
           item-text="text"
          item-value="value"
          v-model="timeRange"
          :items="timeRageItems"
          v-on:change="getAgendaMedico"
          label="Filtrar por fecha"
          solo
        ></v-select> -->
              <v-menu
      ref="menu4"
      v-model="menu4"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateRangeText"
          label="Rango de fechas"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dates"
        @change="save"
        range
      ></v-date-picker>
    </v-menu>

    <v-btn @click="filtrar" color="primary">
      Filtrar
    </v-btn>
        </div>

          </div>
            <!--                numero de pacientes esperando consulta -->

<!--            <v-btn-->
<!--                color="success"-->
<!--                class="ma-2"-->
<!--                @click="sendWsp()"-->
<!--            >-->
<!--              Enviar WhatsApp-->
<!--            </v-btn>-->

<!--            if medicalAppointments.lenght == 0 mostrar alerta -->
            <v-alert
                v-if="events.length === 0"
                type="info"
                class="ma-2"
            >
              No hay consultas pendientes
            </v-alert>

<!--            si medicalAppointments.lenght > 0 mostrar lista  -->
            <v-list
                v-else
                class="ma-2"
                width="100%"

            >
              <v-list-item-group
                  v-for="event in events"
                  :key="event.id"
                  color="primary"
              >
                <v-list-item

                >
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      {{event.patient_name}} ({{event.patient_rut}}) | {{event.start}} 
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
<!--                    boton de atender si es telemedicina, si es presencial mostrar alerta -->
                    <v-btn
                        color="primary"
                        class="ma-2"
                        @click=" event.telemedicine === 1 ? sendWsp(event) : openFicha(event)"
                    >
                      {{ event.telemedicine === 1 ? 'Atender' : 'Ficha' }}
                    </v-btn>

                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          

          </div>

<!--          &lt;!&ndash;          titulo &ndash;&gt;-->
<!--          <v-card class="elevation-12 rounded ">-->
<!--            <v-card-title class="justify-center align-center">-->
<!--              <h2 class="headline mb-0">Agenda Medico: {{ medico.name }}</h2>-->
<!--            </v-card-title>-->
<!--            &lt;!&ndash;            visualizacion de agenda&ndash;&gt;-->
<!--            <v-card-text>-->
<!--              <v-col>-->
<!--                <v-sheet height="64">-->
<!--                  <v-toolbar-->
<!--                      flat-->
<!--                  >-->
<!--                    <v-btn-->
<!--                        outlined-->
<!--                        class="mr-4"-->
<!--                        color="grey darken-2"-->
<!--                        @click="setToday"-->
<!--                    >-->
<!--                      Hoy-->
<!--                    </v-btn>-->
<!--                    <v-btn-->
<!--                        fab-->
<!--                        small-->
<!--                        color="primary darken-0 mx-1"-->
<!--                        @click="prev"-->
<!--                    >-->
<!--                      <v-icon small>-->
<!--                        mdi-chevron-left-->
<!--                      </v-icon>-->
<!--                    </v-btn>-->
<!--                    <v-btn-->
<!--                        fab-->
<!--                        small-->
<!--                        color="primary darken-0 mx-1"-->
<!--                        @click="next"-->
<!--                    >-->
<!--                      <v-icon small>-->
<!--                        mdi-chevron-right-->
<!--                      </v-icon>-->
<!--                    </v-btn>-->
<!--                    <v-toolbar-title v-if="$refs.calendar">-->
<!--                      {{ $refs.calendar.title }}-->
<!--                    </v-toolbar-title>-->
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-menu-->
<!--                        bottom-->
<!--                        right-->
<!--                    >-->
<!--                      <template v-slot:activator="{ on, attrs }">-->
<!--                        <v-btn-->
<!--                            outlined-->
<!--                            color="grey darken-2"-->
<!--                            v-bind="attrs"-->
<!--                            v-on="on"-->
<!--                        >-->
<!--                          <span>{{ typeToLabel[type] }}</span>-->
<!--                          <v-icon right>-->
<!--                            mdi-menu-down-->
<!--                          </v-icon>-->
<!--                        </v-btn>-->
<!--                      </template>-->
<!--                      <v-list>-->
<!--                        <v-list-item @click="type = 'week'">-->
<!--                          <v-list-item-title>Semana</v-list-item-title>-->
<!--                        </v-list-item>-->
<!--                      </v-list>-->
<!--                    </v-menu>-->
<!--                  </v-toolbar>-->
<!--                </v-sheet>-->
<!--              </v-col>-->
<!--              <v-sheet-->
<!--                  height="600"-->
<!--                  class="overflow-y-auto"-->
<!--              >-->
<!--                <v-calendar-->
<!--                    ref="calendar"-->
<!--                    v-model="focus"-->
<!--                    color="primary"-->
<!--                    :events="events"-->
<!--                    :event-color="getEventColor"-->
<!--                    :type="type"-->
<!--                    @click:event="showEvent"-->
<!--                    first-interval="16"-->
<!--                    interval-count="22"-->
<!--                    interval-minutes="30"-->
<!--                    interval-height="50"-->
<!--                    locale="es"-->
<!--                    weekdays="1,2,3,4,5"-->
<!--                    :short-weekdays=false-->
<!--                    :short-intervals=false-->

<!--                >-->
<!--                </v-calendar>-->

<!--                &lt;!&ndash;                label indicadores de color&ndash;&gt;-->

<!--              </v-sheet>-->
<!--              <v-sheet-->
<!--                  color="grey lighten-4"-->
<!--                  height="50"-->
<!--                  width="100%"-->
<!--              >-->
<!--                <v-row-->
<!--                    align="center"-->
<!--                    justify="center"-->
<!--                >-->
<!--                  <v-col cols="auto">-->
<!--                    <v-icon color="warning">mdi-circle</v-icon>-->
<!--                    <span class="black&#45;&#45;text">Pendiente</span>-->
<!--                  </v-col>-->
<!--                  <v-col cols="auto">-->
<!--                    <v-icon color="primary">mdi-circle</v-icon>-->
<!--                    <span class="black&#45;&#45;text">Confirmada</span>-->
<!--                  </v-col>-->
<!--                  <v-col cols="auto">-->
<!--                    <v-icon color="success">mdi-circle</v-icon>-->
<!--                    <span class="black&#45;&#45;text">Atendido</span>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-sheet>-->
<!--              <v-menu-->
<!--                  v-model="selectedOpen"-->
<!--                  :close-on-content-click="false"-->
<!--                  :activator="selectedElement"-->
<!--                  offset-x-->
<!--              >-->
<!--                <v-card-->
<!--                    color="grey lighten-4"-->
<!--                    min-width="350px"-->
<!--                    flat-->
<!--                >-->
<!--                  <v-toolbar-->
<!--                      :color="selectedEvent.color"-->
<!--                      dark-->
<!--                  >-->
<!--                    <v-btn icon @click="showPacientEvent">-->
<!--                      <v-icon>mdi-account</v-icon>-->
<!--                    </v-btn>-->
<!--                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>-->
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-btn icon>-->
<!--                      <v-icon>mdi-dots-vertical</v-icon>-->
<!--                    </v-btn>-->
<!--                  </v-toolbar>-->
<!--                  <v-card-text>-->
<!--                    <span v-html="selectedEvent.details"></span>-->
<!--                  </v-card-text>-->
<!--                  <v-card-actions>-->
<!--                    <v-btn-->
<!--                        text-->
<!--                        color="secondary"-->
<!--                        @click="selectedOpen = false"-->
<!--                    >-->
<!--                      Cancel-->
<!--                    </v-btn>-->
<!--                  </v-card-actions>-->
<!--                </v-card>-->
<!--              </v-menu>-->
<!--            </v-card-text>-->
<!--          </v-card>-->
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
  getDoctor, getStatistics, sendMedicalAppointment, updateAppointment,
} from "@/helpers/api/horas_medicas";
import Swal from "sweetalert2";

export default {
  name: "Atenciones",
  data: () => {
    return {
      date: null,
      estado: null,
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
      items: ["Disponible", "Desconectado"],
      isEditing: false,
      loading: false,
      medico: {},
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      dates: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
      statistics: {
        day: {
          total: 0,
          attended: 0,
          percentage: 0,
        },
        week: {
          total: 0,
          attended: 0,
          percentage: 0,
        },
        month: {
          total: 0,
          attended: 0,
          percentage: 0,
        },
      },
      type: 'week',
      typeToLabel: {
        // month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        // '4day': '4 Days',
      },
      valid: false,
      weekPage: 0,
      timeRange: "day",
      timeRageItems: [
        {
          text: "Hoy",
          value: "day"
        },
        {
          text: "Esta Semana",
          value: "week"
        },
        {
          text: "Este Mes",
          value: "month"
        },
        {
          text: "Este Año",
          value: "year"
        },
        
      ]
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' - ')
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
    } else {
      this.$router.back()
    }
    this.getAgendaMedico()
    this.getStatistics()
    this.getMedico()

  },
  methods: {
    getStatistics() {
      this.loading = true
      getStatistics(this.id).then(response => {
        this.statistics = response.data
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.showMessage = true
        this.message = error.response.data.message
        this.messageColor = "error"
      })
    },
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
      this.$router.push({
        name: "Ficha",
        params: {id: this.selectedEvent.patient_id},
        query: {especialidad: this.selectedEvent.specialty_id}
      })
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
        let from = moment().startOf(this.timeRange).add(this.weekPage, 'week').format('YYYY-MM-DD');
        // let from = moment().format('YYYY-MM-DD');
        let to = moment().endOf(this.timeRange).add(this.weekPage, 'week').format('YYYY-MM-DD');
        // let to = moment().format('YYYY-MM-DD');
        let data = {
          doctor_id: this.id,
          from: this.dates[0],
          to: this.dates[1]
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
                "patient_phone": item.patient_phone,
                "patient_email": item.patient_email,
                "specialty_id": item.id_specialty,
                "specialty_name": item.specialty_name,
                "doctor_id": item.id_doctor,
                "patient_rut": item.patient_rut,
                "doctor_name": item.doctor_name,
                "telemedicine": item.telemedicine,
                "details": `Usuario: ${item.patient_name} - Horario: ${item.start_time} - ${item.end_time} - Categoría: ${item.specialty_name}`,
              }
              events.push(event)
            })
          }
          this.events = events
          console.log(this.events)
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
    async sendWsp(event) {
      let data = {
        phone: event.patient_phone,
        link: 'reserva?privatevideo=' + event.patient_phone,
        email: event.patient_email,
        name: event.patient_name,
      }
      await sendMedicalAppointment(data).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })

      this.$store.commit('setPatientData', {
        id: event.patient_id,
        name: event.patient_name,
        phone: event.patient_phone,
        email: event.patient_email,
        specialty_id: event.specialty_id,
        specialty_name: event.specialty_name,
        doctor_id: event.doctor_id,
        doctor_name: event.doctor_name,
        telemedicine: event.telemedicine,
        patient_rut: patient_rut,

      })

      await this.$router.push({
        name: "Atenciones",
        params: {id: this.id},
        query: {privatevideo: event.patient_phone}
      })
    },
    openFicha(event) {
      if(event.assistance === '1'){
        this.$router.push({
          name: "Ficha",
          params: {id: event.patient_id},
          query: {especialidad: event.specialty_id}
        })
      }else{
        Swal.fire({
          title: 'Atención',
          text: "Asistió al usuario?",
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.loading = true
            let data = {
              id: event.id,
              assistance: 1
            }
            updateAppointment(data).then(response => {
              this.loading = false
              this.$router.push({
                name: "Ficha",
                params: {id: event.patient_id},
                query: {especialidad: event.specialty_id}
              })
            }).catch(error => {
              this.loading = false
              this.showMessage = true
              this.message = error.response.data.message
              this.messageColor = "error"
            })
          }
          else if(result.isDenied) {
            this.loading = true
            let data = {
              id: event.id,
              assistance: 0
            }
            updateAppointment(data).then(response => {
              this.loading = false
              this.$router.push({
                name: "Ficha",
                params: {id: event.patient_id},
                query: {especialidad: event.specialty_id}
              })
            }).catch(error => {
              this.loading = false
              this.showMessage = true
              this.message = error.response.data.message
              this.messageColor = "error"
            })
          }
        })
      }
    },
    save (date) {
      this.$refs.menu4.save(date)
    },
    filtrar() {
      this.getAgendaMedico()
    }
  }
}
</script>

<style scoped>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%, #318BFD 100%);
  overflow-y: scroll;
}
.card-selector {
  background: white;
  border-radius: 10px;
  padding: 10px;

}
</style>
