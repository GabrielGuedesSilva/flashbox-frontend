<template>
    <h1>SUAS PILHAS DE FLASHCARDS</h1>
		<h2>Quantidade de Pilhas de Flashcards: {{ total_flashcards }}</h2>
		<button @click="openCreateFlashcardModal">Criar Novo Flashcard</button>
		<button @click="openCreateFlashcardStackModal">Criar Nova Pilha</button>

    <ModalTemplate :show="createFlashcardModalVisible" @close="closeCreateFlashcardModal">
			<CreateFlashcardForm
				@created="onFlashcardCreated"
				@cancel="closeCreateFlashcardModal"
			/>
    </ModalTemplate>

		<ModalTemplate :show="createFlashcardStackModalVisible" @close="closeCreateFlashcardStackModal">
			<CreateFlashcardStackForm
				@created="onFlashcardStackCreated"
				@cancel="closeCreateFlashcardStackModal"
			/>
    </ModalTemplate>


		<div>
			<ul>
				<li v-for="flashcard_stack in flashcard_stacks" :key='flashcard_stack'>
					<FlashcardStackBox :flashcard_stack="flashcard_stack" @deleted="onFlashcardStackDelete"
					@update="onFlashcardStackUpdate"
					></FlashcardStackBox>
				</li>
			</ul>
		</div>
</template>

<script>
import CreateFlashcardForm from "@/components/forms/CreateFlashcardForm.vue";
import CreateFlashcardStackForm from "@/components/forms/CreateFlashcardStackForm.vue";
import FlashcardStackBox from '@/components/FlashcardStackBox.vue'
import ModalTemplate from '@/components/ModalTemplate.vue'
import { apiFetch } from "@/services/api.js";

export default {
  name: 'FlashcardStacksView',
  data() {
	return {
		flashcard_stacks: [],
		total_flashcards: 0,
		createFlashcardModalVisible: false,
		createFlashcardStackModalVisible: false,
	}
  },
  components: {
	FlashcardStackBox,
	ModalTemplate,
	CreateFlashcardForm,
	CreateFlashcardStackForm
  },
  methods: {
    openCreateFlashcardModal() {
      this.createFlashcardModalVisible = true;
    },
    closeCreateFlashcardModal() {
      this.createFlashcardModalVisible = false;
    },
	openCreateFlashcardStackModal() {
      this.createFlashcardStackModalVisible = true;
    },
    closeCreateFlashcardStackModal() {
      this.createFlashcardStackModalVisible = false;
    },
	async onFlashcardCreated() {
		this.createFlashcardModalVisible = false;
		await this.reloadStacks();
	},

	async onFlashcardStackCreated() {
		this.createFlashcardStackModalVisible = false;
		await this.reloadStacks();
	},
	async onFlashcardStackDelete() {
		await this.reloadStacks();
	},
	async onFlashcardStackUpdate () {
		await this.reloadStacks();
	},
	async reloadStacks() {
		this.total_flashcards = 0;

		const data = await apiFetch("/flashcard_stacks");
		this.flashcard_stacks = data;

		for (let stack of data) {
		this.total_flashcards += stack.flashcards.length;
		}
	}
	},
	async mounted() {
		await this.reloadStacks();
	},
}
</script>