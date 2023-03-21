<template>
  <v-main>
    <v-container fluid class="justify-center align-center fill-height gradientBackground">

      <!--      Especialidades CRUD-->
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card class="rounded-xl">
            <v-toolbar card color="white" elevation="1">
              <v-icon left>mdi-clipboard-multiple</v-icon>
              <v-toolbar-title>Categorias</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <div class="justify-center align-center d-flex">

                  <v-btn
                      fab
                      color="primary"
                      small
                      @click="dialog = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-toolbar-items>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="especialidades"
                item-key="id"
                class="elevation-1"
                :loading="loading"
                loading-text="Cargando... Por favor espere"
                :footer-props="{
                      itemsPerPageText: 'Filas por página:',
                      itemsPerPageOptions: [5, 10, 25, 50],
                      pageText: '{0}-{1} de {2}',
                    }"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>


      </v-row>

      <!--      dialog data especialidad -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedItem.name"
                                label="Nombre"
                                outlined
                                dense></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-card-title>
                    <span class="headline">Atenciones Asociadas</span>
                  </v-card-title>

                  <v-data-table
                      :headers="headersMedicos"
                      :items="editedItem.doctors"
                      item-key="id"
                      class="elevation-1"
                      :loading="loading"
                      loading-text="Cargando... Por favor espere"
                      :footer-props="{
                        itemsPerPageText: 'Filas por página:',
                        itemsPerPageOptions: [5, 10, 25, 50],
                        pageText: '{0}-{1} de {2}',
                      }"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="showMedico(item)">
                        mdi-pencil
                      </v-icon>
                    </template>
                  </v-data-table>
                  <v-btn color="blue darken-1" text @click="showMedicos">Ver Atenciones</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-container>
  </v-main>
</template>

<script>
import {createSpecialty, deleteSpecialty, getListSpecialties, updateSpecialty} from "@/helpers/api/horas_medicas";
import Swal from "sweetalert2";

export default {
  name: "Especialidades",
  components: {},
  data: () => ({
    especialidades: [],
    dialog: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        value: 'name',
      },
      {text: 'Acciones', value: 'actions', sortable: false},

    ],
    headersMedicos: [
      {
        text: 'Nombre',
        align: 'start',
        value: 'name',
      },
      {text: 'Acciones', value: 'actions', sortable: false},

    ],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
    formTitle: 'Nueva Especialidad',
    loading: false,
  }),
  mounted() {
    this.getSpecialties()
  },
  methods: {
    showMedicos() {
      this.$router.push({name: 'Medicos'})
    },
    showMedico(item) {
      this.$router.push({name: 'Medicos', query: {id: item.id}})
    },
    async getSpecialties() {
      this.loading = true
      await getListSpecialties().then((response) => {
        this.especialidades = response.especialidades;
        this.$store.commit('setSpecialities', response.data)
        this.loading = false
      }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    editItem(item) {
      console.log(item)
      this.editedIndex = this.especialidades.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.formTitle = 'Editar Especialidad'
      this.dialog = true

    },
    async deleteItem(item) {
      console.log(item)
      //   swal alert para confirmar
      await Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteSpecialty(item.id).then((response) => {
            this.especialidades.splice(this.especialidades.indexOf(item), 1)
          }).catch(async (error) => {
            console.log(error)
            await Swal.fire(
                'Error!',
                'No se pudo eliminar el registro.',
                'error'
            )
          })
          await Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success'
          )
        }
      })

    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    async save() {

      if (this.editedIndex > -1) {
        console.log(this.editedItem)
        this.loading = true
        await updateSpecialty(this.editedItem).then((response) => {
          //   Object.assign(this.especialidades[this.editedIndex], this.editedItem)
          this.loading = false
          console.log(response)
        }).catch((error) => {
          console.log(error)
          this.loading = false

        })
      } else {
        // console.log(this.editedItem)
        let data = {
          name: this.editedItem.name,
        }
        this.loading = true
        await createSpecialty(data).then((response) => {
          console.log("response", response)
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });

      }
      await this.getSpecialties()
      this.close()
    },
  },
};
</script>

<style>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%, #318BFD 100%);
  overflow-y: auto;
}
</style>
