function makeTable(rows) {
  function makeRows(rows) {
    function makeRow({tracker, type, status}) {
      return `
      <tr>
      <td>${tracker}</th>
      <td>${type}</th>
      <td>${status}</th>
      </tr>
      `
    }
    return rows.map(makeRow).join('')
  }

  return `
    <table>
      <thead>
        <tr>
        <th>Tracker</th>
        <th>Type</th>
        <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${makeRows(rows)}
      </tbody>
    </table>
  `
}

function updateUi(rows) {
  const tableDiv = document.getElementById('requestsTable')
  const html = makeTable(rows)
  tableDiv.innerHTML = html
}

export default updateUi
