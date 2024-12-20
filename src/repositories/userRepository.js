const fs = require('fs');
const User = require('../models/userModel');

const loadUsers = () => { 
  try { 
    const data = fs.readFileSync('./data/users.json'); 
    return JSON.parse(data); 
  } catch (err) 
  { 
    return []; 
  } 
}; 

let users = loadUsers();

exports.createUser = (username, password, role) => {
  const newUser = new User(users.length + 1, username, password, role);
  users.push(newUser);
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
  return newUser;
};


exports.findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

exports.findUserById = (id) => {
  return users.find(user => user.id == id);
};

exports.updateUser = (id, username, password) => {
  const user = users.find(u => u.id == id);
  if (username) user.username = username;
  if (password) user.password = password;
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
  return user;
};

exports.deleteUser = (id) => {
  const index = users.findIndex(u => u.id == id);
  if (index > -1) {
    users.splice(index, 1);
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
  }
};

exports.getUsers = (limit, page) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return users.slice(startIndex, endIndex);
};

