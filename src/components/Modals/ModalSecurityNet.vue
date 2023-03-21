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
				<v-img
					:src="require('../../assets/imgs/security-net.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Red de Seguridad</span>
			</v-card-title>
			<v-card-text class="py-0">
				<v-container style="min-height: 200px;">
					<v-row>
						<v-col cols="12" style="color: #707070">
							<v-tabs
								v-model="tab"
								fixed-tabs
								centered
								color="#D0282E"
								icons-and-text
								height="40px"
							>
								<v-tab href="#tab-1">
									Mi red de Seguridad
								</v-tab>
								<v-tab href="#tab-2">
									Redes a la que pertenezco
								</v-tab>
							</v-tabs>

							<v-tabs-items v-model="tab">
								<v-tab-item value="tab-1">
									<v-card flat>
										<v-card-text>
											<v-data-table
												dense
												locale="es-ES"
												:loading="loading"
												loading-text="Cargando Datos"
												:headers="headers"
												:items="miRed"
												:item-class="getItemsClass"
												class="custom-table-atencion"
												:hide-default-footer="true"
											>
												<template v-slot:item.name="{ item }">
													{{ item.personas[0].name }}
												</template>
												<template v-slot:item.telefono="{ item }">
													{{ item.personas[0].info.telefono }}
												</template>
												<template v-slot:item.email="{ item }">
													{{ item.personas[0].email }}
												</template>
											</v-data-table>		
											<v-row class="mt-4">
												<v-col class="py-0" cols="12">
													<v-form ref="form">
														<v-row>
															<v-col class="py-0" cols="12">
																<p class="caption mb-2">Agrega un usuario a tu red</p>
															</v-col>
															<v-col class="py-0" cols="12" sm="4">
																<v-text-field
																	v-model="addToSecurityData.name"
																	:rules="[rules.required]"
																	label="Nombre"
																	placeholder="Nombre"
																	validate-on-blur
																	outlined
																	dense
																></v-text-field>
															</v-col>
															<v-col class="py-0" cols="12" sm="4">
																<v-text-field
																	v-model="addToSecurityData.phone"
																	:rules="[rules.required, rules.phone]"
																	counter="11"
																	type="number"
																	label="Teléfono"
																	placeholder="Teléfono"
																	validate-on-blur
																	outlined
																	dense
																></v-text-field>
															</v-col>
															<v-col class="py-0" cols="12" sm="4">
																<v-text-field
																	v-model="addToSecurityData.invitado"
																	:rules="[rules.required, rules.email]"
																	label="Email"
																	placeholder="Email"
																	validate-on-blur
																	outlined
																	dense
																></v-text-field>
															</v-col>
														</v-row>
													</v-form>
												</v-col>
												<v-col class="py-0" cols="12">
													<div class="d-flex justify-end align-center" style="width: 100%;">
														<v-btn
															color="#D0282E"
															depressed
															rounded
															:loading="loading"
															dark
															@click="addToSecurity()"
															style="width: 200px;"
															class="mx-2"
															:block="$vuetify.breakpoint.mobile"
														>
															<p class="body-2 mb-0">Agregar</p>
														</v-btn>
													</div>
												</v-col>
											</v-row>									
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item value="tab-2">
									<v-card flat>
										<v-card-text>
											<v-data-table
												dense
												locale="es-ES"
												:loading="loading"
												loading-text="Cargando Datos"
												:headers="headers"
												:items="externaRed"
												:item-class="getItemsClass"
												class="custom-table-atencion"
												:hide-default-footer="true"
											>
												<template v-slot:item.name="{ item }">
													{{ item.anfitrion[0].name }}
												</template>
												<template v-slot:item.telefono="{ item }">
													{{ item.anfitrion[0].info.telefono }}
												</template>
												<template v-slot:item.email="{ item }">
													{{ item.anfitrion[0].email }}
												</template>
											</v-data-table>											
										</v-card-text>
									</v-card>
								</v-tab-item>
							</v-tabs-items>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
  import { mapGetters } from "vuex"
	import {lockMyPhone, getSecurityNet, getSecurityExternal, sendInvitation} from '../../helpers/api/user'
	
	export default {
		name: 'ModalSecurityNet',
		props: ['dialog'],
		data: () => ({
			tab: null,
			loading: false,
			headers: [
				{ text: 'Nombre', value: 'name', align: 'center', sortable: false  },
				{ text: 'Teléfono', value: 'telefono', align: 'center', sortable: false  },
				{ text: 'Email', value: 'email', align: 'center', sortable: false  }
			],
			miRed: [],
			externaRed: [],
			addToSecurityData: {
				name: null,
				phone: null,
				invitado: null
			},
      rules: {
        required: value => !!value || 'Requerido',
        phone: value => value && value.length === 11 || 'Debe tener 11 dígtos. Ej (56912345678)',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email no es válido'
        },
      }
		}),
    computed: {
      ...mapGetters(["userData"])
    },
		watch:{
			userData: function(data){
				if(data){
					this.getRed()
				}
			}
		},
		mounted () {
		},
		methods: {
			closeModal(){
				this.$store.commit('setModalsStates', {securityNet: false})
			},
			getItemsClass(){
				return 'custom-items-table'
			},
			async getRed(){
				const security = await getSecurityNet()
				this.miRed = security.data
				const ext = await getSecurityExternal()
				this.externaRed = ext.data
			},
			async lockPhone(device){
				const deviceID = device.device_id
				this.loading = true
				await lockMyPhone({device_id: deviceID, pin: this.pin})
				this.loading = false
			},
			async addToSecurity(){
				const valid = this.$refs.form.validate()
				if(valid){
					await sendInvitation(this.addToSecurityData)
					this.getRed()
					this.addToSecurityData = {
						name: null,
						phone: null,
						invitado: null
					}
				}
			}
		}
	}
</script>