<template>
  <v-main>
    <v-container fluid class="justify-center align-center fill-height gradientBackground">
      <!--      Usuarios CRUD -->
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card style="border-radius: 15px">
            <v-toolbar card elevation="1">
              <v-icon left>mdi-account</v-icon>
              <v-toolbar-title>Usuarios</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn icon  @click="crearUsuario">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-toolbar-items>
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
                :items="usuarios"
                item-key="id"
                class="elevation-1"
                :search="search"
                :footer-props="{
                      itemsPerPageText: 'Filas por página:',
                      itemsPerPageOptions: [5, 10, 25, 50],
                      pageText: '{0}-{1} de {2}',
                    }"
            >
              <template v-slot:item.role="{ item }">
                <v-chip
                    :color="item.role === 'ADMIN_ROLE' ? 'red' : item.role === 'USER_ROLE' ? 'green' : 'blue'"
                    text-color="white"
                >
                  {{ roles.find(role => role.value === item.role).text }}
                </v-chip>
              </template>

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
      <v-dialog v-model="dialog" max-width="500px" style="overflow-y: hidden">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="12" sm="12" md="12" class="text-center">
                    <v-avatar size="100" color="grey lighten-2"
                              @click="avatarDialog = true">
                      <v-img
                          v-if="editedItem.avatar"
                          :src="editedItem.avatar"
                          :lazy-src="editedItem.avatar"
                          contain
                          width="100%"
                      ></v-img>
                      <v-icon v-else
                              color=" lighten-4"
                              size="80"
                      >mdi-account
                      </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                        outlined
                        dense
                        :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <!--                select role-->
                  <v-col cols="12" sm="12" md="6">
                    <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        :item-text="roles.text"
                        :item-value="roles.value"
                        label="Rol"
                        outlined
                        dense
                        :rules="roleRules"
                    ></v-select>
                  </v-col>
                  <!--                text field email disabled-->
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        outlined
                        dense
                        :disabled="!editEmail"
                        :rules="emailRules"
                    ></v-text-field>
                  </v-col>

                  <!--                text field password-->
                  <v-col cols="12" sm="12" md="12" v-if="editEmail">
                    <v-text-field
                        id="password"
                        label="Contraseña"
                        name="password"
                        v-model="editedItem.password"
                        :rules="passwordRules"
                        dense
                        outlined
                        type="password"
                        color="blue accent-3"
                        required
                        :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (passType = !passType)"
                        :type="passType ? 'password' : 'text'"
                    />
                  </v-col>
                </v-row>
              </v-form>
              <v-col cols="12" sm="12" md="12" v-if="!editEmail">
                <v-btn color="primary"  @click="changePassword">Cambiar contraseña</v-btn>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-row>

              <v-col cols="12" sm="12" md="12">

                <v-btn color="primary" outlined @click="close">Cancelar</v-btn>
                <v-btn color="primary lighten-1" class="ma-1" @click="save" :disabled="!valid">Guardar</v-btn>
              </v-col>
            </v-row>
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
            <v-btn color="blue darken-1" text @click="avatarDialog = false" :disabled="loading"
            >Cancelar
            </v-btn>
            <v-btn color="primary lighten-1" @click="saveAvatar" :disabled="loading"
            >Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<!--      dialog para password -->
      <v-dialog v-model="passwordDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Cambiar contraseña</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                      id="password"
                      label="Contraseña"
                      name="password"
                      v-model="editedItem.password"
                      :rules="passwordRules"
                      dense
                      outlined
                      type="password"
                      color="blue accent-3"
                      required
                      :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (passType = !passType)"
                      :type="passType ? 'password' : 'text'"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                      id="password"
                      label="Confirmar contraseña"
                      name="password"
                      v-model="editedItem.password_confirmation"
                      :rules="passwordConfirmationRules"
                      dense
                      outlined
                      type="password"
                      color="blue accent-3"
                      required
                      :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (passType = !passType)"
                      :type="passType ? 'password' : 'text'"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="passwordDialog = false" :disabled="loading"
            >Cancelar
            </v-btn>
            <v-btn color="primary lighten-1" @click="savePassword" :disabled="loading || !valid"
            >Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import {
  createUser, deleteUser,
  getListUsers, updateAvatar, updatePassword,
  updateUser
} from "@/helpers/api/horas_medicas";
import Multiselect from 'vue-multiselect'
import Swal from "sweetalert2";


