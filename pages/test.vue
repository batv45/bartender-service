<script setup lang="ts">
import { NResult } from 'naive-ui'
import { IconCircleCheckFilled, IconHelpCircleFilled } from '@tabler/icons-vue'

const { $jsonApi } = useNuxtApp()
const testResult = ref()

function test() {
  $jsonApi.get('/v1/test')
    .catch((err) => {
      if (err.response.data.jsonapi?.version)
        testResult.value = err.response.data
    })
}
test()
</script>

<template>
  <div text-center lg:w-2xl>
    <NResult v-if="testResult" title="Başarılı">
      <pre text-left>/api/v1/test
{{ testResult }}</pre>
      <template #icon>
        <IconCircleCheckFilled text-green-5 :size="126" />
      </template>
    </NResult>

    <NResult v-else status="error" title="Bilinmiyor">
      <template #icon>
        <IconHelpCircleFilled text-blue-5 :size="126" />
      </template>
    </NResult>
  </div>
</template>
