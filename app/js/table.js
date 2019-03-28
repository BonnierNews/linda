
import { el, list } from "redom";

class Td {
  constructor() {
    this.el = el("td");
  }
  update(data) {
    this.el.textContent = data;
  }
}

class Tr {
  constructor(opts) {
    this.el = el("tr", opts);
    this.list = list(this.el, Td);
  }
  update({columns, filterText, prune}) {
    this.list.update(columns);
    if (!prune && filterText && columns.join("=").match(new RegExp(filterText, "i"))) {
      this.el.classList.add("highlight");
    } else {
      this.el.classList.remove("highlight");
    }
  }
}

class Table {
  constructor(opts) {
    this.el = list(el("table", opts), Tr);
  }
  update({rows, filterText, prune}) {
    this.el.update(rows.map((columns) => ({columns, filterText, prune})));
  }
}

export default Table;
