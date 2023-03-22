<template>

  <v-row align="center" justify="center">
    <v-snackbar
        v-model="showMessage"
        vertical
        bottom
        center
        :color="messageColor"
    >
      <p class="mb-0">{{ message }}</p>
    </v-snackbar>
    <v-col cols="10" sm="6" md="4">
      <v-card class="elevation-24 rounded-xl background-login">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row>
              <v-col cols="12">
                <v-card-text class="mt-12">
                  <v-img
                      src="@/assets/logoBlanco.png"
                      class="mx-auto"
                      max-width="250"
                      contain
                  ></v-img>

                  <v-form class="mt-8">
                    <v-text-field
                        name="Email"
                        v-model="email"
                        :rules="emailRules"
                        type="text"
                        background-color="white"
                        required
                        prepend-inner-icon="mdi-account"
                        outlined
                        dense
                        class="inputForm"
                        filled
                        color="primary"
                        placeholder="Email"
                    />

                    <v-text-field
                        id="password"
                        name="password"
                        v-model="password"
                        :rules="passwordRules"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        required
                        color="primary"
                        outlined
                        :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (passType = !passType)"
                        :type="passType ? 'password' : 'text'"
                        background-color="white"
                        class="inputForm"
                        dense
                        placeholder="Contraseña"
                    />
                  </v-form>
                  <h3 class="text-center mt-4 white--text font-weight-light">¿Olvidaste tu contraseña?</h3>
                </v-card-text>
                <div class="text-center my-3 white--text">
                  <v-btn
                      class="blue--text rounded-lg"
                      elevation="0"
                      @click="loginUser">Ingresar
                  </v-btn>
                </div>
              </v-col>

            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import {login, register} from '@/helpers/api/user'

export default {
  name: "Login",
  data: () => ({
    step: 1,
    email: "",
    password: "",
    name: "",
    passType: true,
    message: "",
    messageColor: "",
    showMessage: false,
    nameRules: [
      (v) => !!v || "El nombre es requerido",
    ],
    passwordRules: [
      v => !!v || 'Contraseña es requerida'
    ],
    emailRules: [
      v => !!v || 'Email es obligatorio',
      v => /.+@.+\..+/.test(v) || 'Email debe ser válido',
    ],
  }),
  props: {
    source: String
  },
  methods: {
    goToRegister() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.step++
    },
    goToLogin() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.step--
    },
    async registerUser() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      register(data).then(res => {
        console.log(res)
        this.goToLogin()
      }).catch(err => {
        console.log(err)
      })
    },
    loginUser() {
      const self = this
      login(this.email, this.password)
          .then(function (resp) {
            self.$router.push({name: 'Horas'})
            console.log(resp)
          })
          .catch(function (error) {
            self.message = 'Lo sentimos, ha ocurrido un error inesperado. Por favor inténtalo nuevamente.'
            if (error.response &&( error.response.status === 401 || error.response.status === 400)) {
              self.message = 'Email o contraseña incorrectos. Por favor verifica los datos ingresados.'
            }
            self.messageColor = 'warning'
            self.showMessage = true
            console.log(error.response)
          })
    },

  },

}
</script>

<style scoped>
.background-login {
  background: linear-gradient(140deg, #5CC0FF 0%, #003CC7 100%) !important;
}

.inputForm {
  border-radius: 10px !important;
}
</style>
