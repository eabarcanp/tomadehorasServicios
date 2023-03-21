<template>
	<v-dialog
			v-model="dialog"
			persistent
			max-width="600px"
		>
		<v-card v-show="step === 1">
			<v-card-title>
				<v-img
					:src="require('../../assets/imgs/device-wipe.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Borrado del dispositivo</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<h3 class="title text-center mb-3" style="color: #707070;">¡Esto borrará toda tu información!</h3>
							<h4>Borrar Información de <span class="text-capitalize">{{$store.state.selectedDevice.device_brand}} {{$store.state.selectedDevice.device_name}}</span></h4>
							<p class="caption">Si permitiste a SOSclick ser Administrador de tu dispositivo esta funcionalidad eliminará toda la información y aplicaciones de tu teléfono.</p>
							<v-alert
								color="warning"
								dark
								dense
								icon="mdi-information"
								border="left"
								prominent
								class="custom-alert-info mb-0"
							>
								<p class="caption mb-0"><b>Por favor ten en cuenta:</b> Esta función borrará toda la información y aplicaciones de tu dispositivo (incluyendo SOSclick). Utiliza esta función sólo si crees que no puedes recuperar tu dispositivo y si necesitas proteger información privada.</p>
							</v-alert>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="password"
								:rules="[
									() => !!password || 'Debes ingresar tu contraseña en SOSclick para confirmar esta acción.'
								]"
								label="Tu Contraseña"
								placeholder="Tu Contraseña"
								:append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="() => (passType = !passType)"
								:type="passType ? 'password' : 'text'"
							></v-text-field>
							<v-alert
								v-if="wrongPass"
								dense
								outlined
								border="left"
								type="error"
							>
								<p class="caption mb-0">Contraseña incorrecta</p>
							</v-alert>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<div class="d-flex justify-center align-center mb-3 flex-wrap" style="width: 100%;">
					<v-btn
						color="#707070"
						text
						rounded
						outlined
						@click="closeDialog()"
						style="width: 200px;"
						class="mx-2"
						:class="$vuetify.breakpoint.mobile ? 'mb-3':''"
						:block="$vuetify.breakpoint.mobile"						
					>
						<p class="body-2 mb-0" >Cancelar</p>
					</v-btn>
					<v-btn
						color="#D0282E"
						depressed
						rounded
						dark
						style="width: 200px;"
						class="mx-2 custom-button-disabled-sos"
						:disabled="!password"
						@click="startWipe($store.state.selectedDevice)"
						:block="$vuetify.breakpoint.mobile"
					>
						<p class="body-2 mb-0">Limpiar Dispositivo</p>
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
		<v-card v-show="step === 2">
			<v-card-title>
				<v-img
					:src="require('../../assets/imgs/device-wipe.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Borrado del dispositivo</span>
			</v-card-title>
			<v-card-text class="pa-4">
				<div v-if="deviceIsThere" class="text-center">
					<h3>Preparando para borrar información</h3>
					<h4>Por favor mantén está página abierta mientras el proceso esté ejecutándose</h4>
					<v-icon
						style="font-size: 100px;"
						color="#D0282E">
						mdi-close-octagon-outline
					</v-icon>
					<v-progress-linear color="#D0282E" :value="( (20 - seconds)*100/20 )"></v-progress-linear>
					<p>Tienes {{seconds}} segundos para cancelar esta acción.</p>
					<v-btn
						color="#D0282E"
						x-large
						dark
						block
						class="mt-3"
						@click="cancelWipe($store.state.selectedDevice)"
					>
						DETENER
					</v-btn>
				</div>
				<div class="text-center" v-else>
					<v-progress-circular
						:width="3"
						:size="70"
						color="#D0282E"
						indeterminate
					></v-progress-circular>
					<h4>Esperando que el dispositivo responda a la solicitud</h4>
					<h4>Por favor mantén está página abierta mientras el proceso esté ejecutándose</h4>
					<v-alert
						v-if="message.status"
						dense
						text
						:type="message.color"
					>
						<p class="mb-0 caption">{{this.message.text}}</p>
					</v-alert>
				</div>
			</v-card-text>
		</v-card>
		<v-card v-show="step === 3">
			<v-card-title>
				<v-img
					:src="require('../../assets/imgs/device-wipe.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Borrado del dispositivo</span>
			</v-card-title>
			<v-card-text class="pa-4">
				<div class="text-center">
					<h3>Proceso Finalizado</h3>
					<div v-if="status === 1">
						<v-icon
							style="font-size: 100px;"
							color="success">
							mdi-check-circle-outline
						</v-icon>
						<p>Se ha completado el proceso, el dispositivo está borrando la información.</p>
					</div>
					<div v-else>
						<v-icon
							style="font-size: 100px;"
							color="warning">
							mdi-alert-circle-check-outline
						</v-icon>
						<p>Se ha detenido el proceso, no se eliminará tu información del dispositivo.</p>
					</div>
				</div>
			</v-card-text>
			<v-card-actions>
				<div class="d-flex justify-center align-center mb-3" style="width: 100%;">
					<v-btn
						color="#707070"
						text
						rounded
						outlined
						@click="closeDialog()"
						style="width: 200px;"
						class="mx-2"
					>
						<p class="body-2 mb-0" >Cerrar</p>
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import * as firebase from 'firebase/app'
	import {wipePhoneData, validatePass} from '../../helpers/api/user'
	
	export default {
		name: 'ModalWipeData',
		props: ['dialog'],
		data: () => ({
			password: null,
			deleting: false,
			seconds: 25,
			deviceIsThere: false,
			message: {
				status: false,
				text: '',
				color: 'success'
			},
			step: 1,
			status: 1,
			passType: true,
			wrongPass: false
		}),
		mounted () {
		},
		methods: {
			closeDialog(){
				this.$store.commit('setModalsStates', {wipeData: false})
				setTimeout(() => {
					this.restoreDefaults()
				}, 1000);
			},
			restoreDefaults(){
				this.password = null
				this.deleting = false
				this.seconds = 25
				this.deviceIsThere = false
				this.message = {
					status: false,
					text: '',
					color: 'success'
				}
				this.step = 1
				this.status = 1
				this.wrongPass = false
				this.passType = true
			},
			async startWipe(device){
				const validPass = await validatePass({password: this.password})
				if(validPass && validPass.status){
					this.wipePhone(device)
				}
				else{
					this.wrongPass = true
					setTimeout(() => {
						this.wrongPass = false
					}, 3000);
				}
			},
			wipePhone(device){
				const deviceID = device.device_id
				const path = 'SOSclick/wipeData/' + deviceID
				firebase.database(this.$store.state.primaryDB).ref(path).set({ayThere: true})
				wipePhoneData({device_id: deviceID})
				this.deleting = true
				this.setWipeListeners(deviceID)
			},
			setWipeListeners(deviceID){
				this.step = 2
				const path = 'SOSclick/wipeData/' + deviceID
				const self = this
				firebase.database(this.$store.state.primaryDB).ref(path).on('child_added',function(data){
					if(data.key === 'imHere'){
						self.message = {
							status: true,
							text: 'El teléfono ha respondido, a continuación esperaremos unos segundos para que puedas cancelar este proceso.',
							color: 'success'
						}
						setTimeout(function() {
							self.deviceIsThere = true
						}, 5000);

						const interval = setInterval(() => {
							self.seconds = self.seconds - 1
							if(self.seconds == 0){
								clearInterval(interval)
							}
						}, 1000);
					}
					if(data.key === 'deleting'){
						self.step = 3
						self.status = 1
						firebase.database(self.$store.state.primaryDB).ref(path).off('child_added')
						firebase.database(self.$store.state.primaryDB).ref(path).remove()
					}
					if(data.key === 'cancelingWipe'){
						self.step = 3
						self.status = 2
						firebase.database(self.$store.state.primaryDB).ref(path).off('child_added')
						firebase.database(self.$store.state.primaryDB).ref(path).remove()
					}
				})
			},
			cancelWipe(device){
				this.step = 3
				this.status = 2
				const deviceID = device.device_id
				const path = 'SOSclick/wipeData/' + deviceID
				firebase.database(this.$store.state.primaryDB).ref(path).off('child_added')
				firebase.database(this.$store.state.primaryDB).ref(path).remove()
			}
		}
	}
</script>
