<script setup lang="ts">
import { NResult } from 'naive-ui'
import { IconCircleCheckFilled } from '@tabler/icons-vue'
</script>

<template>
  <div text-center lg:w-2xl>
    <NResult title="Başarılı">
      <template #icon>
        <IconCircleCheckFilled text-green-5 :size="126" />
      </template>
    </NResult>
  </div>
</template>
