<template>
	<header class="header">
		<router-link to="/">Flashbox</router-link>
		<nav class="nav-bar">
				<router-link to="/flashcard_stacks">Flashcards</router-link> |
				<router-link to="/exercícios">Exercícios</router-link> |
				<router-link to="/perfil">Perfil</router-link>
		</nav>
		<button @click="logout">Sair</button>
	</header>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";

export default {
	name: 'HeaderPage',
	methods: {
		logout() {
			const userStore = useUserStore();
			userStore.logout();

			this.$router.push("/login");
		}
}
}
</script>