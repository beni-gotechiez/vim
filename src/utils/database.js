const users = [];
let counter = 1;

// Create a new user
function create(item) {
  const newItem = { ...item, id: counter++ };
  users.push(newItem);
  console.log(`User created: ${JSON.stringify(newItem)}`);
  return newItem;
}

// Read a user by ID
function find({ id, email, telephone }) {
  let findFn;
  if (id) {
    findFn = (item) => item.id === id;
  } else if (email) {
	findFn = (item) => item.email === email;
  } else if (telephone) {
	findFn = (item) => item.telephone === telephone;
  }
  const user = users.find(findFn) || null;
  console.log(
    user
      ? `User found: ${JSON.stringify(user)}`
      : `User not found`
  );
  return user;
}

// Update a user by ID
function update(id, updatedItem) {
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    console.error(`User with ID ${id} not found for update`);
    return null;
  }

  users[index] = { ...users[index], ...updatedItem };
  console.log(`User updated: ${JSON.stringify(users[index])}`);
  return users[index];
}

// Delete a user by ID
function remove(id) {
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    console.error(`User with ID ${id} not found for deletion`);
    return null;
  }

  const [deletedItem] = users.splice(index, 1);
  console.log(`User deleted: ${JSON.stringify(deletedItem)}`);
  return deletedItem;
}

export { create, find, update, remove };
