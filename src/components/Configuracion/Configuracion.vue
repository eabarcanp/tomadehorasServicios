<template>
  <v-main>
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <!--      definir si se habilita telemedicina,  listado de dias feriados, y listado de establecimientos con sus respectivos horarios de atencion -->

      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card class="rounded-xl">
            <v-toolbar card color="white" elevation="1">
              <v-icon left>mdi-cog</v-icon>
              <v-toolbar-title>Configuración</v-toolbar-title>
              <v-tooltip bottom><template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="ml-2" color="info">mdi-information-outline</v-icon>
                  </template>
              <span>Configuración parámetros generales de atención.</span>
            </v-tooltip>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-title class="ma-2">
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
                :items="configuraciones"
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
<!--      dialog para logo -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
<!--            <span class="headline">{{ formTitle }}</span>-->
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                      v-model="configuracion.name"
                      label="Nombre"
                      required
                      disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                      v-model="configuracion.description"
                      label="Descripción"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
<!--                  si nombre incluye enable, mostrar switch-->
                  <v-switch
                      v-model="configuracion.value"
                      :label="configuracion.value ? 'Habilitado' : 'Deshabilitado'"
                      color="primary"
                      @change="changeEnable"
                      true-value="1"
                      false-value="0"
                      v-if="configuracion.name.includes('enable')"
                  ></v-switch>
<!--                  si nombre incluye duration, mostrar input number-->
                  <v-text-field
                      v-model="configuracion.value"
                      label="Valor"
                      required
                      v-if="configuracion.name.includes('duration')"
                  ></v-text-field>
<!--                  si el nombre incluye logo, mostrar cuadro de imagen con inpuit para buscar archivos -->
                  <div
                      class="dropzone-container"
                      @dragover="dragover"
                      @dragleave="dragleave"
                      @drop="drop"
                      v-if="configuracion.name.includes('logo')"
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
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>

import {getGeneralParams, updateAvatar, putGeneralParams} from "@/helpers/api/horas_medicas";

export default {
  name: "Configuracion",
  data: () => {
    return {
      search: "",
      configuraciones: [],
      configuracion: {
        id: null,
        name: "",
        description: "",
        state: true,
        value: "",
      },
      dialog: false,
      file: null,
      fileSource: null,
      isDragging: false,

      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
        },
        {text: "Descripción", value: "description"},
        {text: "Valor", value: "value"},
        {text: "Acciones", value: "actions", sortable: false},
      ],
    }
  },
  mounted() {
    this.getParametrosGenerales();
  },
  methods: {
    async saveLogo() {
      // console.log(this.file);
      // console.log(this.fileSource);
      // console.log(this.editedItem);
      const formData = new FormData();
      // this.loading = true;
      formData.append('avatar', this.file);
      // await updateAvatar(this.editedItem.id, formData).then((res) => {
      //   console.log(res);
      //   this.avatarDialog = false;
      //   this.dialog = false;
      //   this.loading = false;
      //   this.file = null;
      //   this.fileSource = null;
      //   this.getUsuarios();
      // }).catch((err) => {
      //   console.log(err);
      //   this.loading = false;
      // })
      //

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
    changeEnable() {
      console.log(this.configuracion.value);
    },
    getParametrosGenerales() {
      getGeneralParams().then((response) => {
        console.log(response);
        this.configuraciones = response;
      });
    },
    editItem(item) {
      this.configuracion = item;
      this.dialog = true;
    },
    save() {
      putGeneralParams(this.configuracion, this.configuracion.id )
      if(this.configuracion.name.includes('enable') || this.configuracion.name.includes('duration')){
      // update param
      }
      if(this.configuracion.name.includes('logo')){
      // update logo

      }
      this.dialog = false;
    },

  }
}
</script>
<style scoped src="@/assets/dropfile.css"></style>
<style scoped>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%,  #318BFD 100%);
  overflow-y: scroll;
}
</style>
