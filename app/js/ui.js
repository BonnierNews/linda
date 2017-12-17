import {mount} from 'redom'
import accordion from './accordion.js'
import analyzer from './analyzer.js'

const app = document.getElementById('App')
mount(app, accordion)

const gaCheckbox = document.getElementById('gaCheckbox')
gaCheckbox.onclick = (obj) => analyzer.filterType(obj)

const mmsCheckbox = document.getElementById('mmsCheckbox')
mmsCheckbox.onclick = (obj) => analyzer.filterType(obj)

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
