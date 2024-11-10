function makeFriendsList(friends) {
  const newFriendsListDomEl = document.createElement('ul');
  for(let {firstName, lastName} of friends) {
    const newLi = document.createElement('li');
    newLi.textContent = firstName + ' ' + lastName;
    newFriendsListDomEl.append(newLi);
  }
  return newFriendsListDomEl;
}
