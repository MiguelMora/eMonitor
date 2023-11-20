<template>
  <v-row v-if="withError">
    <v-col>
      <v-alert v-model="withError" :type="type" :closable="dismissible">
        {{ value }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['update:modelValue'])
const withError = computed({
  get() {
    return !!props.value
  },
  set(value) {
    if (!value) emits('update:modelValue', '')
  },
})
</script>

<style scoped></style>
