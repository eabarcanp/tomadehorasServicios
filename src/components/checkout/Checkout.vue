<template>
  <v-layout
      justify-center
      align-center
      style="background-color: #ffffff; height: 100%"
  >
    <v-snackbar
        v-model="showMessage"
        vertical
        bottom
        center
        :color="messageColor"
    >
      <p class="mb-0">{{ message }}</p>
    </v-snackbar>
    <v-container>
      <v-row v-if="!loading">
        <v-col cols="12" sm="6" v-if="showLogin && !showCheckout">
          <h3 class="text-center black--text">Ingresa a tu cuenta</h3>
          <v-layout
              flex-column
              flex-md-row
              justify-center
              align-center
              style="width: 100%"
          >
            <!-- <v-img
              max-height="300"
              max-width="300"
              :src="require('../../assets/imgs/logo_sosclick.png')"
            ></v-img> -->
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="d-flex flex-column flex-grow-1"
                style="max-width: 400px; width: 100%"
            >
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="userPassword"
                  :rules="passwordRules"
                  label="Contraseña"
                  required
                  :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (passType = !passType)"
                  :type="passType ? 'password' : 'text'"
              ></v-text-field>
              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="loginUser"
              >
                Ingresar
              </v-btn>
              <v-btn
                  color="primary"
                  class="mr-4 mt-4"
                  @click="showLogin = false"
              >
                Registrate
              </v-btn>
            </v-form>
          </v-layout>
        </v-col>
        <v-col cols="12" sm="6" v-if="!showLogin && !showCheckout">
          <h3 class="text-center black--text">Registrate</h3>
          <v-layout
              flex-column
              flex-md-row
              justify-center
              align-center
              style="width: 100%"
          >
            <!-- <v-img
              max-height="300"
              max-width="300"
              :src="require('../../assets/imgs/logo_sosclick.png')"
            ></v-img> -->
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="d-flex flex-column flex-grow-1"
                style="max-width: 400px; width: 100%"
            >
              <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Nombre"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="lastName"
                  :rules="lastNameRules"
                  label="Apellido"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="userPassword"
                  :rules="passwordRules"
                  label="Contraseña"
                  required
                  :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (passType = !passType)"
                  :type="passType ? 'password' : 'text'"
              ></v-text-field>
              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="registerUser"
              >
                Registrarse
              </v-btn>
              <v-btn
                  color="primary"
                  class="mr-4 mt-4"
                  @click="showLogin = true"
              >
                Ingresar
              </v-btn>
            </v-form>
          </v-layout>
        </v-col>
        <v-col cols="12" sm="6" v-if="showCheckout">
          <h3 class="text-center black--text">Datos de envío</h3>
          <v-layout
              flex-column
              flex-md-row
              justify-center
              align-center
              style="width: 100%"
          >
            <!-- <v-img
              max-height="300"
              max-width="300"
              :src="require('../../assets/imgs/logo_sosclick.png')"
            ></v-img> -->
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="d-flex flex-column flex-grow-1"
                style="max-width: 400px; width: 100%"
            >
              <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Nombre"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="lastName"
                  :rules="lastNameRules"
                  label="Apellido"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Teléfono"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-text-field
                  v-model="address"
                  :rules="addressRules"
                  label="Dirección"
                  required
                  class="custom-placeholer-color"
              ></v-text-field>

              <!-- select de region -->
              <v-select
                  v-model="region"
                  :items="regions"
                  item-text="region"
                  item-value="id"
                  label="Región"
                  :rules="regionRules"
                  required
                  class="custom-placeholer-color"
                  @change="changeRegion"
              ></v-select>
              <!-- select de comuna -->
              <v-select
                  v-model="commune"
                  :items="communes"
                  item-text="comuna"
                  item-value="id"
                  label="Comuna"
                  :rules="communeRules"
                  required
                  class="custom-placeholer-color"
                  no-data-text="Debe seleccionar una región"
              ></v-select>
              <v-text-field
                  v-model="zipCode"
                  label="Código postal"
                  class="custom-placeholer-color"
              ></v-text-field>
              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="startPayment"
              >
                Comprar
              </v-btn>
            </v-form>
          </v-layout>
        </v-col>
        <v-col cols="12" sm="6">
          <v-layout
              flex-column
              flex-md-row
              justify-center
              align-center
              style="width: 100%"
          >
            <v-card class="mx-auto rounded-xl" style="width: 100%">
              <v-card-text class="text-center">
                <img src="images/24.png" loading="lazy" alt="" class="" style="max-width: 350px"/>
                <h2 class="">{{ selectedPlan.name }}</h2>
                <div class="">Valor Bruto</div>
                <div class="font-weight-bold text-h5">
                  ${{ selectedPlan.price | currency }}/Año
                </div>
                <div class=""></div>
                <v-divider inset></v-divider>
                <v-list-item v-if="selectedPlan">
                  <v-list-item-content>
                    <v-list-item-title
                        class="my-2"
                        v-for="item in selectedPlan.description"
                        :key="item"
                    >
                      {{ item }}
                    </v-list-item-title>

                    <!--li>
              <div class="pricing-feature ">Monitoreo online</div>
            </li>
            <li>
              <div class="pricing-feature ">Consulta online</div>
            </li-->
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-layout>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
              indeterminate
              color="success"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import {mapGetters} from "vuex";
