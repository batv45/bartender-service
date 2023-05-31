<script setup lang="ts">
const { data, execute } = useFetch('/api/print', { immediate: false })
async function print() {
  const { data } = await useFetch('/api/print', { immediate: false })
  console.log(data)
}
</script>

<template>
  <div>
    <div>
      <a href="#" @click.prevent="execute">Print</a>
    </div>
    <pre>{{ data }}</pre>
  </div>
</template>
