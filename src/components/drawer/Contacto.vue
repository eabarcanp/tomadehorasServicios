<template>
  <v-container fluid class="py-0">
    <v-container>
      <v-row>
        <v-col sm="6" cols="9">
          <div :class="!$vuetify.breakpoint.mobile ? 'mt-10 ml-7' : 'mt-10'">
            <p
              style="color: #feb62d"
              :class="!$vuetify.breakpoint.mobile ? 'display-2' : 'display-1'"
            >
              <v-icon
                :class="!$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-n2 mb-2 '"
                color="#FEB62D"
                style="font-size: 65px"
                >mdi-pencil</v-icon
              >
              Contacto
            </p>
          </div>
        </v-col>
        <v-col sm="6" cols="3">
          <div class="mt-12 text-end">
            <v-btn @click="volver" text
              ><v-icon color="#FEB62D" style="font-size: 50px"
                >mdi-arrow-left</v-icon
              ></v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-container>
          <v-form ref="formContac" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formContac.nombre"
                  require
                  solo
                  :rules="requireRule"
                  background-color="white"
                  label="Nombre"
                />
                <v-text-field
                  require
                  v-model="formContac.correo"
                  solo
                  :rules="emailRules"
                  background-color="white"
                  label="Correo Electronico"
                />
                <v-text-field
                  require
                  v-model="formContac.numeroTelefonico"
                  solo
                  :rules="requireRule"
                  background-color="white"
                  label="Numero de Teléfono"
                />
                <v-textarea
                  v-model="formContac.mensaje"
                  require
                  auto-grow
                  :rules="requireRule"
                  background-color="white"
                  label="Mensaje"
                  solo
                />
              </v-col>
            </v-row>
            <v-container class="d-flex align-center justify-center">
              <v-btn
                @click="postContacto()"
                color="#feb62d"
                elevation="0"
                :disabled="!disnableBtn"
                width="200"
                :loading="loading"
                height="45"
                style="color: white"
                class="rounded-xl title font-weight-bold"
              >
                Enviar
              </v-btn>
            </v-container>
          </v-form>
        </v-container>
      </v-col>
      <v-col class="hidden-sm-and-down" sm="12" md="6" cols="12">
        <v-container>
          <div>
            <v-img eager contain :src="require('../../assets/VideoMail.png')" />
          </div>
        </v-container>
      </v-col>
    </v-row>
    <div>
        <v-snackbar  color="#FEC12D" v-model="snackbar" :timeout="timeout">
          <div class="d-flex align-center justify-center">
            <p style="color: white" class="title">{{ text }}</p>
          </div>
        </v-snackbar>      
    </div>
  </v-container>
</template>

<script>
import { postFormContac } from "../../helpers/click2call/api/calls";
export default {
  props: {
    volver: { type: Function },
    ocultar: {
      type: Function,
    },
    derived: {
      type: Number,
    },
  },
  data() {
    return {
      timeout:5000,
      snackbar:false,
      text:'',
      loading:false,
      valid: false,
      requireRule: [
        (v) => (v && v.length >= 1) || "Debe completar este campo.",
      ],
      emailRules: [
        (v) => !!v || "El Correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo es incorrecto",
      ],
      formContac: {
        nombre: "",
        correo: "",
        numeroTelefonico: `+569`,
        mensaje: "",
      },
    };
  },
  computed: {
    disnableBtn() {
      return this.formContac.nombre != '' &&
      this.formContac.correo != '' &&
      this.formContac.numeroTelefonico != `+569` &&
      this.formContac.mensaje != ''
    }
  },
  methods: {
    async postContacto() {
      this.loading = true,
      postFormContac({
        name: this.formContac.nombre,
        email: this.formContac.correo,
        phone_number: this.formContac.numeroTelefonico,
        message: this.formContac.mensaje,
      })
        .then((resp) => {
          if(resp.success){
              this.text = 'Formulario Enviado Con Exito!'
              this.snackbar = true            
            setTimeout(() => {
              this.snackbar = false,
              this.loading = false,
              this.ocultar();
              this.$store.commit('setModalButton', 0)
              this.$refs.formContac.reset();
            }, 3000);            
          }
          console.log("FormContacto", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg{
  background-color: #feb52d50 !important;
}
</style>