function showSalary(users, age) {
  let filteredUsers = users.filter((user) => user.age <= age);

  return filteredUsers.map(({name, balance}) => name + ', ' + balance)
    .join('\n');
  }

