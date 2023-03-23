<template>
  <v-container>
    <v-row>
      <v-col sm="6" cols="10">
        <div class="mt-8 ml-7">
          <p
            style="color: #feb62d"
            :class="!$vuetify.breakpoint.mobile ? 'display-1' : 'display-1 '"
          >
            <v-icon
              :class="!$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-n3 '"
              color="#FEB62D"
              style="font-size: 65px"
              >mdi-video-outline</v-icon
            >
           Videollamada
          </p>
        </div>
      </v-col>
      <v-col sm="6" cols="2">
        <div
          :class="
            !$vuetify.breakpoint.mobile ? 'mt-12 text-end' : ' mt-9 ml-n10'
          "
        >
          <v-btn @click="volver()" text
            ><v-icon color="#FEB62D" style="font-size: 50px"
              >mdi-arrow-left</v-icon
            ></v-btn
          >
        </div>
      </v-col>
    </v-row>
  
    <v-row class="d-flex justify-center align-center mt-16">
      <v-col xl="6" lg="6" md="6" cols="12">
        <v-card  elevation="0" style="background:transparent">
          <v-row>
            <v-col>
              <p style="color:#feb62d" class="title text-center">Selecciona una categoría</p>
              <v-select
              background-color="white"
                style="width:50%"
                class="mx-auto"
                v-model="itemSpeciality"
                label="General"
                :items="items"
                item-text="name"
                item-value="id"
                single-line
                dense
                outlined
              >
              </v-select>
              <div class="text-center">
                  <v-btn width="120" style="color:white" color="#feb62d" class="rounded-lg" @click="videoCall()">Llamar</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <!-- <v-btn @click="videoCall()">test</v-btn> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {speciality} from '../../helpers/click2call/api/calls'
export default {
  props: {
    volver: {
      type: Function,
    },
  },

  data() {
    return {
      itemSpeciality: null,
      items:[],
    };
  },
  mounted () {
      this.speciality();
  },
  methods: {
    videoCall() {
      this.$store.commit("setStep", 2);
      this.$store.commit("setSpeciality", this.itemSpeciality);
    },
    async speciality(){
        const getSpeciality = await speciality();
        this.items = getSpeciality.data
        // console.log("getSpeciality",this.items);

    }

  },
};
</script>

<style>
</style>