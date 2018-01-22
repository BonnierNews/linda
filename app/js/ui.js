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


filterBox.onkeypress = (event) => {
  if (event.keyCode == 10 || event.keyCode == 13) {
    event.preventDefault()
  }
}


export function updateRows(...args) {
  accordion.update(...args)
}

export function isRefreshChecked() {
  return document.querySelector('#refreshCheckbox').checked
}
