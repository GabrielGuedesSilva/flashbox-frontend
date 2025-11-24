<template>
		<div>
			<router-link :to="`/flashcard_stacks/${flashcard_stack.id}`">
				<h1>Título: {{ flashcard_stack.title }}</h1>
			</router-link>

			<div>Linguagem de Aprendizado: {{ flashcard_stack.learning_language }}</div>
			<div>Linguagem Dominante: {{ flashcard_stack.main_language }}</div>
			<div>Quantidade de Flashcards: {{ flashcard_stack.flashcards.length }}</div>

			<button @click="openUpdateFlashcardStackModal">
				Editar
			</button>

			<ModalTemplate :show="updateFlashcardStackModalVisible" @close="closeUpdateFlashcardModal">
				<UpdateFlashcardStackForm
					:flashcard_stack="flashcard_stack"
					@update="onFlashcardUpdate"
					@cancel="closeUpdateFlashcardModal"
				/>
			</ModalTemplate>

			<button @click="showDeleteFlashcardStackModal = true" class="delete-btn">
				Excluir
			</button>

			<ModalTemplate :show="showDeleteFlashcardStackModal" @close="showDeleteFlashcardStackModal = false">
				<div class="confirm-modal">
					<h3>Excluir pilha de flashcard?</h3>
					<p>Essa ação não pode ser desfeita.</p>

					<div class="actions">
						<button @click="deleteFlashcardStack" class="confirm">
							Confirmar
						</button>
						<button @click="showDeleteFlashcardStackModal = false" class="cancel">
							Cancelar
						</button>
					</div>
				</div>
			</ModalTemplate>
			
		</div>
</template>

<script>
import { apiFetch } from "@/services/api.js";
import ModalTemplate from "@/components/ModalTemplate.vue";
import UpdateFlashcardStackForm from "./forms/UpdateFlashcardStackForm.vue";

export default {
  name: "FlashcardStackBox",
  props: {
    flashcard_stack: {
      type: Object,
      required: true
    }
  },
  components: {
	ModalTemplate,
	UpdateFlashcardStackForm
  },
  data() {
	return {
		showDeleteFlashcardStackModal: false,
		loading: false,
		updateFlashcardStackModalVisible: false
	}
  },
  methods: {
	async deleteFlashcardStack() {
		if (this.loading) return;
		this.loading = true;

			try {
			await apiFetch(`/flashcard_stacks/${this.flashcard_stack.id}`, { method: "DELETE" });

			this.$emit("deleted", this.flashcard_stack.id);

			this.showDeleteFlashcardStackModal = false;
			} catch (err) {
			console.error("Erro ao excluir flashcard:", err);
			alert("Erro ao excluir.");
		} finally {
			this.loading = false;
		}
	},
	async onFlashcardUpdate() {
		const data = await apiFetch(`/flashcard_stacks/${this.flashcard_stack.id}`);
		this.$emit("update", data);

		this.updateFlashcardStackModalVisible = false
	},
	openUpdateFlashcardStackModal() {
		this.updateFlashcardStackModalVisible = true
	},
	closeUpdateFlashcardModal () {
		this.updateFlashcardStackModalVisible = false
	},
}
}
</script>

<style scoped>
.flashcard-box {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.delete-btn {
  margin-top: 10px;
  background: #ff4c4c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #d63c3c;
}

.confirm-modal h3 {
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.confirm {
  background: #ff4c4c;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
}

.cancel {
  background: #ccc;
  padding: 6px 12px;
  border-radius: 4px;
}
</style>
