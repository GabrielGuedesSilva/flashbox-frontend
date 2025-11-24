<template>
  <div class="create-stack-form">
    <h3>Criar nova pilha</h3>

    <form @submit.prevent="createStack">
      <div class="form-group">
        <label>Título da pilha</label>
        <input v-model="title" type="text" required />
      </div>

      <div class="form-group">
        <label>Linguagem de Aprendizado</label>
        <input v-model="learning_language" type="text" />
      </div>

      <div class="form-group">
        <label>Linguagem Dominante</label>
        <input v-model="main_language" type="text" />
      </div>

      <div class="actions">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Criando...' : 'Criar Pilha' }}
        </button>
        <button type="button" @click="$emit('cancel')">Cancelar</button>
      </div>

      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { apiFetch } from "@/services/api.js";

export default {
  name: "CreateFlashcardStackForm",
  data() {
    return {
      title: "",
      learning_language: "",
      main_language: "",
      loading: false,
      error: ""
    };
  },
  methods: {
    async createStack() {
      this.error = "";

      if (!this.title.trim()) {
        this.error = "O título é obrigatório";
        return;
      }

      this.loading = true;

      try {
        const newStack = await apiFetch("/flashcard_stacks", {
          method: "POST",
          body: JSON.stringify({
            title: this.title,
            learning_language: this.learning_language,
            main_language: this.main_language
          })
        });

        this.$emit("created", newStack);

        this.title = "";
        this.learning_language = "";
		this.main_language = "";

      } catch (err) {
        console.error(err);
        this.error = "Erro ao criar pilha";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
.form-group { margin-bottom: 8px; display:flex; flex-direction: column; }
.actions { display:flex; gap:8px; margin-top:10px; }
.error { color: red; margin-top:8px; }
</style>
