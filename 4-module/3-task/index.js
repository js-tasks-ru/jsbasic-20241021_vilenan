function highlight(table) {

  const tableRowsArr = table.rows;
  for (let row of tableRowsArr) {
    const statusCell = row.cells[row.cells.length - 1];
    const genderCell = row.cells[row.cells.length - 2];
    const ageCell = row.cells[1];

    if (parseInt(ageCell.innerHTML) < 18) row.style.textDecoration = 'line-through';

    if (genderCell.innerHTML === 'f') row.classList.add('female');

    if (genderCell.innerHTML === 'm') row.classList.add('male');

    if (!statusCell.hasAttribute('data-available')) {
      row.setAttribute('hidden',"");
    } else if (statusCell.getAttribute('data-available') === 'true') {
      row.classList.add('available');
    } else if (statusCell.getAttribute('data-available') === 'false') {
      row.classList.add('unavailable');
    }

  }
}

