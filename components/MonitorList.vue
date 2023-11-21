<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="items"
      class="elevation-1 mb-5"
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
              <v-icon>
                {{ mdiMagnify }}
              </v-icon>
            </template>
          </v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-card-actions v-if="isAdmin">
      <v-text-field v-model="name" label="Nombre"></v-text-field>
      <v-btn :disabled="!name" @click="addMonitor()">
        <v-icon size="medium"> {{ mdiPlus }} </v-icon>
        Añadir monitor
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { mdiMagnify, mdiPlus } from '@mdi/js'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['add'])
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
