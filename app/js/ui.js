import {mount, el} from 'redom'
import accordion from './accordion.js'
import analyzer from './analyzer.js'

class Settings {
  constructor() {
    this.refreshCheckbox = el('div.form-check',
      el('label.form-check-label',
        el('input#refreshCheckbox.form-check-input', {
          type: 'checkbox',
          value: '',
          checked: true
        }),
        'Reload on refresh/href update'
      ))

    this.clearBtn = el('button.btn.btn-primary', 'Clear', {
      type: 'button',
      onclick: () => analyzer.reset()
    })

    this.el = el('div.settings', this.refreshCheckbox, this.clearBtn)
  }
}

const app = document.getElementById('App')

mount(app, new Settings())
mount(app, accordion)

export function updateRows(rows) {
  accordion.update(rows)
}

export function isRefreshChecked() {
  return document.querySelector('#refreshCheckbox').checked
}
