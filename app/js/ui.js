import {mount} from 'redom'
import accordion from './accordion.js'
import analyzer from './analyzer.js'

const app = document.getElementById('App')
mount(app, accordion)

const trackerBoxes = [
  document.getElementById('gaCheckbox'),
  document.getElementById('mmsCheckbox'),
  document.getElementById('sifoCheckbox')
]

trackerBoxes.forEach((trackerBox) => {
  trackerBox.onclick = (obj) => analyzer.filterType(obj)
})

const clearBtn = document.getElementById('ClearBtn')
clearBtn.onclick = () => analyzer.reset()

const filterBox = document.getElementById('qBox')
filterBox.oninput = ({target}) => {
  analyzer.setFilterText(target.value.trim())
}

export function updateRows(rows) {
  accordion.update(rows)
}

export function isRefreshChecked() {
  return document.querySelector('#refreshCheckbox').checked
}
