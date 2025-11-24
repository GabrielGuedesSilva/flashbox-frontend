<template>
		<h1>Criar Conta</h1>
    <form @submit.prevent="createAccount">

			<div>
				<label>Username</label>
				<input v-model="username" required/>
			</div>


			<div>
				<label>Email</label>
				<input v-model="email" type="email" required/>
			</div>

			<div>
				<label>Senha</label>
				<input v-model="password" type="password" required/>
			</div>

			<button type="submit">Criar conta</button>
		</form>
</template>

<script>
import { apiFetch } from "@/services/api.js";

export default {
	name: 'CreateUserForm',
	data() {
		return {
			username: "",
			email: "",
			password: ""
		}
	},
	methods: {
		async createAccount() {
			await apiFetch("/users/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: this.username,
				email: this.email,
				password: this.password
			})
			});

			this.$router.push("/login");
		}
	}
}
</script>