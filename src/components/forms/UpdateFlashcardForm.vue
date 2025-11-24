<template>
<div>
	<h2>Criar Flashcard</h2>

	<form @submit.prevent="updateFlashcard">
		<div>
			<label>Palavra para aprender</label>
			<input v-model="word_to_learn" type="text" required />
		</div>

		<div>
			<label>Tradução</label>
			<input v-model="translation" type="text" required />
		</div>

		<div>
			<label>Exemplo</label>
			<textarea v-model="example" rows="3"></textarea>
		</div>

		<div>
			<label>Selecionar Pilha de Flashcard</label>
			<select v-model="selectedFlashcardStackId" required>
				<option disabled value="">Escolha uma pilha</option>
				<option v-for="flashcard_stack in flashcards_stacks" :key="flashcard_stack.id" :value="flashcard_stack.id">
					{{ flashcard_stack.title }}
				</option>
				<option value="create_new_flashcard_stack">Criar nova pilha...</option>
			</select>
		</div>

		<div v-if="selectedFlashcardStackId === 'create_new_flashcard_stack'">
			<CreateFlashcardStackForm
				@created="onFlashcardStackCreated"
				@cancel="onCreateFlashcardStackCancel"
			/>
		</div>

		<div>
			<button type="submit">
				Editar Flashcard
			</button>
			<button type="button" @click="$emit('cancel')">Fechar</button>
		</div>
	</form>
</div>
</template>

<script>
import { apiFetch } from "@/services/api.js";
import CreateFlashcardStackForm from "@/components/forms/CreateFlashcardStackForm.vue";

export default {
  name: "UpdateFlashcardForm",
  components: { CreateFlashcardStackForm },
  props: {
    flashcard: {
        type: Object,
        required: true
    }
},
  data() {
    return {
      word_to_learn: "",
      translation: "",
      example: "",
      flashcards_stacks: [],
      selectedFlashcardStackId: "",
    };
  },
  methods: {
    async loadFlashcardStacks() {
        const data = await apiFetch("/flashcard_stacks");
		if (data) {
			this.flashcards_stacks = data
		}
    },
    async onFlashcardStackCreated(newFlashcardStack) {
		await this.loadFlashcardStacks();
		this.selectedFlashcardStackId = newFlashcardStack.id;
    },
    onCreateFlashcardStackCancel() {
		this.selectedFlashcardStackId = "";
    },

    async updateFlashcard() {
		const updateFlashcard = await apiFetch(`/flashcards/${this.flashcard.id}`, {
			method: "PATCH",
			body: JSON.stringify({
			word_to_learn: this.word_to_learn,
			translation: this.translation,
			example: this.example,
			flashcard_stack_id: this.selectedFlashcardStackId
			})
		});

		this.$emit("update", updateFlashcard);
	}
	},
	async mounted() {
		await this.loadFlashcardStacks();
	},
};
</script>
