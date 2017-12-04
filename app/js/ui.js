import { el, mount, list } from 'redom'

class Td {
  constructor () {
    this.el = el('td')
  }
  update (data) {
    this.el.textContent = data
  }
}

const Tr = list.extend('tr', Td)

const table = list('table', Tr)

const app = el('div', table)

mount(document.body, app)

function updateUi(rows) {
  table.update(rows.map(o => Object.values(o)))
}

export default updateUi
