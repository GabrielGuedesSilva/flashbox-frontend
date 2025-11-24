<template>
  <div class="create-flashcard-form">
    <h2>Criar Flashcard</h2>

    <form @submit.prevent="createFlashcard">
      <div class="form-group">
        <label>Palavra para aprender</label>
        <input v-model="word_to_learn" type="text" required />
      </div>

      <div class="form-group">
        <label>Tradução</label>
        <input v-model="translation" type="text" required />
      </div>

      <div class="form-group">
        <label>Exemplo</label>
        <textarea v-model="example" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label>Selecionar Pilha</label>
        <select v-model="selectedStackId" required>
          <option disabled value="">-- escolha uma pilha --</option>
          <option v-for="s in stacks" :key="s.id" :value="s.id">
            {{ s.title }}
          </option>
          <option value="__create_new">➕ Criar nova pilha...</option>
        </select>
      </div>

      <div v-if="selectedStackId === '__create_new'" class="new-stack-area">
        <CreateFlashcardStackForm
          @created="onStackCreated"
          @cancel="onCreateStackCancel"
        />
      </div>

      <div class="actions">
        <button type="submit" :disabled="loading">
          {{ loading ? "Enviando..." : "Criar Flashcard" }}
        </button>
        <button type="button" @click="$emit('cancel')">Fechar</button>
      </div>

      <p class="success" v-if="success">{{ success }}</p>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { apiFetch } from "@/services/api.js";
import CreateFlashcardStackForm from "@/components/forms/CreateFlashcardStackForm.vue";

export default {
  name: "CreateFlashcardForm",
  components: { CreateFlashcardStackForm },
  props: {
    initialStackId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      word_to_learn: "",
      translation: "",
      example: "",
      stacks: [],
      selectedStackId: this.initialStackId || "",
      loading: false,
      success: "",
      error: ""
    };
  },
  async mounted() {
    await this.loadStacks();
    if (this.initialStackId) {
      const found = this.stacks.find(s => s.id === this.initialStackId);
      if (found) this.selectedStackId = this.initialStackId;
    }
  },
  methods: {
    async loadStacks() {
      this.error = "";
      try {
        const data = await apiFetch("/flashcard_stacks");
        this.stacks = Array.isArray(data) ? data : [];
      } catch (err) {
        console.error("Erro ao carregar pilhas:", err);
        this.error = "Não foi possível carregar as pilhas";
      }
    },

    onStackCreated(newStack) {
      this.stacks.push(newStack);
      this.selectedStackId = newStack.id;
    },

    onCreateStackCancel() {
      this.selectedStackId = "";
    },

    async createFlashcard() {
      this.success = "";
      this.error = "";

      if (!this.selectedStackId || this.selectedStackId === "__create_new") {
        this.error = "Selecione uma pilha ou crie uma nova.";
        return;
      }

      this.loading = true;
		try {
		const newFlashcard = await apiFetch("/flashcards", {
			method: "POST",
			body: JSON.stringify({
			word_to_learn: this.word_to_learn,
			translation: this.translation,
			example: this.example,
			flashcard_stack_id: this.selectedStackId
			})
		});

		this.success = "Flashcard criado com sucesso!";
		this.$emit("created", newFlashcard);
		
		} catch (err) {
		this.error = "Falha ao criar flashcard.";
		}
	}
  }
};
</script>

<style scoped>
.form-group { margin-bottom: 10px; display:flex; flex-direction:column; }
.actions { display:flex; gap:8px; margin-top:10px; }
.success { color: green; margin-top:8px; }
.error { color: red; margin-top:8px; }
.new-stack-area { margin: 12px 0; padding: 10px; border: 1px dashed #ccc; border-radius:6px; }
</style>
