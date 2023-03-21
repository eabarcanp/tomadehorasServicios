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
				@click="closeModal()"
				style="position: absolute; top: 20px; right: 20px;"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title>
				<!-- <v-img
					:src="require('../../assets/imgs/plans.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img> -->
				<span class="headline" style="color: #707070;">
					{{$store.state.modalsStates.paymentStatus.data.status === 2 ? 'Pago realizado':'Error en el pago'}}
				</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" style="color: #707070" class="text-center">
							 
									<v-icon 
									:color="
									$store.state.modalsStates.paymentStatus.data.status === 2 ? 'green':'red'
									" size="50">
									{{$store.state.modalsStates.paymentStatus.data.status === 2 ? 'mdi-check':'mdi-close'}}
									</v-icon>


							<h3 class="headline">
								{{$store.state.modalsStates.paymentStatus.data.status === 2 ? 'El pago ha sido procesado correctamente':'Hubo un error en el pago'}}
							</h3>
							<h4 class="mb-3">
								ID de Pago: {{$store.state.modalsStates.paymentStatus.data.flowOrder}}
							</h4>
							<div v-if="$store.state.modalsStates.paymentStatus.data.status === 2">
								<p class="body-1 mb-0"><b>Monto:</b> {{toPrice($store.state.modalsStates.paymentStatus.data.amount)}}</p>
								<p class="body-1 mb-0"><b>Forma Pago:</b> {{$store.state.modalsStates.paymentStatus.data.forma}}</p>
								<p class="body-1 mb-0"><b>Fecha Pago:</b> {{$store.state.modalsStates.paymentStatus.data.fecha}}</p>
							</div>
							<div v-else>
								<p class="body-1 mb-0">No se ha podido procesar el pago correctamente</p>
								<p class="body-2 mb-0">No se han realizado cargos a tu cuenta</p>
								<p class="body-1 mb-0 mt-3 font-weight-bold">Por favor intenta nuevamente</p>
							</div>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<div class="d-flex justify-center align-center mb-3" style="width: 100%;">
					<v-btn
						color="#ffffff"
						text
						rounded
						outlined
						@click="$store.commit('setModalsStates', { paymentStatus: {open: false, data: null} })"
						style="width: 200px; background-color: #5a90f5;"
						class="mx-2"
						:block="$vuetify.breakpoint.mobile"
					>
						<p class="body-2 mb-0" >Aceptar</p>
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	
	export default {
		name: 'ModalPaymentStatus',
		props: ['dialog'],
		data: () => ({
		}),
		mounted () {
		},
		methods: {
			toPrice(price){
				var formatter = new Intl.NumberFormat('es-ES', {
					style: 'currency',
					currency: 'CLP',
					currencyDisplay: 'symbol'
				});
				return formatter.format(price)
			},
		}
	}
</script>