import useFetch from '@vueuse/nuxt'

export default defineEventHandler(() => {
  const { data } = useFetch('https://dummyjson.com/test')
  return {
    data,
  }
})
