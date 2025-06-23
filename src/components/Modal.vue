<!-- src/components/Modal.vue -->
<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot />
      <button class="modal-close" @click="close">閉じる</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
const visible = ref(props.modelValue)

watch(
  () => props.modelValue,
  val => { visible.value = val }
)

function close() {
  visible.value = false
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
.modal-close {
  margin-top: 1rem;
}
</style>