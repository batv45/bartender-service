const print_server = 'http://192.168.1.5/bartender/api/v1/print'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const reqid = event.context.params.id

  const data = await $fetch(print_server, {
    method: 'POST',
    body: {
      LibraryID: '98cf145a-9986-45e3-bf59-6c9aa5cf9360',
      Relativepath: 'kece-etiket.btw',
      Printer: 'PDF',
      Copies: 1,
      PrintRequestID: reqID,
    },
  }).catch(error => error.data)

  return data
})
