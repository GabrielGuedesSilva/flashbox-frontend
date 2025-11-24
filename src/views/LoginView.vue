<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Entrar</button>

      <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
    </form>

		<router-link to="/users">
			<p>Criar Conta</p>
		</router-link>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore.js";
import { apiFetch } from "@/services/api.js";

export default {
  name: 'LoginView',
  data() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    }
  },
  methods: {
    async login() {
        const response = await apiFetch("/auth/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        localStorage.setItem("token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

		const userStore = useUserStore();
		userStore.setUser(response.user);

        this.$router.push("/");
    }
  }
}
</script>

