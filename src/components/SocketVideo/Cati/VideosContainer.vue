<template>
	<div>
		<v-row dense>
			<v-col cols="12">
				<p class="my-2 font-weight-bold text-center">
					Videos SOSclick
				</p>
				<p class="body-1 text-center">Puedes reproducir uno de los videos para ti y/o enviarlo a la videollamda del usuario para que lo pueda visualizar</p>
			</v-col>
		</v-row>
		<v-row dense>
			<v-expansion-panels accordion dark>
				<v-expansion-panel v-for="(videoCat, index) in videosCats" :key="index">
					<v-expansion-panel-header color="#2250b3">
						<p class="mb-0 font-weight-bold white--text">
							{{videoCat.name}}
						</p>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-row dense>
							<v-col cols="6" style="width: 100%" v-for="(video, indexB) in videoCat.videos" :key="indexB">
								<YoutubeEmbed :videoID="video.url_code" />
								<v-btn x-small block tile :color="sharingVideo == video.url_code ? 'warning':'#2250B3'" dark
									@click="toggleShare(video.url_code)"
								>
									{{sharingVideo == video.url_code ? 'Dejar de Compartir video':'Enviar a usuario'}}
								</v-btn>
							</v-col>
						</v-row>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-row>
	</div>
</template>

<script>
import { getDatabase, ref, set, remove } from "firebase/database"
import YoutubeEmbed from './YoutubeEmbed'
export default {
  components: {
		YoutubeEmbed
  },
	props: {
		roomID: {
			type: String|Number,
			required: true
		}
	},
	computed: {
		videosCats() {
			return this.$store.state.Company.companyServices.cati_video_categories
		}
	},
  data() {
    return {
			videosIDs: [
				{
					playlist: 'Spots Publicitarios SOSclick',
					ids: [ 'd80oRIllaYU','3_jNeThqFmg','CqPmrL-uuLA','WfonFNYNQAw','ybev920xBwI','zbNIrpgrNA0' ]
				},
				{
					playlist: 'Funciones SOSclick App',
					ids: [ 'sTL6T_hDNaM','4gYy0IqAuVI','ReBRZGcJogo','syMuRuCtkkY','GN5fy4mhuoY','p9vpwZgfTrY','WuBmmNhV9vk','iHaSXlsDwUk','Nq57hKXqik0','TFtn_Nvr9CE','GUPWdhK0MDs','pOTIiEGBOso','UzPhT1HKB9g','F_vn75dx_aM','3O5zUoLFISI','ZX8dWmkisdQ','Cpwmd3OIaUM','E0RQ4sX_ZC0','suIEGbMot-U','3fqq_Psi78Q','EGqd0RObjjs','x7O6DUl_V7I','uPgr_ByND2k','tudiMdP_37Y','UOz3wtL2OTE','UuggZaapmcQ','x-NHFiy9OlQ','cUcvzN1W9ZQ','gBTBJLVSWLw','FnH2hYEjJdM','t7z5jFShcUA','gbreZ505S7s' ]
				},
				{
					playlist: 'Funcionalidades SOSclick Panel Web',
					ids: [ 'cnNXJ2-cGgM','w85IoFgU_wg','Y6pU-cBQ3QY','B8BSaacmBy0','y0ZfJzxoFl8','52V8VqR2Cjs','q3qTP-2itHg','wblnSIRRExY','X7DJDCkfABQ' ]
				}
			],
			sharingVideo: null
    }
  },
	methods: {
		toggleShare(videoID){
			if(this.sharingVideo == videoID){
				this.removeVideo()
			}
			else{
				this.shareVideo(videoID)
			}
		},
		shareVideo(videoID){
      const db = getDatabase();
      set(ref(db, "roomAdmin/" + this.roomID + "/videoPlay"), { videoID })
			this.sharingVideo = videoID
		},
		removeVideo(){
      const db = getDatabase();
			remove(ref(db, "roomAdmin/" + this.roomID + "/videoPlay"))
			this.sharingVideo = null
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