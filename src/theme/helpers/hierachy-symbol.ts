export function hierachySymbol() {
  let symbol = '';
  if (this.reflection) {
    symbol = this.reflection.extendedTypes ? '↳' : '';
  }
  return symbol;
}
