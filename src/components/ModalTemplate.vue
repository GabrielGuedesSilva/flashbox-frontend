<template>
  <div v-if="show" class="modal-overlay" @click="closeOnOverlay && $emit('close')">
    <div class="modal-content" @click.stop>
			<button class="modal-close-btn" @click="$emit('close')">✖</button>
			<slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalTemplate",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.25);
}

.modal-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: none;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  color: #555;
  transition: 0.2s ease;
}

.modal-close-btn:hover {
  color: #000;
  transform: scale(1.1);
}
</style>
