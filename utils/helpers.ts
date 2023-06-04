export function trl(n: any) {
  // return numeral(n).format("₺0,0.00");
  return `${parseFloat(String((n / 10000))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').replace(/\.(\d+)$/, ',$1')} ₺`
}
