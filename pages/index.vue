<script setup lang="ts">
import { map, pickBy } from 'lodash'
import { NButton, NInputNumber, NModal, NSpin, NSwitch, NTooltip, useMessage } from 'naive-ui'
import { useStorage } from '@vueuse/core'

const printBody = reactive({
  PrintRequestID: '56d6319a-edf9-415b-a24a-df11485ab3ab',
  Printer: 'PDF',
  Copies: 1,
  DataEntryControls: {
    ttitle: '',
    tamount: 1,
    tkod: '',
    tothercodes: '',
    tcars: '',
  },
})
const message = useMessage()
const searchQuery = reactive({
  q: '',
})
const { $jsonApi } = useNuxtApp()
const res = ref()
const showModal = ref(false)
const selectVariant = ref()
const processPrint = ref(false)
const devMode = useStorage('devMode', false)
watch(devMode, (val) => {
  $jsonApi.axios.defaults.baseURL = val ? 'https://dev.teknorotbalans.online/api' : 'https://teknorotbalans.online/api'
  printBody.Printer = val ? 'PDF' : undefined
  console.log($jsonApi.axios.defaults.baseURL)
  res.value = null
  devMode.value = val
})

async function print(variant) {
  processPrint.value = true
  searchQuery.q = `#${variant.product?.data?.id}`
  await search()
  printBody.DataEntryControls.tkod = variant.sku ?? ''
  printBody.DataEntryControls.ttitle = variant.name ?? ''
  printBody.DataEntryControls.tothercodes = map(res.value.filter(f => f.id != variant.id), 'sku').join('\n') ?? ''
  printBody.DataEntryControls.tcars = variant.product?.data?.description ?? ''
  printBody.DataEntryControls.tamount = variant.min_order_amount ?? 1

  const data = await $fetch('/api/print', {
    immediate: false,
    method: 'post',
    body: printBody,
  }).then(async (r: any) => {
    console.log(r, 'PrintResult')
    if (r.success === true) {
      message.success('Yazdırma işlemi başarılı.')
      showModal.value = false
    }
    else {
      if (r.statusCode == 'DataEntryRequired') {
        printBody.PrintRequestID = r.printRequestID

        const loadmess = message.loading('Veri alındı tekrarlanıyor...')
        return await $fetch('/api/print', {
          method: 'post',
          body: printBody,
        }).then((rr) => {
          console.log(rr, 'RePrintResult')
          if (rr.success === false) { message.error('Yazdırırken hata oluştu!') }
          else {
            loadmess.destroy()
            message.success('Yazdırma işlemi başarılı.')
            showModal.value = false
          }
          return rr
        })
      }
    }
  }).catch(error => error.data)

  processPrint.value = false
}

async function search() {
  if (!searchQuery.q.trim()) {
    res.value = null
    return false
  }
  await $jsonApi.get('/v1/variants', {
    params: {
      filter: pickBy(searchQuery),
      include: 'product',
    },
  }).then(r => res.value = r.data)
}
function searchReset() {
  searchQuery.q = ''
  search()
}
</script>

<template>
  <div w-full xl:w-6xl>
    <div mb-3>
      <div v-if="processPrint" text-center>
        <NSpin size="large" />
      </div>
    </div>
    <div class="mb-3 text-right">
      <pre v-if="devMode" mt-2 text-left>{{ printBody }}</pre>
    </div>

    <div mb-3 flex-row justify-between md:flex>
      <div>
        <input v-model="searchQuery.q" type="text" me-2 w-80 class="form-search" @keydown.enter="search">
        <NButton type="info" @click="search">
          Ara
        </NButton>
      </div>
      <div>
        <span me-2 mt-2 inline-block border rounded-2 bg-gray-100 p-2 vertical-middle md:mt-0>Test Modu: <NSwitch v-model:value="devMode" ms-1>
          <template #checked>
            Açık
          </template>
          <template #unchecked>
            Kapalı
          </template>
        </NSwitch>
        </span>
      </div>
    </div>
    <div v-if="searchQuery.q" mb-2>
      <NButton secondary type="error" @click="searchReset">
        Aramayı temizle
      </NButton>
    </div>
    <div>
      <table w-full table-auto>
        <thead>
          <tr>
            <th class="w-1">
              #ID
            </th>
            <th class="w-1">
              Kod
            </th>
            <th>Açıklama</th>
            <th>Ana Ürün</th>
            <th w-1>
              Fiyat
            </th>
            <th class="w-1">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="variant in res">
            <td>#{{ variant.id }}</td>
            <td>{{ variant.sku }}</td>
            <td>{{ variant.name }}</td>
            <td>#{{ variant.product?.data?.id }} - {{ variant.product?.data?.name }}</td>
            <td>
              <NTooltip trigger="hover">
                <template #trigger>
                  <span> {{ trl(variant.price) }}
                  </span>
                </template>
                KDV'li Alış: {{ trl(variant.buy_price) }}
              </NTooltip>
            </td>
            <td>
              <NButton type="info" @click="selectVariant = variant; showModal = true">
                Etiket Bas
              </NButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <NModal v-if="selectVariant" v-model:show="showModal" preset="dialog" title="Dialog">
      <template #header>
        <div>Etiket: <strong>{{ selectVariant.sku }}</strong></div>
      </template>
      <div flex flex-row>
        <label me-2 pt-2>Kopya sayısı</label>
        <NInputNumber v-model:value="printBody.Copies" />
      </div>
      <template #action>
        <NButton @click="print(selectVariant)">
          Yazdır
        </NButton>
      </template>
    </NModal>
  </div>
</template>

<style lang="scss">
table {
  --at-apply: table-auto border;
  thead th {
    @apply bg-gray-100
  }
   th, td {
    @apply border p-2 whitespace-nowrap;
  }
}
</style>
