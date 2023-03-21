import Vue from 'vue'
import VueRouter from 'vue-router'
import Horas from "@/components/Horas";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Horas',
		component: Horas
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "about" */ '../components/Login/index.vue')
	},
	{
		path: '/categorias',
		name: 'Especialidades',
		component: () => import(/* webpackChunkName: "about" */ '../components/Especialidades/index.vue'),
	},
	{
		path: '/categoria',
		name: 'Medicos',
		component: () => import(/* webpackChunkName: "about" */ '../components/Medicos/index.vue'),
	},
	{
		path: '/horarios/:id',
		name: 'Horarios',
		component: () => import(/* webpackChunkName: "about" */ '../components/Horarios/index.vue'),
	},
	{
		path: '/agenda/:id',
		name: 'Agenda',
		component: () => import(/* webpackChunkName: "about" */ '../components/Agenda/index.vue'),
	},
	{
		path: '/ficha/:id',
		name: 'Ficha',
		component: () => import(/* webpackChunkName: "about" */ '../components/Ficha/index.vue'),
	},
	{
		path: '/usuarios',
		name: 'Usuarios',
		component: () => import(/* webpackChunkName: "about" */ '../components/Usuarios/index.vue'),
	},
	{
		path: '/cita',
		name: 'Cita',
		component: () => import(/* webpackChunkName: "about" */ '../components/Cita/index.vue'),
	},
	{
		path: '/cita/:id',
		name: 'CitaID',
		component: () => import(/* webpackChunkName: "about" */ '../components/Cita/Cita.vue'),
	},
	{
		path: '/configuracion',
		name: 'Configuracion',
		component: () => import(/* webpackChunkName: "about" */ '../components/Configuracion/index.vue'),
	},
	{
		path: '/atenciones/:id',
		name: 'Atenciones',
		component: () => import(/* webpackChunkName: "about" */ '../components/Atenciones/index.vue'),
	},
	{
		path: '/reserva',
		name: 'Reserva',
		component: () => import(/* webpackChunkName: "about" */ '../components/Horas/Reserva.vue'),
	},
	{
		path: '/PanelSocketVideo',
		name: 'NuevoSocketVideo',
		component: () => import(/* webpackChunkName: "about" */ '../components/SocketVideo/NuevoSocketVideo.vue'),
	},
	{
		path: '/:id',
		name: 'Redirect',
		component: () => import(/* webpackChunkName: "about" */ '../components/Redirect/Redirect.vue'),
	},

//	404 redirect to home
	{
		path: '*',
		redirect: '/horas'
	}
]

const router = new VueRouter({
	mode: 'hash',
	scrollBehavior: () => ({y: 0}),
	routes
})

export default router
