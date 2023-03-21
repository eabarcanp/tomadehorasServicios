<template>
	<v-dialog
			v-model="dialog"
			persistent
			max-width="600px"
			content-class="custom-dialog"
		>
		<v-card>
			<v-btn
				icon
				color="#707070"
				@click="$store.commit('setModalsStates', {lostPhone: false})"
				style="position: absolute; top: 20px; right: 20px;"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title>
				<v-img
					:src="require('../../assets/imgs/device-lost.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Pérdida de teléfono</span>
			</v-card-title>
			<v-card-text class="py-0" style="max-height: 60vh;overflow-y: scroll;">
				<v-container>
					<v-row>
						<v-col cols="12" style="color: #707070">
							<h4 v-if="deviceStatusConfig">Haz declarado como perdido tu dispositivo <span class="text-capitalize">{{$store.state.selectedDevice.device_brand}} {{$store.state.selectedDevice.device_name}}</span></h4>
							<h4 v-else>Vas a declarar como perdido tu dispositivo <span class="text-capitalize">{{$store.state.selectedDevice.device_brand}} {{$store.state.selectedDevice.device_name}}</span></h4>
							<p class="caption">Si asignaste la opción <b>“Mostrar sobre otras Apps”</b> a la app SOSclick, podremos enviarte periódicamente 2 fotografías (una de la cámara frontal y otra de la trasera) y la ubicación a tu correo. Si no asignaste esa opción sólo podremos enviarte la ubicación.</p>
							<v-alert
								:color="deviceStatusConfig ? 'success':'warning'"
								dark
								dense
								icon="mdi-information"
								border="left"
								prominent
								class="custom-alert-info ma-0"
							>
								<p v-if="deviceStatusConfig" class="caption mb-0"><b>Función Activa:</b> El dispositivo {{$store.state.selectedDevice.device_brand}} {{$store.state.selectedDevice.device_name}} enviará imágenes y ubicación cada 1 hr a nuestro servidor, que podrás visualizar desde el menú "Información Recopilada" de la pantalla principal de este panel.</p>
								<p v-else class="body-2 mb-0"><b>Función Desactivada:</b> El dispositivo <span class="text-capitalize">{{$store.state.selectedDevice.device_brand}} {{$store.state.selectedDevice.device_name}}</span> <b>NO</b> está enviando información (ubicación/imágenes) al servidor.</p>
							</v-alert>
							<v-alert
								v-if="$store.state.selectedDevice.device_soversion > 10"
								color="#D0282E"
								dark
								dense
								icon="mdi-alert"
								border="left"
								prominent
								class="custom-alert-info ma-0 mt-2"
							>
								<p class="body-2 mb-0 font-weight-bold">Información Importante Android 11</p>
								<p class="caption mb-0">Debido a las restricciones implementadas en la nueva versión Android 11 (lanzada en septiembre de 2020) no podemos tomar fotografías de forma incógnita (con la aplicación cerrada). Mientras buscamos una solución a esto sólo podremos entregarte la ubicación del dispositivo. Lamentamos los inconvenientes que esto pueda ocasionarte.</p>
								<p class="caption mb-0 font-weight-bold">Por favor ten en cuenta que esta restricción es sólo para dispositivos con Android 11 o superior, en versiones previas esta función trabaja de forma normal.</p>
								<p class="caption px-4 mt-2 mb-0 font-weight-bold white--text text-center"><a class="white--text" href="https://andro4all.com/listas/moviles/moviles-actualizacion-android-11" target="_blank">Conoce aquí los dispositivos y la fecha en la que podrán recibir la actualización a Android 11</a></p>
							</v-alert>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" class="text-center">
							<div v-if="loading">
								<p class="mb-0 caption">{{loadingText}}</p>
								<v-progress-linear color="green" indeterminate></v-progress-linear>
							</div>
							<h4 v-else>Por favor confirma con el botón de abajo para comenzar con el proceso.</h4>
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
						@click="$store.commit('setModalsStates', {lostPhone: false})"
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
						:loading="loading"
						dark
						@click="lmpchange($store.state.selectedDevice)"
						style="width: 200px;"
						class="mx-2"
						:block="$vuetify.breakpoint.mobile"
					>
						<p class="body-2 mb-0">{{deviceStatusConfig ? 'Desactivar Función':'Activar Función'}}</p>
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
    <v-snackbar
      v-model="snackbar.status"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
	</v-dialog>
