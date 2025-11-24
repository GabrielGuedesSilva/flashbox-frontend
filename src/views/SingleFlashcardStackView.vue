<template>
    <h1 v-if="flashcard_stack"> {{ flashcard_stack.title }}</h1>

		<div v-if="flashcard_stack">
			<button @click="openModal">Adicionar Novo Flashcard</button>
			<ModalTemplate :show="modalVisible" @close="closeModal">
				<CreateFlashcardForm
					@created="onFlashcardCreated"
					@cancel="closeModal"
				/>
			</ModalTemplate>
				<FlashcardBox
					v-for="flashcard in flashcard_stack.flashcards"
					:key="flashcard.id"
					:flashcard="flashcard"
					@update="onFlashcardUpdate"
					@deleted="removeFlashcard"
				/>
		</div>
		<p v-else>Carregando...</p>
</template>

<script>
import { apiFetch } from "@/services/api.js";
import FlashcardBox from '@/components/FlashcardBox.vue';
import ModalTemplate from '@/components/ModalTemplate.vue'
import CreateFlashcardForm from "@/components/forms/CreateFlashcardForm.vue";

export default {
  name: "SingleFlashcardStackView",
  data() { 
	return {
		flashcard_stack: null,
		modalVisible: false
	}
  },
	async mounted() {
		const flashcard_stack_id = this.$route.params.flashcard_stack_id;

		try {
			this.flashcard_stack = await apiFetch(`/flashcard_stacks/${flashcard_stack_id}`);
		} catch (erro) {
			console.error("Erro:", erro);
		}
	},
	components: {
		FlashcardBox,
		ModalTemplate,
		CreateFlashcardForm,
	},
	methods: {
		removeFlashcard(flashcardId) {
			this.flashcard_stack.flashcards = 
			this.flashcard_stack.flashcards.filter(f => f.id !== flashcardId);
		},
		openModal() {
			this.modalVisible = true;
		},
		closeModal() {
			this.modalVisible = false;
		},
		async onFlashcardCreated() {
			this.closeModal();

			const flashcard_stack_id = this.$route.params.flashcard_stack_id;

			this.flashcard_stack = await apiFetch(`/flashcard_stacks/${flashcard_stack_id}`);
		},
		async onFlashcardUpdate () {
			const flashcard_stack_id = this.$route.params.flashcard_stack_id;
			this.flashcard_stack = await apiFetch(`/flashcard_stacks/${flashcard_stack_id}`);
		}
	},
}
</script>