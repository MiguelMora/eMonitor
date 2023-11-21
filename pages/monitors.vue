<template>
  <v-container>
    <v-row>
      <msg-panel
        v-model="monitors.error"
        :dismissible="false"
        type="error"
      ></msg-panel>
      <v-col cols="12">
        <monitor-list
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
    </v-row>
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

monitors.subscribe()

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
