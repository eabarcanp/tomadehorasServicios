<template>
	<v-dialog
			v-model="dialog"
			persistent
			:max-width="!$vuetify.breakpoint.mobile ? '600px':'100vw'"
			content-class="custom-dialog"
		>
		<v-card>
			<v-btn
				icon
				color="#707070"
				@click="$store.commit('setModalsStates', {lockDevice: false})"
				style="position: absolute; top: 20px; right: 20px;"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title>
				<v-img
					:src="require('../../assets/imgs/device-lock.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Bloqueo de Pantalla</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" style="color: #707070">
							<h4 class="text-capitalize">Bloqueo {{$store.state.selectedDevice.device_brand}} {{$store.state.selectedDevice.device_name}}</h4>
							<p class="caption">Si permitiste a SOSclick ser Administrador de tu dispositivo esta funcionalidad bloqueará la pantalla de tu teléfono inmediatamente. Si tu teléfono no está protegido por una contraseña/PIN se asignará el PIN de 4 dígitos que ingreses a continuación.</p>
							<v-alert
								color="info"
								dark
								dense
								icon="mdi-information"
								border="left"
								prominent
								class="custom-alert-info mb-0"
							>
								<p class="caption mb-0"><b>Por favor ten en cuenta:</b> El PIN sólo será asignado si tu teléfono no tiene PIN o un patrón de desbloqueo definido. Si ya definiste un modo de desbloqueo en tu teléfono podrás desbloquearlo de la misma forma.</p>
							</v-alert>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" class="text-center">
							<p class="body-2 mb-2" style="color: #707070">PIN DE BLOQUEO</p>
							<PincodeInput v-model="pin"/>
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
						@click="$store.commit('setModalsStates', {lockDevice: false})"
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
						@click="lockPhone($store.state.selectedDevice)"
						style="width: 200px;"
						:disabled="!( pin.length == 4 && /^\d+$/.test(pin) )"
						class="mx-2 custom-button-disabled-sos"
						:block="$vuetify.breakpoint.mobile"
					>
						<p class="body-2 mb-0">Bloquear</p>
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import {lockMyPhone} from '../../helpers/api/user'
	import PincodeInput from 'vue-pincode-input'
	
	export default {
		name: 'ModalLockDevice',
		components: {PincodeInput},
		props: ['dialog'],
		data: () => ({
			pin: '',
			loading: false
		}),
		mounted () {
		},
		methods: {
			async lockPhone(device){
				const deviceID = device.device_id
				this.loading = true
				await lockMyPhone({device_id: deviceID, pin: this.pin})
				this.loading = false
			},
		}
	}
</script>