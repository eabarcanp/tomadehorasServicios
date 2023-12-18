<template>
  <v-container fluid style=" height: 100%" >
    <div class="bg">
      <v-row
        :class="
          $vuetify.breakpoint.mobile
            ? 'ma-5'
            : 'ma-5 d-flex justify-space-between'
        "
      >
        <v-col class="py-0" cols="12">
          <v-container>
            <v-card>
              <v-card-title style="color: #3364d0">
                Registro de fichas
              <v-tooltip bottom><template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="ml-2" color="info">mdi-information-outline</v-icon>
                  </template>
              <span>Registro de todas las atenciones realizadas.</span>
            </v-tooltip>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-container class="d-flex row">
                <v-text-field
                  class="pa-5"
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar por Nombre / Rut"
                  single-line
                  hide-details
                  @keyup="(rut) => {formatRut(search)}"
                ></v-text-field>
                <v-data-table
                  v-if="listaFichas && listaFichas.length"
                  :headers="headers"
                  :items="listaFichas"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  class="elevation-1"
                  style="width: 100%"
                >
                  <template v-slot:[`item.rut`]="{ item }">
                    {{ item.rut }}
                  </template>
                  <template v-slot:[`item.name`]="{ item }">
                    {{ item.name }}
                  </template>

                  <template v-slot:[`item.observacion`]="{ item }">
                    <v-btn
                      color="#3364d0"
                      @click="irAFicha(item)"
                      class="ml-3"
                      icon
                      ><v-icon>mdi-information-outline</v-icon></v-btn>
                  </template>
                </v-data-table>
                <v-data-table
                  v-else
                  item-key="name"
                  class="elevation-1"
                  loading
                  loading-text="Cargando..."
                  style="width: 100%"
                ></v-data-table>
                <div style="width: 500px; margin: 0 auto;">
                <v-pagination
                  style="margin: 8px auto; max-width: 500px;"
                  v-model="page"
                  :length="pageCount"
                  ></v-pagination>
                </div>
              </v-container>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {getListPatients} from '../../helpers/api/horas_medicas.js'
import _ from 'lodash/lodash'
import {validate, format} from 'rut.js';

export default {
    data () {
        return {
            listaFichas: [],
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            search: "",
        }
    },
    computed: {
    headers() {
        return [
            { text: "Rut", value: "rut" },
            { text: "Nombre", value: "name", filterable: false, },
            { text: "Ficha", value: "observacion", filterable: false, },
        ];
        },
    },
    methods: {
    irAFicha(item) {
        this.$router.push({
        name: "Ficha",
        params: {id: item.id, from:'register'},
      })
    },
      formatRut(rut) {
      if (+this.search.charAt(1) || +this.search.charAt(0)) {
        this.search = format(rut)
      }
      },
    },
    created() {
    const data = {page: this.page, limit: this.itemsPerPage}

    getListPatients(data).then((res) => {
        this.listaFichas = res.pacientes.rows;
        this.pageCount = Math.ceil(res.pacientes.count / this.itemsPerPage)
    });

  },
    watch: {
    page: function(value){
    const data = {page: this.page, limit: this.itemsPerPage}
      getListPatients(data).then((res) => {
        this.listaFichas = res.pacientes.rows;
        this.pageCount = Math.ceil(res.pacientes.count / this.itemsPerPage)
    });
    },
      search: _.debounce(function (value) {
        if (this.search.length > 2) {
        const data = {page: this.page, limit: this.itemsPerPage, search: this.search}
          getListPatients(data).then((res) => {
          this.listaFichas = res.pacientes.rows;
          this.pageCount = Math.ceil(res.pacientes.count / this.itemsPerPage)
        });
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(45deg, #78909C 0%,  #455A64 100%);
}
</style>