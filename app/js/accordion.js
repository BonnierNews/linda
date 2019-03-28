import {el, list} from "redom";
import Table from "./table.js";

let index = 0;
const parentId = "accordion";

class Card {
  constructor() {
    const cardHeaderIndex = `heading${index}`;
    const collapseIndex = `collapse${index}`;

    this.el = el("div.card",
      this.textLink = el("a.card-header", {
        role: "tab",
        id: cardHeaderIndex,
        "data-toggle": "collapse",
        href: `#${collapseIndex}`,
        "aria-expanded": "true",
        "aria-controls": collapseIndex
      }),
      this.collapse =
        el(`div#${collapseIndex}.collapse`, {role: "tabpanel", "aria-labelledby": cardHeaderIndex, "data-parent": `#${parentId}`},
          el("div.card-body",
            this.cardBodyTable = new Table({class: "query-table"}))
        )
    );

    ++index;
  }

  update({summary, details, filterText, prune}) {
    this.textLink.innerHTML = summary;
    this.cardBodyTable.update({rows: details, filterText, prune});
    if (prune) {
      this.collapse.classList.add("show");
    }
  }
}

class Accordion {
  constructor() {
    this.el = list(el(`div#${parentId}`, {role: "tablist"}), Card);
  }
  update(rows) {
    //Do not show more that 500 due to performance
    this.el.update(rows.slice(0, 500));
  }
}

export default new Accordion();
