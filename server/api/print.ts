const print_server = 'http://192.168.1.5/bartender/api/v1/print'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const defBody = {
    LibraryID: '98cf145a-9986-45e3-bf59-6c9aa5cf9360',
    Relativepath: 'etiket.btw',
    Copies: 1,
  }

  const data = await $fetch(print_server, {
    method: 'POST',
    body: { ...defBody, ...body },
  }).catch(error => error.data)

  return data
})
