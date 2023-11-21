<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <a-chart :chart-rows="events" y-field="value"></a-chart>
    </v-card-text>
    <v-card-actions>
      <v-text-field
        v-model="dateStr"
        label="Fecha (año/mes/día)"
        :rules="[isDate]"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="valueStr"
        label="Valor"
        :rules="[isNumber]"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn
        :disabled="!value || !date"
        append-icon="mdi-plus"
        variant="outlined"
        @click="addEvent"
      >
        Añadir {{ name }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  events: {
    type: Array,
    default: () => [],
  },
})

function formatDate(date) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('/')
}

const dateStr = ref(formatDate(new Date()))
const valueStr = ref('0')

const value = computed(() => Number(valueStr.value))
const date = computed(() => new Date(dateStr.value))
const emit = defineEmits(['newEvent'])

function addEvent() {
  emit('newEvent', { date: date.value, value: value.value })
}
function isNumber(str) {
  return !isNaN(Number.parseFloat(str)) || 'Se esperaba un número'
}

function isDate(str) {
  return !isNaN(new Date(str)) || 'La fecha no es correctoa'
}
</script>

<style scoped></style>
