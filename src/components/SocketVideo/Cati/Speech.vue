<template>
	<div v-if="speech && speech.length > 0">
		<p class="mb-0 pa-1 single-container"
			v-for="(speech, index) in speech"
			:key="index"
			:style="getBackgroundSelected(index)"
			@click="selectedTo = index">
			<v-chip
      color="#2250b3"
			small
			text-color="white"
      class="ma-2">{{index + 1}}</v-chip>
			{{replaceStrings(speech)}}</p>
	</div>
	<div v-else class="pt-4">
		No hay un speech cargado, si lo deseas puedes generarlo en la sección "Administración"
	</div>
</template>

<script>
export default {
	computed: {
		speech() {
			if(this.$store.state.Company.companyServices && this.$store.state.Company.companyServices.cati_speech){
				return this.$store.state.Company.companyServices.cati_speech.speech_text
			}
			return null
		}
	},
  data() {
    return {
			selectedTo: 0
    }
  },
	methods: {
		replaceStrings(rawSpeech) {
			let replaced = rawSpeech
			if(this.$store.state.Videocall.clientData){
				if(this.$store.state.Videocall.clientData.name){
					replaced = replaced.replace('{userName}', this.$store.state.Videocall.clientData.name)
				}
				if(this.$store.state.Videocall.clientData.phone){
					replaced = replaced.replace('{userEmail}', this.$store.state.Videocall.clientData.name)
				}
				if(this.$store.state.Videocall.clientData.phone_number){
					replaced = replaced.replace('{userPhone}', this.$store.state.Videocall.clientData.phone_number)
				}
			}
			return replaced
		},
		getBackgroundSelected(index){
			return this.selectedTo >= index ? 'background-color: #434343':''
		}
	}
}
</script>
<style scoped>
	.single-container:hover{
		background-color: #434343;
		cursor: pointer;
	}
</style>