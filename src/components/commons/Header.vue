<template>
  <div>
    <v-app-bar
        color="transparent"
        app
        height="100px"
        elevation="0"
    >
      <v-img
          src="@/assets/logoBlanco.png"
          max-width="150"
          max-height="150"
          class="mx-auto d-none d-sm-block"
      ></v-img>
      <v-spacer></v-spacer>
      <v-avatar
          size="80" color="grey lighten-2"
          class="rounded-xl"
      >
        <v-img
           :src="avatar"
          v-if="avatar"
           sizes="50"
        ></v-img>
        <v-icon
            v-else
            color="white">mdi-account</v-icon>
      </v-avatar>
      <div
        class="justify-start align-start ma-1 mx-3"
      >
        <p class="white--text font-weight-light ma-0">{{ formatRole(role) }}</p>
        <p class="white--text font-weight-light ma-0">
          {{ name }} </p>
      <v-btn
          x-small
          text
          color="white"
          @click="logout"
          style="text-decoration: underline"
      >
        Cerrar Sesión
      </v-btn>
      </div>



      <v-btn
          fab
          small
          color="white lighten-1 grey--text mx-3"
          elevation="0"
          @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute

        temporary
    >
      <v-list
          nav
          dense

          v-if="!loading"
      >
        <v-list-item-group
            v-model="group"
            active-class="blue--text text--accent-4"
        >
          <v-list-item
              @click="goTo('Medicos')"
              v-if="role === 'ADMIN_ROLE'"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tipos de Atención</v-list-item-title>
          </v-list-item>

          <v-list-item
              @click="goTo('Especialidades')"
              v-if="role === 'ADMIN_ROLE'"
          >
            <v-list-item-icon>
              <v-icon>mdi-clipboard-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Categorías</v-list-item-title>
          </v-list-item>
          <v-list-item
              @click="goTo('Horas')"
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reserva de Horas</v-list-item-title>
          </v-list-item>
          <v-list-item
              @click="goTo('Usuarios')"
              v-if="role === 'ADMIN_ROLE'"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>
          <v-list-item
              @click="goTo('Atenciones', {id: idMedico})"
              v-if="role === 'DOCTOR_ROLE'"
              :key="keyDrawer"
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Atenciones</v-list-item-title>
          </v-list-item>
          <v-list-item
              @click="goTo('Cita')"
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Horas Reservadas</v-list-item-title>
          </v-list-item>
          <v-list-item
              @click="goTo('Configuracion')"
              v-if="role === 'ADMIN_ROLE'"
          >
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Configuración</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="blue accent-4" dark @click="logout">
            <v-icon
                left
            >mdi-arrow-left
            </v-icon>
            Salir
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {getGeneralParams, getUserData} from "@/helpers/api/horas_medicas";

export default {
  name: "Header",
  data: () => ({
    drawer: false,
    group: null,
    role: null,
    idMedico: null,
    keyDrawer: 0,
    loading: true,
    name: null,
    avatar: null,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
  mounted() {
    this.getRole();
    this.getGeneralParams();
  },
  methods: {
    formatRole(role) {
      if (role === 'ADMIN_ROLE') {
        return 'Administrador'
      } else if (role === 'DOCTOR_ROLE') {
        return 'Atención'
      } else {
        return 'Toma de Horas'
      }
    },
    async getRole() {
      this.loading = true;
      if (this.$store.state.userData && this.$store.state.userData.role && this.$store.state.userData.id) {
        this.role = this.$store.state.userData.role;
        this.idMedico = this.$store.state.userData.id_doctor;
        this.name = this.$store.state.userData.name;
        this.avatar = this.$store.state.userData.avatar;
        this.keyDrawer++;
        this.loading = false;

      } else {
        await getUserData().then((res) => {
          this.role = res.role;
          this.idMedico = res.id_doctor || null;
          this.name = res.name;
          this.avatar = res.avatar;
          this.keyDrawer++;
          this.loading = false;
        });
      }
    },
    logout() {
      this.$store.commit("logoutUser", null);
      this.$router.push({name: "Login"});
    },
    goTo(route, params) {
      this.$router.push({name: route, params: params});
    },
    getGeneralParams() {
      if (!this.$store.state.generalParams) {
        getGeneralParams().then((res) => {
          this.$store.commit("setGeneralParams", res);
        });
      }
    }
  },
};
</script>
<style>
</style>