export default {
  name: "Usuarios",
  components: {Multiselect},
  data: () => ({
    usuarios: [],
    search: '',
    isDragging: false,
    passType: true,
    especialidades: [],
    dialog: false,
    avatarDialog: false,
    fileSource: null,
    file: null,
    passwordDialog: false,
    nameRules: [
      v => !!v || 'Nombre es requerido',
    ],
    emailRules: [
      v => !!v || 'Email es requerido',
      v => /.+@.+\..+/.test(v) || 'Email debe ser valido',
    ],
    passwordRules: [
      v => !!v || 'Password es requerido',
      v => (v && v.length >= 6) || 'Password debe tener al menos 6 caracteres',
    ],
    passwordConfirmationRules: [
      v => !!v || 'Confirmar password es requerido',
      v => (v && v.length >= 6) || 'Confirmar password debe tener al menos 6 caracteres',
    ],
    roleRules: [
      v => !!v || 'Rol es requerido',
    ],
    headers: [
      {text: 'Nombre', align: 'start', value: 'name'},
      {text: 'Email', value: 'email'},
      {text: 'Rol', value: 'role'},

      {text: 'Acciones', value: 'actions', sortable: false},
    ],
    headersDialog: [
      {text: 'Nombre', align: 'start', value: 'name'},
      //{text: 'Acciones', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      role: '',
      email: '',
    },
    defaultItem: {
      name: '',
      role: '',
      email: '',
    },

    roles: [{
      value: 'ADMIN_ROLE', text: 'Administrador'
    }, {
      value: 'DOCTOR_ROLE', text: 'Atención'
    }, {
      value: 'USER_ROLE', text: 'Funcionario'
    }],
    selectedSpecialties: [],
    formTitle: 'Nuevo Usuario',
    loading: false,
    isEditing: false,
    editEmail: false,
    valid: false,
  }),
  mounted() {
    // this.getEspecialidades();
    // if (this.$route.query && this.$route.query.id) {
    //   this.isEditing = true;
    //   this.getUsuarios(this.$route.query.id);
    // } else {
    this.getUsuarios();
    // }
  },
  methods: {
    changePassword() {
      this.passwordDialog = true;
    },
    async savePassword() {
      if(this.editedItem.password !== this.editedItem.password_confirmation) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas no coinciden',
        })
        return;
      }
      this.loading = true;
      await updatePassword(this.editedItem.id, this.editedItem).then((res) => {
        console.log(res);
        this.passwordDialog = false;
        this.dialog = false;
        this.loading = false;
        this.getUsuarios();
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch((err) => {
        console.log(err);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal',
        })
      })
    },
    async saveAvatar() {
      // console.log(this.file);
      // console.log(this.fileSource);
      // console.log(this.editedItem);
      const formData = new FormData();
      this.loading = true;
      formData.append('avatar', this.file);
      await updateAvatar(this.editedItem.id, formData).then((res) => {
        console.log(res);
        this.avatarDialog = false;
        this.dialog = false;
        this.loading = false;
        this.file = null;
        this.fileSource = null;
        this.getUsuarios();
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      })


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
    crearUsuario() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.formTitle = 'Nuevo Usuario';
      this.isEditing = false;
      this.editEmail = true;
      // this.valid = this.$refs.form.validate();
      this.dialog = true;
    },
    async getUsuarios() {
      this.loading = true;
      await getListUsers().then((response) => {
        this.usuarios = response.usuarios;
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
    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.formTitle = 'Editar Usuario'
      this.isEditing = true;
      this.editEmail = false;
      this.dialog = true
    },
    async deleteItem(item) {
      await Swal.fire(
          'Esta seguro de eliminar este usuario?',
          'No podra revertir esta accion!',
          'warning'
      ).then(async (result) => {
        if (result.isConfirmed) {
          this.loading = true;
          await deleteUser(item.id).then(async (response) => {
            this.loading = false;
            await Swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
            );
            await this.getUsuarios();
          }).catch(async (error) => {
            console.log(error.response.data.msg);
            this.loading = false;
            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.msg,
            });
          })
        }
      })
    },
    close() {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    async save() {
      if (this.editedIndex > -1) {
        //  guardar usuario
        await updateUser({
          id: this.editedItem.id,
          name: this.editedItem.name,
          email: this.editedItem.email,
          role: this.editedItem.role,
        }).then((response) => {
          console.log(response.data);
          this.close()
        }).catch((error) => {
          console.log(error);
        });
      } else {
        //  guardar usuario
        await createUser(this.editedItem).then((response) => {
          console.log(response);
          this.close()
        }).catch((error) => {
          console.log(error)
        })
      }
      await this.getUsuarios();
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped src="@/assets/dropfile.css"></style>
<style scoped>
.gradientBackground {
  background: linear-gradient(45deg, #318BFD 0%, #318BFD 100%);
  overflow-y: auto;
}
</style>
