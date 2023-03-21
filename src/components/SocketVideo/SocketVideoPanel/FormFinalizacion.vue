<template>
  <v-dialog
    persistent
    width="800"
    v-model="this.$store.state.cardFormStateVideoCall"
  >
    <v-container style="background: #3364d0">
      <!-- <div>
            <v-btn icon @click="$store.commit('setCardFormStateVideoCall', false)" >
                <v-icon size="35" color="white">mdi-close</v-icon>
            </v-btn>
        </div> -->
      <div
        class="mx-auto mb-10"
        style="
          background: #feb62d;
          border-radius: 100%;
          width: 150px;
          height: 150px;
        "
      >
        <v-img
          eager
          class="mx-auto"
          :src="require('../../../assets/WomanChico.png')"
          max-width="150"
          style="border-radius: 100%"
        />
      </div>
      <!--  -->
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            ¿Que solicitaba el cliente?
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            ¿Que hizo el Operador?
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3">
            ¿Cual fue la solución?
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card elevation="0">
              <v-textarea
                auto-grow
                v-model="request"
                single-line
                outlined
                label="Respuesta"
              ></v-textarea>
            </v-card>
            <v-btn color="primary" @click="e1 = 2"> Continuar </v-btn>

            <v-btn
              @click="
                solutionCallback(),
                  $store.commit('setCardFormStateVideoCall', false)
              "
              text
            >
              Omitir
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card elevation="0">
              <v-textarea
                auto-grow
                v-model="action"
                outlined
                label="Respuesta"
                single-line
              ></v-textarea>
            </v-card>
            <v-btn color="primary" @click="e1 = 3"> Continuar </v-btn>

            <v-btn @click="e1 = 1" text> Volver </v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card elevation="0">
              <v-textarea
                auto-grow
                v-model="solution"
                outlined
                label="Respuesta"
                single-line
              ></v-textarea>
            </v-card>
            <v-btn
              color="primary"
              @click="
                solutionCallback(),
                  $store.commit('setCardFormStateVideoCall', false)
              "
            >
              Finalizar
            </v-btn>

            <v-btn @click="e1 = 2" text> Volver </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <!--  -->
    </v-container>
  </v-dialog>
</template>

<script>
import { solutionCallback } from "@/helpers/click2call/api/calls";
export default {
  data() {
    return {
      e1: 1,
      request: "",
      action: "",
      solution: "",
      rule: [
        (v) =>
          (v && v.length >= 4) ||
          "Debe tener minimo 4 caracteres el formulario",
      ],
    };
  },
  computed: {
    disnableForm() {
      return this.request != "" && this.action != "" && this.solution != "";
    },
  },

  methods: {
    async solutionCallback() {
      const self = this;
      if(this.request == ""){
        this.request = "Sin Información"
      }
      if(this.action == ""){
        this.action = "Sin Información"
      }
      if(this.solution == ""){
        this.solution = "Sin Información"
      }

      solutionCallback({
        attentionable_id: this.$store.state.idRoomForm,
        request: this.request,
        action: this.action,
        solution: this.solution,
        attentionable_type: 2,
      })
        .then((resp) => {
          console.log("Funciono la solucion", resp);
          //   console.log(resp);
          (this.request = ""), (this.action = ""), (this.solution = "");
          this.$store.commit("setIdRoomForm", null);
          this.$router.push({ name: "DashBoard" });
        })
        .catch(function (err) {
          console.log("error", err);
        });
    },
  },
};
</script>

<style></style>
