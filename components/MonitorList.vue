<template>
  <v-card>
    <v-data-table
      :model-value="modelValue"
      :headers="headers"
      :search="search"
      :items="items"
      :show-select="true"
      class="elevation-1 mb-5"
      @update:model-value="(v) => emit('update:model-value', v)"
    >
      <template #top>
        <v-toolbar :flat="true" class="text-white bg-amber">
          <v-toolbar-title class="font-weight-bold">Monitores</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Búsqueda"
            single-line
            hide-details
          >
            <template #append>
              <v-icon> mdi-magnify </v-icon>
            </template>
          </v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-card-actions v-if="isAdmin">
      <v-text-field v-model="name" label="Nombre"></v-text-field>
      <v-btn :disabled="!name" @click="addMonitor()">
        <v-icon size="medium"> mdi-plus </v-icon>
        Añadir monitor
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['add', 'update:model-value'])
const search = ref('')

const headers = [{ title: 'Nombre', key: 'name', align: 'left' }]

const name = ref('')

function addMonitor() {
  const newName = name.value
  name.value = ''
  emit('add', { name: newName })
}
</script>

<style scoped></style>
