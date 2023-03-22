<template>
  <v-main>
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" md="12" v-if="!loading">
          <!--          titulo -->
          <v-card class="elevation-12 rounded ">
            <v-card-title class="justify-center align-center">
              <h2 class="headline mb-0">Horario: {{ medico.name }}</h2>
            </v-card-title>
            <!--            gestión de dias y horas laborales-->
            <v-card-text>
              <v-col>
                <v-sheet height="64">
                  <v-toolbar
                      flat
                  >
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
                            dense
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
                        <v-list-item @click="type = 'day'">
                          <v-list-item-title>Dia</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                          <v-list-item-title>Semana</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </v-sheet>
              </v-col>
              <v-sheet height="600"
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
                    first-interval="8"
                    interval-count="12"
                    interval-height="50"
                    locale="es"
                    weekdays="1,2,3,4,5"
                    :short-weekdays=false
                    :short-intervals=false
                >
                </v-calendar>
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
                    <v-btn icon @click="showEditEvent">
                      <v-icon>mdi-pencil</v-icon>
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
              <v-col>
                <v-sheet height="64">
                  <v-toolbar
                      flat
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        fab
                        small
                        color="primary darken-0"
                        @click="addNewEvent"
                    >
                      <v-icon small>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-sheet>
              </v-col>
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

      <!--      dialog edit event with time picker-->
      <v-dialog
          v-model="dialog"
          max-width="500px"
      >
        <v-card>
          <v-toolbar
              color="primary"
              dark
          >
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="save">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
<!--                <v-col cols="12" v-if="enable_telemedicine">-->
<!--                  <v-switch-->
<!--                      v-model="editedItem.telemedicine"-->
<!--                      label="Telemedicina"-->
<!--                      color="primary"-->
<!--                      dense-->
<!--                  ></v-switch>-->
<!--                </v-col>-->
                <v-col cols="12">
                  <v-select
                      v-model="especialidad"
                      :items="especialidadesNombre"
                      label="Categoría"
                      outlined
                      dense
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                      v-model="editedItem.weekday"
                      :items="days"
                      label="Dias"
                      outlined
                      dense
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedItem.startTime"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="editedItem.startTime"
                          label="Inicio horario"
                          readonly
                          v-on="on"
                          outlined
                          dense
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu2"
                        v-model="editedItem.startTime"
                        full-width
                        @click:minute="$refs.menu.save(editedItem.startTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                      ref="menu1"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedItem.endTime"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="editedItem.endTime"
                          label="Fin horario"
                          readonly
                          v-on="on"
                          outlined
                          dense
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu3"
                        v-model="editedItem.endTime"
                        full-width
                        @click:minute="$refs.menu1.save(editedItem.endTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

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
import {createSchedule, getDoctor, getScheduleByDoctor, updateSchedule} from "@/helpers/api/horas_medicas";
import store from "@/store";

