<script setup lang="ts">
</script>

<template>
  <NuxtLink custom to="/">
    <template #default="{ href, navigate }">
      <NButton @click="navigate">
        <slot />
      </NButton>
    </template>
  </NuxtLink>
</template>
