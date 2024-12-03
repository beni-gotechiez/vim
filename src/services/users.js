import * as UsersDB from "../utils/database.js";

async function createUser(data) {
  return UsersDB.create(data);
}

async function editUser(identifiers, preferences) {
  const user = UsersDB.find(identifiers);

  if (!user) {
    throw new Error("User not found with the provided identifier.");
  }

  user.preferences = preferences;

  const updatedUser = UsersDB.update(user.id, user);
  return updatedUser;
}

async function getUser(identifiers) {
  const user = UsersDB.find(identifiers);

  if (!user) {
    throw new Error("User not found with the provided identifier.");
  }

  return user;
}

export default {
  createUser,
  editUser,
  getUser,
};
