<template>
  <v-main>
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <!--      Especialidades CRUD-->
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card style="border-radius: 15px">
            <v-toolbar card  elevation="1">
              <v-icon left>mdi-clipboard-multiple</v-icon>
              <v-toolbar-title>Categoria</v-toolbar-title>
            </v-toolbar>
            <v-card-title>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="medicos"
                item-key="id"
                class="elevation-1"
                :search="search"
                :footer-props="{
                      itemsPerPageText: 'Filas por página:',
                      itemsPerPageOptions: [5, 10, 25, 50],
                      pageText: '{0}-{1} de {2}',
                    }"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon  class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!--      dialog data especialidad -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
<!--                <v-col cols="12" sm="12" md="12" class="text-center">-->
<!--                  <v-avatar size="100" color="grey lighten-2"-->
<!--                            @click="avatarDialog = true">-->
<!--                    <v-img-->
<!--                        v-if="editedItem.avatar"-->
<!--                        :src="editedItem.avatar"-->
<!--                        :lazy-src="editedItem.avatar"-->
<!--                        contain-->
<!--                        width="100%"-->
<!--                    ></v-img>-->
<!--                    <v-icon v-else-->
<!--                            color=" lighten-4"-->
<!--                            size="80"-->
<!--                    >mdi-account-->
<!--                    </v-icon>-->
<!--                  </v-avatar>-->
<!--                </v-col>-->
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                      v-model="editedItem.name"
                      label="Nombre"
                      outlined
                      dense
                      disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                      v-model="editedItem.duration_appointment"
                      label="Duración de la cita"
                      outlined
                      dense
                      type="number"
                  ></v-text-field>
                </v-col>

      <v-col cols="12" sm="12" md="12">
<!--       <v-textarea
      name="input-7-1"
      variant="outlined"
      label="Documentos necesarios"
      auto-grow

      v-model="editedItem.documents"
    ></v-textarea> -->

        <label>Requisitos:</label>
        <div v-if="editedItem && editedItem.required_documents"  v-for="(document, i) in editedItem.required_documents" :key="i">
        <v-text-field
          label="Documento"
          v-model="editedItem.required_documents[i]"
        ></v-text-field>

          <v-btn
          @click="deleteDocument(i)"
          rounded
          small
          color="error"
          >Borrar</v-btn
        >
      </div>
      <v-btn
        @click="onAddDocument"
        class="float-right"
        color="success"
        rounded
        small
      >
        Añadir
      </v-btn>
        </div>
      </v-col>

                <v-card-title>
                  <span class="headline">Categorías Asociadas</span>
                </v-card-title>
                <v-data-table
                    :headers="headersDialog"
                    :items="editedItem.specialties"
                    item-key="id"
                    class="elevation-1"
                    :loading="loading"
                    loading-text="Cargando... Por favor espere"
                    :footer-props="{
                      itemsPerPageText: 'Filas por página:',
                    }"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-data-table>
                <v-btn color="primary lighten-1" class="ma-1" @click="AddSpecialty">Asociar Categoría</v-btn>
                <v-btn color="primary lighten-1" class="ma-1" @click="showHorario">Ver Horario</v-btn>
                <v-btn color="primary lighten-1" class="ma-1" @click="showAgenda">Ver Agenda</v-btn>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-btn color="primary" outlined @click="close">Cancelar</v-btn>
                <v-btn color="primary lighten-1" class="ma-1" @click="save">Guardar</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogSpecialty" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Especialidades</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row
                  style="min-height: 300px">
                <v-col cols="12" sm="12" md="12">
                  <multiselect
                      v-model="selectedSpecialties"
                      :options="especialidades"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Seleccione una categoría"
                      label="name"
                      track-by="id"
                      :preselect-first="false"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeSpecialty">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveSpecialty">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="avatarDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Avatar</span>
          </v-card-title>
          <v-card-text>
            <div
                class="dropzone-container"
                @dragover="dragover"
                @dragleave="dragleave"
                @drop="drop"
            >
              <input
                  type="file"
                  multiple
                  name="file"
                  id="fileInput"
                  class="hidden-input"
                  @change="onChange"
                  ref="file"
                  accept=".pdf,.jpg,.jpeg,.png"
              />
              <label for="fileInput" class="file-label">
                <div v-if="isDragging">Suelte los archivos aquí.</div>
                <div v-else>Arrastre la imagen aquí o <u>haga clic aquí</u> para cargar.</div>
              </label>
              <div class="preview-container mt-4" v-if="file">
                <div>
                  <p>
                    {{ file.name }}
                  </p>
                  <img :src="fileSource" alt="preview" class="preview">
                </div>
                <div>
                  <button
                      class="ml-2"
                      type="button"
                      @click="removeFile"
                      title="Remove file"
                  >
                    <v-icon>mdi-close</v-icon>
                  </button>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="avatarDialog = false">Cancelar</v-btn>
            <v-btn color="primary lighten-1" @click="saveAvatar">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>

import {
  createDoctor, createDoctorSpecialty,
  deleteDoctorSpecialty,
  getListDoctors,
  getListSpecialties,
  updateDoctor
} from "@/helpers/api/horas_medicas";
import Multiselect from 'vue-multiselect'
import Swal from "sweetalert2";


