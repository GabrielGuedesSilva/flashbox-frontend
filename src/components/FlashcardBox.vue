<template>
  <div class="flashcard-box">
    <p><strong>Palavra:</strong> {{ flashcard.word_to_learn }}</p>
    <p><strong>Tradução:</strong> {{ flashcard.translation }}</p>
    <p><strong>Frase de Contexto:</strong> {{ flashcard.example }}</p>

		<button @click="openUpdateFlashcardModal">
				Editar
		</button>

		<ModalTemplate :show="updateFlashcardModalVisible" @close="closeUpdateFlashcardModal">
			<UpdateFlashcardForm
			:flashcard="flashcard"
				@update="onFlashcardUpdate"
			/>
		</ModalTemplate>


    <button @click="showDeleteModal = true" class="delete-btn">
      Excluir
    </button>

    <ModalTemplate :show="showDeleteModal" @close="showDeleteModal = false">
      <div class="confirm-modal">
        <h3>Excluir flashcard?</h3>
        <p>Essa ação não pode ser desfeita.</p>

        <div class="actions">
          <button @click="deleteFlashcard" class="confirm">
            Confirmar
          </button>
          <button @click="showDeleteModal = false" class="cancel">
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
import UpdateFlashcardForm from "./forms/UpdateFlashcardForm.vue";

export default {
  name: "FlashcardBox",
  components: { ModalTemplate, UpdateFlashcardForm},
  props: {
    flashcard: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
	showDeleteModal: false,
	loading: false,
	updateFlashcardModalVisible: false
    };
  },
	methods: {
	async deleteFlashcard() {
		if (this.loading) return;
		this.loading = true;

		try {
		await apiFetch(`/flashcards/${this.flashcard.id}`, { method: "DELETE" });


		this.$emit("deleted", this.flashcard.id);

		this.showDeleteModal = false;
		} catch (err) {
		console.error("Erro ao excluir flashcard:", err);
		alert("Erro ao excluir.");
		} finally {
		this.loading = false;
		}
	},
	async onFlashcardUpdate() {
		this.$emit("update");
		this.updateFlashcardModalVisible = false
	},
	openUpdateFlashcardModal () {
		this.updateFlashcardModalVisible = true
	},
	closeUpdateFlashcardModal() {
		this.updateFlashcardModalVisible = false
	}
	}
};
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
