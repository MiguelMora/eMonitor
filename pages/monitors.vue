<template>
  <v-container>
    <v-row v-if="!!user.rol">
      <msg-panel
        v-model="monitors.error"
        :dismissible="false"
        type="error"
      ></msg-panel>
      <v-col cols="12">
        <monitor-list
          v-model="selected"
          :items="monitors.docsArray"
          :is-admin="user.isAdmin"
          @add="monitors.add"
        >
        </monitor-list>
      </v-col>
      <v-col v-if="isFaculty" cols="12">
        <user-chooser
          :model-value="events.uid"
          :user-list="roles.docsArray"
          @update:model-value="events.subscribe"
        ></user-chooser>
      </v-col>
      <v-col v-for="(mon, i) in selected" :key="i" cols="12">
        <show-data
          :name="getName(mon)"
          :events="getEvents(mon)"
          @new-event="(e) => addEvent(mon, e)"
        ></show-data>
      </v-col>
    </v-row>
    <div v-else>
      Para acceder a esta página es necesario que un administrador le de de alta
      en la aplicación
    </div>
  </v-container>
</template>
<script setup>
import { useMonitorStore } from '~/stores/monitor'
import { useUserStore } from '~/stores/user'
import { useRoleStore } from '~/stores/role'
import { useEventStore } from '~/stores/event'

definePageMeta({
  middleware: 'autenticado',
})

const monitors = useMonitorStore()
const user = useUserStore()
const roles = useRoleStore()
const isFaculty = computed(() => user.rol === 'Admin' || user.rol === 'Faculty')
const events = useEventStore()
const selected = ref([])

monitors.subscribe()
function getMonitor(id) {
  return monitors.documents[id]
}
function getEvents(id) {
  return events.docsArray
    .filter((e) => e.monitor === id)
    .map((e) => ({ date: e.date.toDate(), value: e.value }))
}

function getName(id) {
  return getMonitor(id).name
}

async function addEvent(monitor, event) {
  await events.add({ monitor, ...event })
}

watch(
  isFaculty,
  (isFaculty) => {
    if (isFaculty) {
      roles.subscribe()
    } else {
      roles.unsubscribe()
      events.subscribe(user.uid)
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
