
import { el, list } from 'redom'

class Td {
  constructor () {
    this.el = el('td')
  }
  update (data) {
    this.el.textContent = data
  }
}

const Tr = list.extend('tr', Td)

class Table {
  constructor() {
    this.el = list('table', Tr)
  }
  update(rows) {
    this.el.update(rows)
  }
}

export default Table
