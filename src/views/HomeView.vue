<template>
	<section class="content-home-page">
		<div class="data-home">
			<div class="data-home-items">Total de Pilhas: {{ flashcard_stacks.length }}</div>
			<div class="data-home-items">Total de Flashcards: {{ total_flashcards }}</div>
			<div class="data-home-items">Precisam Revisão: {{ review_flashcards }}</div>
		</div>
	</section>

</template>

<script>
import { apiFetch } from "@/services/api.js";

export default {
  name: 'HomeView',
  data() {
	return {
		flashcard_stacks: [],
		total_flashcards: 0,
		review_flashcards: 0
	}
  },
  async mounted() {
	try {
		const flashcard_stacks = await apiFetch("/flashcard_stacks");
		this.flashcard_stacks = flashcard_stacks;

		for (let flashcard_stack of flashcard_stacks) {
		this.total_flashcards += flashcard_stack.flashcards.length;
		}
    } catch (erro) {
		console.error("Erro ao carregar flashcard stacks:", erro)
	}
}
}
</script>