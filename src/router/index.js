 
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import dashPage from "../views/dashboard.vue";
import share from "../views/share.vue";

const routes = [
	{
		path: "/",
		name: "dashPage",
		component: dashPage,
	 
	},
	{
		path: "/operators",
		name: "home",
		component: HomeView,
	},
	 

	 
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
