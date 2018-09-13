import {mount} from 'redom'
import accordion from './accordion.js'
import analyzer from './analyzer.js'

const app = document.getElementById('App')
mount(app, accordion)

const trackerLabels = [
  document.getElementById('gaCheckbox'),
  document.getElementById('mmsCheckbox'),
  document.getElementById('sifoCheckbox'),
  document.getElementById('linkpulseCheckbox'),
  document.getElementById('jtpCheckbox'),
  document.getElementById('plyCheckbox'),
  document.getElementById('ramCheckbox'),
]

trackerLabels.forEach((label) => {
  label.onclick = (event) => {
    const checkBox = event.target.type === 'checkbox' ? event.target : event.target.getElementsByTagName('input')[0]

    if (event.shiftKey) {
      trackerLabels.forEach((_tracker) => {
        _tracker.getElementsByTagName('input')[0].checked = false
      })

      checkBox.checked = true

      analyzer.filterOnlyType(trackerLabels, checkBox)
    } else {
      analyzer.filterType(checkBox)
    }
  }
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

const pruneCheckbox = document.querySelector('#pruneCheckbox')
pruneCheckbox.addEventListener('click', (event) => {
  analyzer.updateUi()

  if (!event.target.checked) {
    document.querySelectorAll('.collapse').forEach(i => i.classList.remove('show'))
  }
})


export function updateRows(...args) {
  accordion.update(...args)
}

export function isRefreshChecked() {
  return document.querySelector('#refreshCheckbox').checked
}

export function isPruneChecked() {
  return document.querySelector('#pruneCheckbox').checked
}
