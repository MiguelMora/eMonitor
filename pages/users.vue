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
            v-model="selected"
            :headers="headers"
            :search="search"
            :items="store.docsArray"
            :show-select="true"
            class="elevation-1 mb-5"
          >
            <template #top>
              <v-toolbar flat class="text-white bg-warning">
                <v-toolbar-title class="font-weight-bold"
                  >Usuarios</v-toolbar-title
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
          <v-card-actions v-if="user.isAdmin">
            <v-select v-model="rol" label="Rol" :items="store.roles"></v-select>
            <v-btn :disabled="selected.length === 0" @click="setRole()">
              <v-icon size="medium"> {{ mdiAccountMultiplePlus }} </v-icon>
              Cambiar rol a {{ selected.length }} usuarios
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { mdiAccountMultiplePlus, mdiMagnify } from '@mdi/js'
import { useRoleStore } from '~/stores/role'
import { useUserStore } from '~/stores/user'

definePageMeta({
  middleware: 'autenticado',
})

const store = useRoleStore()
const user = useUserStore()
const selected = ref([])
const search = ref('')
const rol = ref('')

const headers = [
  { title: 'Usuario', key: 'name', align: 'left' },
  { title: 'Rol', key: 'rol', align: 'left' },
]

async function setRole() {
  const newRol = rol.value
  rol.value = ''
  for (const id of selected.value) {
    await store.update(id, { rol: newRol })
  }
}
store.subscribe()
</script>

<style scoped></style>