</template>

<script>
	import * as firebase from 'firebase/app'
	import {lostMyPhoneData, startLostMyPhone, stopLostMyPhone, changeLostMyPhoneStatus} from '../../helpers/api/user'
	
	export default {
		name: 'ModalLostPhone',
		props: ['dialog'],
		data: () => ({
			loading: false,
			loadingText: 'Enviando solicitud a dispositivo',
			devicesData: [],
      snackbar: {
        status: false,
        text: '',
        color: 'success',
        timeout: 4000
      },
			deviceStatusConfig: false,
			timerCount: 0
		}),
		mounted () {
			this.getLostMyPhoneConfig()
		},
		methods: {
			async getLostMyPhoneConfig(){
				const lostMyPhone = await lostMyPhoneData()
				this.devicesData = lostMyPhone.config
				this.deviceStatusConfig = this.deviceStatus(this.$store.state.selectedDevice.id)
			},
			deviceStatus(deviceId){
				// true: Si está activada la función
				let status = false
				this.devicesData.map(function(item){
					if(item.device_id === deviceId && item.lost){
						status = true
					}
				})
				return status
			},
			async lmpchange(device){
				const self = this
				const deviceID = device.device_id
				const text = !this.deviceStatusConfig ? 'activado':'desactivado'
				let path = 'SOSclick/LostMyPhone/' + deviceID
				this.loading = true
				this.loadingText = 'Enviando solicitud a dispositivo. Tiempo máximo de espera ' + (40 - this.timerCount) + ' segundos.'
				const countingTimer = setInterval(function(){
					if(self.timerCount < 40){
						self.timerCount++
						self.loadingText = 'Enviando solicitud a dispositivo. Tiempo máximo de espera ' + (40 - self.timerCount) + ' segundos.'
					}
					else{
						clearInterval(countingTimer)
					}
				}, 1000);
				const timer = setInterval(function(){
						self.snackbar = {
							status: true,
							text: 'No tuvimos respuesta del teléfono, es posible que no se haya ' + text + '. Puedes intentar nuevamente para confirmar.',
							color: 'danger',
							timeout: 6000
						}
						firebase.database(self.$store.state.primaryDB).ref(path).off('child_added')
						firebase.database(self.$store.state.primaryDB).ref(path).remove()
						clearInterval(timer)
						clearInterval(countingTimer)
						self.timerCount = 0
						self.loading = false
						self.loadingText = ''
				}, 40000);
				firebase.database(this.$store.state.primaryDB).ref(path).set({ayThere: true})
				firebase.database(this.$store.state.primaryDB).ref(path).on('child_added',async function(data){
					if(data.key === 'imHere'){
						clearInterval(timer)
						clearInterval(countingTimer)
						self.timerCount = 0
						self.lostPhoneActivated(device)
					}
				})

				if(!this.deviceStatusConfig){
					await startLostMyPhone({device_id: deviceID})
				}
				else{
					await stopLostMyPhone({device_id: deviceID})
				}
			},
			async lostPhoneActivated(device){
				const self = this
				const deviceID = device.device_id
				const text = !this.deviceStatusConfig ? 'activado':'desactivado'
				let path = 'SOSclick/LostMyPhone/' + deviceID

				firebase.database(self.$store.state.primaryDB).ref(path).off('child_added')
				firebase.database(self.$store.state.primaryDB).ref(path).remove()
				self.loadingText = 'Guardando estado en el sistema.'

				await self.changeLMPStatus(device.id, !self.deviceStatusConfig)
				self.getLostMyPhoneConfig()
				let snackbarText = ''
				if(text === 'activado'){
					snackbarText = ' Te dirigiremos a la sección donde podrás visualizar la información.'
					setTimeout(function() {
						self.$router.push({name: 'Information'})
						self.$store.commit('setModalsStates', {lostPhone: false})
					}, 2000);
				}
				self.snackbar = {
					status: true,
					text: 'El teléfono ha respondido, se ha ' + text + ' la función.' + snackbarText,
					color: 'success',
					timeout: 4000
				}
			},
			async changeLMPStatus(deviceID, status){
				await changeLostMyPhoneStatus({device_id: deviceID, lost: status})
				this.loadingText = 'Proceso completado'
				setTimeout(() => {
					this.loading = false
					this.loadingText = ''
				}, 3000);
			}
		}
	}
</script>