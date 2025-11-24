<template>
		<h1>PERFIL</h1>

		<div>
			<h2>Olá, {{ user.username }}</h2>
			<p>Email: {{ user.email }}</p>
		</div>
</template>
<script>
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore.js";

export default {
	name: "ProfileView",
	setup() {
		const userStore = useUserStore();

		const user = computed(() => userStore.user);

		return { user };
	}
}
</script>