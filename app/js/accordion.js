import { el, mount, list } from 'redom'

let index = 0
const parentId = 'accordion'

class Card {
  constructor () {
    const cardHeaderIndex = `heading${index}`
    const collapseIndex = `collapse${index}`

    this.el = el('div.card',
      this.header = el('div.card-header', { role: 'tab', id: cardHeaderIndex},
        el('h5.mb-0',
          this.textLink = el('a', {'data-toggle':'collapse', href: `#${collapseIndex}`, 'aria-expanded': 'true', 'aria-controls': collapseIndex}))
      ),
      this.collapse =
        el(`div#${collapseIndex}.collapse`, {role: 'tabpanel', 'aria-labelledby': cardHeaderIndex, 'data-parent': `#${parentId}`},
          this.cardBody = el('div.card-body')
        )
    )

    ++index
  }

  update ({short, long}) {
    this.textLink.textContent = short
    this.cardBody.textContent = long
  }
}

const accordion = list(el(`div#${parentId}`, {role: 'tablist'}), Card)

mount(document.body, accordion)

function updateUi(rows) {
  //Do not show more that 250 due to performance
  accordion.update(rows.slice(250))
}

export default updateUi
