<template>
	<v-expansion-panels accordion dark>
		<v-expansion-panel v-for="(faq, index) in faqs" :key="index">
			<v-expansion-panel-header color="#2250b3">
				<p class="mb-0 font-weight-bold white--text">
					{{faq.question}}
				</p>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
					<p class="mt-3 mb-0">{{faq.answer}}</p>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
export default {
	computed: {
		faqs() {
			return this.$store.state.Company.companyServices.cati_faq
		}
	},
  data() {
    return {
			faqsa: [
				{
					question: '¿Que horario de trabajo tengo?',
					answer: 'No tienes horario de trabajo, pero recuerda, si no trabajas, no ganas…'
				},
				{
					question: '¿Tengo sueldo base?',
					answer: 'No, solo ganas si vendes ya que se paga por comisión'
				},
				{
					question: '¿Cuento con material de apoyo para vender?',
					answer: 'Si, hay muchos vídeos que puedes utilizar como apoyo de venta a un cliente.'
				},
				{
					question: '¿Si un cliente tiene una duda y no tengo respuesta, puedo acudir a un supervisor?',
					answer: 'Si, el supervisor te enviará un whatsapp con un link para que te reunas con el via videollamada.'
				},
				{
					question: '¿Cuando es la fecha de pago de mis comisiones?',
					answer: 'Tu cuentas con una billetera abierta, es decir, cuando tengas comisiones, eres tú quien decide, como y cuando hacer los retiros.'
				},
				{
					question: '¿Que pasa si me enfermo y no puedo trabajar?',
					answer: 'No hay problema, tu ves despúes como recuperas ese tiempo perdido, igual si te tomas vacaciones.'
				},
				{
					question: '¿Si no cierro la venta al primer contacto, puedo contactarme con el cliente, fuera de la plataforma?',
					answer: 'Si, por supuesto, para eso le debes pedir siempre sus datos cuando comienza tu entrevista.'
				},
				{
					question: '¿Necesito un mínimo de ventas al mes para cobrar comisión?',
					answer: 'No.'
				},
				{
					question: '¿Cuando empiezo?',
					answer: 'Si tienes disponibilidad inmediata, una vez apruebes el exámen puedes comenzar.'
				},
				{
					question: '¿Tendré una capacitación antes de partir?',
					answer: 'Te enviaré el material de capacitación, luego rendiras un examen y si apruebas estás listo para comenzar, si no, te daremos una segunda oportunidad con una clase personalizada para aclarar todas tus dudas y rendiras nuevamente el examen. Solo dos oportunidades.'
				},
				{
					question: '¿La comisión que pagan es buena?',
					answer: 'No es buena, es buenísima, claro que como en todo tiene que ver con cada persona, si te conformas con poco, puede que hagas solo algunas ventas y te relajes, pero si de verdad quieres ganar dinero y aprovechar esta oportunidad puedes ganar mucho dinero aquí. Pero si estás interesado te enviaré el detalle de comisiones para que las analices.'
				},
				{
					question: '¿Cuanto tiempo lleva operando la empresa en chile?',
					answer: '17 años'
				},
				{
					question: '¿Existe hoy competencia para nuestro producto en chile? Cual o cuales?',
					answer: 'Existen  productos similares, pero no tan completos como el nuestro, en todo caso, todo esto lo aprenderás en la capacitación del producto.'
				},
				{
					question: '¿El sistema se esta utilizando en otro proyecto?. Se tiene una referencia que señalar en chile? Hay experiencia de compra que comentar?',
					answer: 'Esto es un lanzamiento promocional'
				},
				{
					question: '¿Si el cliente quiere comprar?. ¿Cuanto demora la instalacion del sistema para que quede totalmente operativa?',
					answer: 'X días, pero tranquilo, todo esto lo aprenderas en la capacitación sobre el producto.'
				},
				{
					question: '¿Se necesita un periodo de prueba el sistema?',
					answer: '**el formato básico del sistema, puede ser probado durante un mes y esta prueba es gratuita'
				},
				{
					question: '¿Cual es la principal ventaja comparativa de nuestro sistema en relacion a otros similares en el mercado? Producto/servicio/solución',
					answer: 'En la capacitación aprenderas todas las ventajas comparativas que tenemos frente a otros sistemas similares que existen hoy en el mercado.'
				},
				{
					question: '¿Como se contractualiza una venta con el cliente?',
					answer: 'Como la venta de cualquier venta online, usted cancela el producto, descarga el contrato desde nuestra web, imprime y firma el contrato y luego envia una imagen clara del contrato firmada junto a su rut por ambos lados al correo contacto@sosclick.Cl y la entrega será posterior a ese trámite en su domicilio a través de algún delivery, luego si el cliente no logra instalar la camará con los tutoriales que se encuentran en linea, lo contactaremos para darle un apoyo remoto por parte de un supervisor para instalar el equipo y hacerlo funcionar.'
				},
				{
					question: '¿Existe un plan de oferta para esta primera etapa? ¿O si el cliente quisiera comprar mas de uno?',
					answer: 'Esta es una campaña de promoción por lo cual el sistema ya se encuentra con descuento.'
				},
			]
    }
  },
	methods: {
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