export default {
  name: "Medicos",
  components: {Multiselect},
  data: () => ({
    medicos: [],
    search: '',
    isDragging: false,
    file: null,
    especialidades: [],
    dialog: false,
    dialogSpecialty: false,
    document: "",
    documents: [""],
    headers: [
      {text: 'Nombre', align: 'start', value: 'name'},
      {text: 'Acciones', value: 'actions', sortable: false},
    ],
    headersDialog: [
      {text: 'Nombre', align: 'start', value: 'name'},
      //{text: 'Actions', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      avatar: '',
      duration_appointment: 0,
      required_documents: [""]
    },
    defaultItem: {
      name: '',
      avatar: '',
      duration_appointment: 0,
      required_documents: [""]
    },
    selectedSpecialties: [],
    formTitle: 'Nueva Atención',
    loading: false,
    isEditing: false,
    avatarDialog: false,
    fileSource: null,
  }),
  mounted() {
    this.getEspecialidades();
    if (this.$route.query && this.$route.query.id) {
      this.isEditing = true;
      this.getMedico(this.$route.query.id);
    } else {
      this.getMedicos();
    }
  },
  methods: {
    saveAvatar() {
      console.log(this.file);

    },
    removeFile() {
      this.file = null;
      this.fileSource = null;
    },
    onChange() {
      this.resizeImage(this.$refs.file.files[0], 100, 100, (resizedImage) => {
        this.file = resizedImage
        this.fileSource = this.generateURL(resizedImage)
      })
    },
    onAddDocument() {
    this.editedItem.required_documents.push(this.document);
    this.document = ""
    console.log(this.editedItem);
    },
    deleteDocument(id) {
    this.editedItem.required_documents.splice(id, 1);
    },
    resizeImage(file, maxWidth, maxHeight, callback) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const elem = document.createElement('canvas')
          const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height)
          elem.width = img.width * scaleFactor
          elem.height = img.height * scaleFactor
          const ctx = elem.getContext('2d')
          ctx.drawImage(img, 0, 0, elem.width, elem.height)
          ctx.canvas.toBlob((blob) => {
            const file = new File([blob], 'resized.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            callback(file)
          }, 'image/jpeg', 1)
        }
        reader.onerror = (error) => {
          console.log(error)
        }
      }
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
    async getMedico(id) {
      getListDoctors().then((response) => {
        this.medicos = response.doctores;
        const medico = this.medicos.find((medico) => medico.id === id);
        this.editItem(medico);
      });
    },
    crearMedico() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.formTitle = 'Nueva Atención';
      this.isEditing = false;
      this.dialog = true;
    },
    AddSpecialty() {
      this.dialogSpecialty = true;
      this.selectedSpecialties = this.editedItem.specialties;
    },
    closeSpecialty() {
      console.log('close', this.editedItem.specialties);
      this.selectedSpecialties = [];

      this.dialogSpecialty = false;
    },
    saveSpecialty() {
      if (!this.isEditing) {
        this.editedItem.specialties = this.selectedSpecialties;
        this.dialogSpecialty = false;
        return;
      }
      try {
        this.selectedSpecialties.forEach((specialty) => {
          if (!this.editedItem.specialties.includes(specialty)) {
            console.log('asociar', specialty);
            createDoctorSpecialty({
              id_doctor: this.editedItem.id,
              id_specialty: specialty.id
            }).then((response) => {
              console.log('response', response);
            });
          }
        });
        this.editedItem.specialties.forEach((specialty) => {
          if (!this.selectedSpecialties.includes(specialty)) {
            console.log('desasociar', specialty);
            deleteDoctorSpecialty({
              id_doctor: this.editedItem.id,
              id_specialty: specialty.id
            }).then((response) => {
              console.log('response', response);
            });
          }
        });
        this.editedItem.specialties = this.selectedSpecialties;
        this.selectedSpecialties = [];
        this.medicos[this.editedIndex] = Object.assign({}, this.editedItem);
        this.dialogSpecialty = false;

      } catch (e) {
        console.log('error', e);
      }
    },
    showHorario() {
      this.$router.push({name: 'Horarios', params: {id: this.editedItem.id}})
    },
    showAgenda() {
      this.$router.push({name: 'Agenda', params: {id: this.editedItem.id}})
    },
    async getMedicos() {
      this.loading = true;
      await getListDoctors().then((response) => {
        this.medicos = response.doctores;
        this.loading = false;
      }).catch(async (error) => {
        console.log(error.response.data.msg);
        this.loading = false;
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.msg,
        });
      })
    },
    async getEspecialidades() {
      this.loading = true;
      await getListSpecialties().then((response) => {
        this.especialidades = response.especialidades;
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      })
    },
    editItem(item) {
      this.editedIndex = this.medicos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.formTitle = 'Editar Categoría'
      this.isEditing = true;
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    async save() {

      if (this.editedIndex > -1) {
        //  guardar usuario
        await updateDoctor({
          id: this.editedItem.id,
          name: this.editedItem.name,
          duration_appointment: this.editedItem.duration_appointment,
          required_documents: this.editedItem.required_documents ? this.editedItem.required_documents.join("#*#") : ""

        }).then((response) => {
          console.log(response.data);
          this.close()
        }).catch((error) => {
          console.log(error);
        });
      } else {
        //  guardar usuario
        await createDoctor(this.editedItem).then((response) => {
          console.log(response);
          this.editedItem.id = response.id;
          // sí hay especialidades asociarlas
          if (this.editedItem.specialties.length > 0) {
            this.editedItem.specialties.forEach((specialty) => {
              createDoctorSpecialty({
                id_doctor: this.editedItem.id,
                id_specialty: specialty.id
              }).then((response) => {
                console.log('response', response);
              });
            });
          }
          this.close()
        }).catch((error) => {
          console.log(error)
        })
      }
      await this.getMedicos();
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped src="@/assets/dropfile.css"></style>
<style scoped>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%,  #318BFD 100%);
  overflow-y: auto;
}
</style>
