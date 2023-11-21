<template>
  <v-select
    v-model="user"
    label="Usuario"
    :items="userList"
    item-value="id"
    item-title="name"
  ></v-select>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  userList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const user = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<style scoped></style>
