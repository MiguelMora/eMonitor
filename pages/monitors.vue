<template>
  <v-container>
    <v-row>
      <msg-panel
        v-model="store.error"
        :dismissible="false"
        type="error"
      ></msg-panel>
      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="store.docsArray"
            class="elevation-1 mb-5"
          >
            <template #top>
              <v-toolbar flat class="text-white bg-amber">
                <v-toolbar-title class="font-weight-bold"
                  >Monitores</v-toolbar-title
                >
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
          <v-card-actions>
            <v-text-field v-model="name" label="Nombre"></v-text-field>
            <v-btn :disabled="!name" @click="addMonitor()">
              <v-icon size="medium"> {{ mdiPlus }} </v-icon>
              Añadir monitor
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { mdiAccountMultiplePlus, mdiMagnify, mdiPlus } from '@mdi/js'
import { useMonitorStore } from '~/stores/monitor'

definePageMeta({
  middleware: 'autenticado',
})

const store = useMonitorStore()
const search = ref('')

const headers = [{ title: 'Nombre', key: 'name', align: 'left' }]

const name = ref('')
async function addMonitor() {
  const newName = name.value
  name.value = ''
  await store.add({ name: newName })
}
store.subscribe()
</script>

<style scoped></style>
