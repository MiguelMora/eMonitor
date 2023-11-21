<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" rail expand-on-hover>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :title="item.title"
          :prepend-icon="item.icon"
          exact
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="logged" icon @click.stop="doLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else icon to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const drawer = ref(false)
const title = ref('eSalud Monitor')
const isFaculty = computed(
  () => store.rol === 'Admin' || store.rol === 'Faculty'
)

const items = computed(() => {
  const base = [
    {
      icon: 'mdi-apps',
      title: 'Inicio',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Datos',
      to: '/monitors',
    },
  ]
  const faculty = [
    {
      icon: 'mdi-account-multiple',
      title: 'Usuarios',
      to: '/users',
    },
  ]
  if (isFaculty.value) return [...base, ...faculty]
  else return base
})

const { logged } = storeToRefs(store)

async function doLogout() {
  await store.logout()
  navigateTo('/')
}
</script>
