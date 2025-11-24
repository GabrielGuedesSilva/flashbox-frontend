
<template>
<div >
	<h3>Editar Pilha de FLashcard</h3>

	<form @submit.prevent="updateFlashcardStack">
		<div>
			<label>Título da pilha</label>
			<input v-model="title" type="text" required />
		</div>

		<div>
			<label>Linguagem de Aprendizado</label>
			<input v-model="learning_language" type="text" />
		</div>

		<div>
			<label>Linguagem Dominante</label>
			<input v-model="main_language" type="text" />
		</div>

		<div>
			<button type="submit">
				Editar Pilha
			</button>
			<button type="button" @click="$emit('cancel')">Cancelar</button>
		</div>
	</form>
</div>
</template>

<script>
import { apiFetch } from "@/services/api.js";

export default {
name: "UpdateFlashcardStackForm",
data() {
    return {
	title: "",
	learning_language: "",
	main_language: "",
    };
},
props: {
    flashcard_stack: {
        type: Object,
        required: true
    }
},
mounted() {
this.title = this.flashcard_stack.title;
this.learning_language = this.flashcard_stack.learning_language;
this.main_language = this.flashcard_stack.main_language;
},
methods: {
    async updateFlashcardStack() {
			const payload = {};

			if (this.title !== this.flashcard_stack.title) {
				payload.title = this.title;
			}
			if (this.learning_language !== this.flashcard_stack.learning_language) {
				payload.learning_language = this.learning_language;
			}
			if (this.main_language !== this.flashcard_stack.main_language) {
				payload.main_language = this.main_language;
			}

			const updateFlashcardStack = await apiFetch(`/flashcard_stacks/${this.flashcard_stack.id}`, {
			method: "PATCH",
			body: JSON.stringify(payload)
        });

		this.$emit("update", updateFlashcardStack);

        this.title = "";
        this.learning_language = "";
		this.main_language = "";
    }
}
};
</script>