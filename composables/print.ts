export function usePrint() {
  const printBody = {
    PrintRequestID: '56d6319a-edf9-415b-a24a-df11485ab3ab',
    Printer: 'PDF',
    DataEntryControls: {
      ttitle: 'ROTBASI M131 DKS SLX\nSAĞ SOL',
      tamount: '1',
      tkod: 'KRAFTVOLL 13020117',
      tothercodes: 'TEKNOROT F-202\nORJIN 0123\nDELPHI 5467\nASD\nDDD\nBBB',
      tcars: 'TOFAŞ\nFIAT LİNEA\nCORSA B\nOPEL VECTRA C\nVW GOLF IV',
    },
  }

  async function printParts() {
    return useFetch('/api/print', {
      immediate: false,
      method: 'post',
      body: printBody,
    })
  }

  return {
    printBody,
    printParts,
  }
}
