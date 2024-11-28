/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  constructor(rows) {
    this.rows = rows; //получаем данные в виде массива
    this.elem = this.renderTable();
  }
  renderTable(){
    const table = document.createElement('table');
    table.style.minWidth = '500px';
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerRowTitles = ['Имя', 'Возраст', 'Зарплата', 'Город', 'Удалить'];

    headerRowTitles.forEach(title => {
      const th = document.createElement('th');
      th.textContent = title;
      headerRow.append(th);
    });
    header.append(headerRow);
    table.append(header);

    const tableBody = document.createElement('tbody');

    this.rows.forEach(({name, age, salary, city}) => {
      const tableRow = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = name;
      tableRow.append(tdName);
      const tdAge = document.createElement('td');
      tdAge.textContent = age;
      tableRow.append(tdAge);
      const tdSalary = document.createElement('td');
      tdAge.textContent = salary;
      tableRow.append(tdSalary);
      const tdCity = document.createElement('td');
      tdCity.textContent = city;
      tableRow.append(tdCity);

      const tdDelete = document.createElement('td');
      tdDelete.style.textAlign = 'center';
      const button = document.createElement('button');
      button.textContent = 'X';

      button.addEventListener('click', () => {
        tableRow.remove();
      });
      tdDelete.append(button);
      tableRow.append(tdDelete);

      tableBody.append(tableRow);
    });

    table.append(tableBody);
    return table;
  }
}