import {comunasActivas, getUser, login,  regionesActivas, register} from "@/helpers/api/user";
import {startPaymentPlan,} from "@/helpers/api/planes";

export default {
  name: "Checkout",
  components: {},
  computed: {
    ...mapGetters(["userData"]),
  },
  filters: {
    currency(value) {
      return value.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
    },
  },
  watch: {
    userData: function () {
      this.loading = false;
      this.showLogin = false;
      this.showCheckout = true;
      this.email = this.$store.state.userData.email || "";
      this.name = this.$store.state.userData.name.split(" ")[0] || "";
      this.lastName = this.$store.state.userData.name.split(" ")[1] || "";
      this.phone = this.$store.state.userData.info.telefono || "";
      setTimeout(() => {
        this.validate();
      }, 100);
    },
  },
  data: () => ({
    loading: false,
    valid: false,
    showMessage: false,
    showLogin: true,
    showCheckout: false,
    toPayPlan: {
      product_id: 1,
      qty: 1,
    },
    requestedStatus: false,
    pais_id: 81,
    regions: [],
    communes: [],
    messageColor: "error",
    message: "",
    email: "",
    emailRules: [
      (v) => !!v || "Email es obligatorio",
      (v) => /.+@.+\..+/.test(v) || "Email debe ser válido",
    ],
    userPassword: "",
    passwordRules: [(v) => !!v || "Contraseña es requerida"],
    passType: true,
    name: "",
    nameRules: [(v) => !!v || "Nombre es requerido"],
    lastName: "",
    lastNameRules: [(v) => !!v || "Apellido es requerido"],
    phone: "",
    phoneRules: [(v) => !!v || "Teléfono es requerido"],
    address: "",
    addressRules: [(v) => !!v || "Dirección es requerida"],
    region: "",
    regionRules: [(v) => !!v || "Región es requerida"],
    commune: "",
    communeRules: [(v) => !!v || "Comuna es requerida"],
    zipCode: "",
    zipCodeRules: [(v) => !!v || "Código postal es requerido"],
    items: [
      {
        name: "Plan Básico",
        price: "149.990",
        id: 1,
        description: [
          "Aplicación Móvil y Smartband",
          "Realizar mediciones manuales y Automáticas tipo Holter",
          "ECG o Electrocardioagrama con interpretación de Inteligencia Artificial (IA)",
          "Historial de mediciones en la aplicación móvil y en el Portal Web",
          "Red de Seguridad y Emergencia Personal (5 usuarios)",
        ],
      },
      // {
      //   name: "Plan Premium",
      //   price: "349.990",
      //   id: 2,
      //   description: [
      //     "Aplicación Móvil y Smartband",
      //     "Realizar mediciones manuales y Automáticas tipo Holter",
      //     "ECG o Electrocardioagrama con interpretación de Inteligencia Artificial (IA)",
      //     "Historial de mediciones en la aplicación móvil y en el Portal Web",
      //     "Red de Seguridad y Emergencia Personal (5 usuarios)",
      //     "Monitoreo online Anual en horario diurno oficina",
      //     "Consulta Médica online (Una por mes)",
      //   ],
      // },
    ],
    selectedPlan: {},
  }),
  mounted() {
    // obtener id del plan desde la url
    this.selectedPlan = this.items.find(
        (item) => item.id == this.$router.currentRoute.query.plan
    );

    // si no existe el plan, redireccionar a la pagina home
    if (!this.selectedPlan) {
      this.$router.push({name: "Home"});
    }
    this.getRegions(this.pais_id);
    this.toPayPlan.product_id = this.selectedPlan.id;
    this.toPayPlan.qty = 1;

  },
  beforeDestroy() {
    this.$store.commit("logoutUser", null);
  },
  methods: {
    async startPayment() {

      this.loading = true;
      this.toPayPlan = {
        ...this.toPayPlan,
        email: this.email,
        name: this.name,
        last_name: this.lastName,
        phone: this.phone,
        address: this.address,
        region_id: this.region,
        comuna_id: this.commune,
        zip_code: this.zipCode || null,
      };

      const planPayment = await startPaymentPlan(this.toPayPlan);
      if (planPayment.code === 200) {
        if (
            planPayment.flowData &&
            planPayment.flowData.url &&
            planPayment.flowData.token
        ) {
          window.location.href = planPayment.flowData.url + "?token=" + planPayment.flowData.token;
        }
      } else {
        this.loading = false;
        this.showMessage = true;
        this.messageColor = "error";
        this.message = "Lo sentimos, no se pudo iniciar el pago";
      }
    },
    changeRegion(value) {

      this.getComunas(value)
    },
    async getRegions(pais_id) {
      const regiones = await regionesActivas({pais_id})
      this.regions = regiones.regiones
      if (this.region) {
        await this.getComunas(this.region)
      } else {
        this.comunas = []
      }
    },
    async getComunas(region_id) {
      const comunas = await comunasActivas({region_id})
      this.communes = comunas.comunas
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    loginUser() {
      const self = this;
      login(this.email, this.userPassword)
          .then(function (resp) {
          })
          .catch(function (error) {
            self.message =
                "Lo sentimos, ha ocurrido un error inesperado. Por favor inténtalo nuevamente.";
            if (error.response && error.response.status == 401) {
              self.message =
                  "Email o contraseña incorrectos. Por favor verifica los datos ingresados.";
            }
            self.messageColor = "warning";
            self.showMessage = true;
            console.log(error.response);
          });
    },
    registerUser() {
      const self = this;
      register(this.email, this.userPassword)
          .then(function (resp) {
            self.message = "Usuario registrado correctamente";
            self.messageColor = "success";
            self.showMessage = true;
            self.showLogin = true;
            self.showCheckout = false;
          })
          .catch(function (error) {
            self.message =
                "Lo sentimos, ha ocurrido un error inesperado. Por favor inténtalo nuevamente.";
            // if (error.response && error.response.status == 401) {
            //   self.message =
            //     "Email o contraseña incorrectos. Por favor verifica los datos ingresados.";
            // }
            self.messageColor = "warning";
            self.showMessage = true;
            console.log(error.response);
          });
    },
    async getUserInfo() {
      if (!this.$store.state.userData) {
        this.loading = true;
        await getUser()
            .then((resp) => {
              this.loading = false;
              this.showLogin = false;
              this.showCheckout = true;
              this.email = resp.user.email || "";
              this.name = resp.user.name.split(" ")[0] || "";
              this.lastName = resp.user.name.split(" ")[1] || "";
              this.phone = resp.user.info.telefono || "";
            })
            .catch((error) => {
              this.loading = false;
              this.showLogin = true;
              this.showCheckout = false;
              console.log(error);
            });
      }
      this.validate();
    },
  },
};
</script>

<style>
</style>