export default {
  name: "Horarios",
  data: () => {
    return {
      date: null,
      days: [{value: "monday", text: "Lunes"}, {value: "tuesday", text: "Martes"}, {
        value: "wednesday",
        text: "Miércoles"
      }, {value: "thursday", text: "Jueves"}, {value: "friday", text: "Viernes"}],
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
        telemedicine: false,
      },
      enable_telemedicine: true,
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
      this.$router.back()
    }
    this.getMedico()
    this.$refs.calendar.checkChange()
    this.checkTelemedicine()
  },
  methods: {
    checkTelemedicine() {
      this.$store.state.generalParams.enable_telemedicine.value === "1" ? this.enable_telemedicine = true : this.enable_telemedicine = false
    },
    addNewEvent() {
      this.editedItem = {
        name: '',
        details: '',
        start: '',
        end: '',
        color: 'primary',
        day: '',
        startTime: '',
        endTime: '',
        weekday: '',
      }
      this.especialidad = ""
      this.formTitle = 'Nuevo Horario'
      this.isEditing = false
      this.dialog = true

    },
    async save() {
      // compare start and end time with momentjs
      if (this.especialidad === "") {
        this.showMessage = true
        this.message = "Debe seleccionar una atención"
        this.messageColor = "error"
        return
      }

      if (this.editedItem.weekday === '') {
        this.showMessage = true
        this.message = "Debe seleccionar un dia"
        this.messageColor = "error"
        return
      }
      const start = moment(this.editedItem.startTime, 'HH:mm')
      const end = moment(this.editedItem.endTime, 'HH:mm')
      if (start.isAfter(end)) {
        this.showMessage = true
        this.message = "La hora de inicio no puede ser mayor a la hora de fin"
        this.messageColor = "error"
        return
      }
      if (start.isBefore(moment('09:00', 'HH:mm')) || end.isAfter(moment('18:00', 'HH:mm'))) {
        this.showMessage = true
        this.message = "El horario debe estar entre las 09:00 y las 18:00"
        this.messageColor = "error"
        return
      }

      if (this.editedItem.startTime === '') {
        this.showMessage = true
        this.message = "Debe seleccionar una hora de inicio"
        this.messageColor = "error"
        return
      }
      if (this.editedItem.endTime === '') {
        this.showMessage = true
        this.message = "Debe seleccionar una hora de fin"
        this.messageColor = "error"
        return
      }
      let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      let day = days.findIndex(item => item === this.editedItem.weekday) + 1;
      let id_specialty = this.especialidades.find(item => item.name === this.especialidad).id;
      let data = {
        "id_doctor": this.medico.id,
        "id_specialty": id_specialty,
        "day": day.toString(),
        "start_time": this.editedItem.startTime,
        "end_time": this.editedItem.endTime,
        "telemedicine": this.editedItem.telemedicine || false
      }
      if (!this.isEditing) {
        this.loading = true
        await createSchedule(data).then((response) => {
          this.loading = false
          this.dialog = false
          this.message = "Horario creado correctamente"
          this.messageColor = "success"
          this.showMessage = true

        }).catch(error => {
          this.loading = false
          console.log(error)
          this.message = error.data.msg || "Error al crear horario"
          this.messageColor = "error"
          this.showMessage = true

        })
      } else {
        this.loading = true
        await updateSchedule(this.editedItem.id, data).then(response => {
          this.loading = false
          this.dialog = false
          this.message = "Horario actualizado correctamente"
          this.messageColor = "success"
          this.showMessage = true

        }).catch(error => {
          this.loading = false

          this.message = error.data.msg || "Error al actualizar horario"
          this.messageColor = "error"
          this.showMessage = true
        })
      }
      await this.getHorarios()
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },

    showEditEvent() {
      this.selectedOpen = false
      this.editedItem = Object.assign({}, this.selectedEvent)
      this.editedItem.startTime = moment(this.editedItem.start).format('HH:mm')
      this.editedItem.endTime = moment(this.editedItem.end).format('HH:mm')
      this.especialidad = this.editedItem.name
      this.formTitle = 'Editar Horario'
      this.isEditing = true
      this.dialog = true
    },
    async getHorarios() {
      //  get today and start of week with monday as first day to friday as last day
      let startOfWeek = moment().startOf('week').format('YYYY-MM-DD')
      let events = []
      this.loading = true
      await getScheduleByDoctor({
        id_doctor: this.id,
      }).then(response => {
        this.loading = false
        if (response.schedule) {
          events = response.schedule
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
      let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      let colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'purple', 'pink', 'orange', 'teal', 'green', 'indigo', 'deep-purple', 'deep-orange', 'brown', 'grey', 'blue-grey']
      let randomColor = colors[Math.floor(Math.random() * colors.length)]
      // parse data to events
      let dataEvents = []
      events.forEach(item => {
        let start = moment(startOfWeek).day(days[item.day - 1]).format('YYYY-MM-DD')
        let end = moment(startOfWeek).day(days[item.day - 1]).format('YYYY-MM-DD')

        let speciality = this.medico.specialties.filter(speciality => speciality.id === item.id_specialty)[0]
        console.log(this.medico)
        console.log(item)

        console.log(speciality)
        let event = {
          "name": speciality.name + " - " +( item.telemedicine ? "Telemática" : "Presencial"),
          "id_specialty": item.id_specialty,
          "start": start + 'T' + item.start_time,
          "end": end + 'T' + item.end_time,
          "timed": true,
          "color": randomColor,
          "id": item.id,
          "telemedicine": item.telemedicine,
          "weekday": days[item.day - 1],
          "details": `Categoría: ${speciality.name} <br> Telemática: ${item.telemedicine ? 'Si' : 'No'} <br> Horario: ${item.start_time} - ${item.end_time}`,
        }
        dataEvents.push(event)
      })
      this.events = dataEvents
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
    prev() {
      // this.$refs.calendar.prev()
    },
    next() {

      // this.$refs.calendar.next()
    },
    async getMedico() {
      this.loading = true
      try {
        await getDoctor(this.id).then(response => {
          this.loading = false
          if (response.doctor) {
            this.medico = response.doctor[0]
            this.especialidades = response.doctor[0].specialties
            this.especialidadesNombre = response.doctor[0].specialties.map(item => item.name)
            this.getHorarios()
          }
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
    searchEspecialidad() {
      this.filteredSpecialties = this.especialidades.filter((item) => {
        return item.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    searchDoctor() {
      this.filteredDoctors = this.doctores.filter((item) => {
        return item.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
}
</script>

<style scoped>

</style>
