import {mount, el} from 'redom'
import accordion from './accordion.js'
import analyzer from './analyzer.js'

const refreshCheckbox =
  el('div.form-check',
    el('label.form-check-label',
      el('input#refreshCheckbox.form-check-input', {
        type: 'checkbox',
        value: '',
        checked: true
      }),
      'Reload on refresh/href update'
    ))

const clearBtn = el('button.btn.btn-primary', 'Clear', {
  type: 'button',
  onclick: () => analyzer.reset()
})

mount(document.body, refreshCheckbox)
mount(document.body, clearBtn)
mount(document.body, accordion)

export function updateRows(rows) {
  accordion.update(rows)
}

export function isRefreshChecked() {
  return document.querySelector('#refreshCheckbox').checked
}
