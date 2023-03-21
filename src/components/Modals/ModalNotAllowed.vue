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
				@click="$store.commit('setModalsStates', {notAllowed: false})"
				style="position: absolute; top: 20px; right: 20px;"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" style="color: #707070" class="text-center justify-center">
							<v-img
								:src="require('../../assets/imgs/unicorn.svg')"
								width="200"
								height="200"
								max-width="200"
								max-height="200"
								class="mx-auto mb-6"
							></v-img>
							<h3 class="headline">No sabemos como has llegado hasta aquí</h3>
							<p class="mb-0">Bueno ... Si sabemos, pero el unicornio aún no lo sabe.</p>
							<p class="font-weight-bold my-4">Lamentamos comentarte que estas funciones sólo pueden activarse en teléfonos Android.</p>
							<p class="caption my-4">Mirá como te sigue mirando el unicornio, se pregunta por qué estás utilizando tus habilidades informáticas para el mal.</p>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
	
	export default {
		name: 'ModalNotAllowed',
		props: ['dialog'],
		data: () => ({
		}),
		mounted () {
		},
		methods: {
		}
	}
</script>