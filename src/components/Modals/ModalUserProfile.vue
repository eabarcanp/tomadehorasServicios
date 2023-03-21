<template>
	<v-dialog
			v-model="dialog"
			max-width="600px"
			scrollable
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
					:src="require('../../assets/imgs/profile-edit.svg')"
					width="70"
					height="70"
					max-width="70"
					max-height="70"
				></v-img>
				<span class="headline" style="color: #707070;">Perfil</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" style="color: #707070" class="justify-center text-center">
							<div id="pick-avatar" style="position: relative;margin: auto; max-width: 100px;">
								<v-avatar
									size="90">
									<v-img
										v-if="this.$store.state.userData && this.$store.state.userData.info && this.$store.state.userData.info.avatar"
										:src="$store.state.userData.info.avatar"
										width="90"
										height="90"
									>
										<template v-slot:placeholder>
											<v-row
												class="fill-height ma-0"
												align="center"
												justify="center"
											>
												<v-progress-circular
													indeterminate
													color="grey lighten-5"
												></v-progress-circular>
											</v-row>
										</template>
									</v-img>
									<span
										v-else
										style="width: 70px; height: 70px;line-height: 70px;"
										class="rounded-circle background-sosclick white--text headline">
										{{this.$store.state.userData ? this.$store.state.userData.name.match(/\b(\w)/g).join(''):''}}
									</span>
								</v-avatar>
								<v-btn
									style="position: absolute; bottom: 0; right: 0;"
									fab
									small
									dark
									color="#D0282E"
								>
									<v-icon dark>mdi-camera</v-icon>
								</v-btn>
							</div>
							<avatar-cropper output-mime="image/jpeg" :upload-handler="imageReady" :labels="{ submit: 'Aceptar', cancel: 'Cancelar'}" trigger="#pick-avatar"/>
						</v-col>
						<v-col cols="12" style="color: #707070">
							<v-form ref="form" v-if="userForm" :class="$vuetify.breakpoint.mobile ? 'px-0':'px-5'">
								<v-text-field
									v-model="userForm.name"
									:rules="[rules.required]"
									label="Nombre y apellido"
									placeholder="Nombre y apellido"
									validate-on-blur
									dense
									class="mb-2"
								></v-text-field>
								<v-text-field
									v-model="userForm.rut"
									:rules="[rules.required]"
									label="Rut/DNI"
									placeholder="Rut/DNI"
									validate-on-blur
									dense
									class="mb-2"
								></v-text-field>
								<v-text-field
									v-model="userForm.email"
									:rules="[rules.required, rules.email]"
									label="Email"
									placeholder="Email"
									validate-on-blur
									dense
									class="mb-2"
								></v-text-field>
								<v-text-field
									v-model="userForm.telefono"
									:rules="[rules.required, rules.phone]"
									label="Teléfono"
									placeholder="Teléfono"
									validate-on-blur
									dense
									class="mb-2"
								></v-text-field>
								<v-select
									v-model="userForm.pais"
									:items="paises"
									:rules="[rules.required]"
									label="País"
									item-text="name"
									item-value="id"
									dense
									class="mb-2"
									@change="changePais"
								></v-select>
								<v-select
									v-model="userForm.region"
									:items="regiones"
									:rules="[rules.required]"
									label="Región"
									item-text="region"
									item-value="id"
									dense
									class="mb-2"
									@change="changeRegion"
								></v-select>
								<v-select
									v-if="comunas.length > 0"
									v-model="userForm.comuna"
									:rules="[rules.required]"
									:items="comunas"
									label="Comuna"
									item-text="comuna"
									item-value="id"
									dense
									class="mb-2"
								></v-select>
								<v-text-field
									v-model="userForm.direccion"
									:rules="[rules.required]"
									label="Dirección"
									placeholder="Dirección"
									validate-on-blur
									dense
									class="mb-2"
								></v-text-field>
								<v-select
									v-model="userForm.genero"
									:items="items"
									:rules="[rules.required]"
									label="Género (Sexo)"
									dense
									class="mb-2"
								></v-select>
								<v-menu
									ref="menu"
									v-model="menu"
									:close-on-content-click="true"
									transition="scale-transition"
									offset-y
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="userForm.nacimiento"
											:rules="[rules.required]"
											label="Fecha Nacimiento"
											readonly
											v-bind="attrs"
											prepend-inner-icon="mdi-calendar"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker
										ref="picker"
										locale="es-ES"
										v-model="userForm.nacimiento"
										:max="new Date().toISOString().substr(0, 10)"
										min="1950-01-01"
                  @change="(date) => $refs.menu.save(date)"
									></v-date-picker>
								</v-menu>
							</v-form>
							<div style="position: relative;">
								<v-alert
									v-show="message.show"
									dense
									text
									:type="message.type"
									class="mb-0"
									style="position: absolute; width: 100%;"
								>
									{{message.message}}
								</v-alert>
							</div>
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
						@click="closeModal()"
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
						@click="updateUserInfo"
						style="width: 200px;"
						class="mx-2 custom-button-disabled-sos"
						:block="$vuetify.breakpoint.mobile"
					>
						<p class="body-2 mb-0">Guardar Cambios</p>
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapGetters } from "vuex"
	import AvatarCropper from "vue-avatar-cropper"
	import {paisesActivos, regionesActivas, comunasActivas, getUser, updateUserAvatar, updateUserInfo} from '../../helpers/api/user'
	// import { validate, clean, format } from 'rut.js'

	import { format, clean } from 'rut.js'
	
	export default {
		name: 'ModalUserProfile',
		components: { AvatarCropper },
		props: ['dialog'],
		data: () => ({
			menu: false,
			message: {
				show: false,
				type: 'success',
				message: ''
			},
			rules: {
				required: value => !!value || 'Requerido',
				phone: value => value && value.length === 11 || 'Debe tener 11 dígtos. Ej (56912345678)',
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					return pattern.test(value) || 'Email no es válido'
				},
			},
			pin: '',
			loading: false,
			userForm: null,
			paises: [],
			regiones: [],
			comunas: [],
			items: [{text: 'Femenino', value: 2}, {text: 'Masculino', value: 1}],
		}),
		computed: {
			...mapGetters(["userData"])
		},
		watch:{
			userData: function(data){
				if(data && !this.user){
					this.userForm = {
						name: data.name,
						email: data.email,
						direccion: data.info.direccion,
						telefono: data.info.telefono,
						rut: data.info.rut ? format(data.info.rut) : null,
						pais: data.info.pais,
						region: data.info.region,
						comuna: data.info.comuna,
						genero: data.info.genero,
						nacimiento: data.info.nacimiento
					}
					this.getRegion(this.userForm.pais)
				}
			}
		},
		mounted () {
			this.getPaises()
		},
		methods: {
			async imageReady(value){
				const base64 = value.getCroppedCanvas().toDataURL()
				const base64Cropped = base64.split(",").[1]
				await updateUserAvatar( {avatar: base64Cropped} )
				getUser()
			},
			updateAvatar(){

			},
			closeModal(){
				this.$store.commit('setModalsStates', {editProfile: false})
			},
			changePais(value){
				this.userForm = Object.assign({}, this.userForm, {region: null, comuna: null})
				this.getRegion(value)
			},
			changeRegion(value){
				this.userForm = Object.assign({}, this.userForm, {comuna: null})
				this.getComunas(value)				
			},
			async updateUserInfo(){
				const valid = this.$refs.form.validate()
				if(valid){
					let data = Object.assign({}, this.userForm)
					data.rut = clean(data.rut)
					const update = await updateUserInfo(data)
					if(update && update.code === 200){
						this.message = {
							show: true,
							type: 'success',
							message: 'Datos actualizados correctamente'
						}
						getUser()
					}
					else{
						this.message = {
							show: true,
							type: 'error',
							message: 'Ha ocurrido un error al intentar actualizar los datos. Por favor intenta nuevamente.'
						}
					}
					setTimeout(() => {
						this.message = {
							show: false,
							type: 'success',
							message: ''
						}
					}, 4000);
				}
			},
			async getPaises(){
				const paises = await paisesActivos()
				this.paises = paises.paises
			},
			async getRegion(pais_id){
				const regiones = await regionesActivas({pais_id})
				this.regiones = regiones.regiones
				if(this.userForm && this.userForm.region){ this.getComunas(this.userForm.region) }
				else{ this.comunas = [] }
			},
			async getComunas(region_id){
				const comunas = await comunasActivas({region_id})
				this.comunas = comunas.comunas
			}
		}
	}
</script>