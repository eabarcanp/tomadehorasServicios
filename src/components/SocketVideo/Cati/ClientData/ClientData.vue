<template>
	<div>
		<v-dialog
			persistent
			width="600"
			v-model="this.$store.state.Videocall.userDataRequestModal"
		>
			<v-card>
				<v-card-title class="my-0 py-1 d-flex justify-space-between" style="background-color: #2250b3;">
					<p class="white--text mb-0 body-1 font-weight-bold">Solicite información al usuario</p>
					<v-btn @click="closeModal" icon x-small color="white">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form
							ref="form"
							v-model="valid"
							lazy-validation
							class="mt-3">
							<v-row dense>
								<v-col cols="12">
									<v-text-field
										v-model="name"
										label="Nombre Usuario"
										:rules="requiredRules"
										class="py-0 my-0"
									></v-text-field>
									<v-text-field
										v-model="email"
										label="Email Usuario"
										:rules="requiredRules"
										class="py-0 my-0"
									></v-text-field>
									<v-text-field
										v-model="phone_number"
										label="Teléfono Usuario"
										class="py-0 my-0"
									></v-text-field>
								</v-col>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="#2250b3"
						text
						@click="sendForm"
						:loading="loadingRequest"
					>
						Guardar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {addClientCall} from '@/helpers/api/cati'
export default {
	name: 'ClientData',
  data() {
		return{
			loadingRequest: false,
			valid: true,
			name: null,
			email: null,
			phone_number: null,
      requiredRules: [
        v => !!v || 'Campo requerido'
      ]
		}
	},
	mounted(){
		this.setData()
	},
	methods: {
		setData(){
			if(this.$store.state.Videocall.clientData){
				this.name = this.$store.state.Videocall.clientData.name,
				this.email = this.$store.state.Videocall.clientData.email,
				this.phone_number = this.$store.state.Videocall.clientData.phone_number
			}
		},
		closeModal(){
			this.$store.commit('Videocall/setUserDataRequestModal', false)
		},
		async sendForm(){
			const data = {
				videocall_id: 3,
				name: this.name,
				email: this.email,
				phone_number: this.phone_number
			}
			this.loadingRequest = true
			const client = await addClientCall(data)
			this.loadingRequest = false
			if(client.success){
				this.$store.commit('Videocall/setClientData', client.data)
				this.$store.commit('Videocall/setUserDataRequestModal', false)
			}
		}
	}
}
</script>