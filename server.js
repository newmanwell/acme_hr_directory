const express = require('express');
const app = express();
const port = 8080;

const { createEmployee, getEmployees } = require('./db/employees.js');
const { getDepartments } = require('./db/departments.js');

const client = require('./db/client.js');
client.connect();
console.log(getEmployees);

app.get('/api/employees', async(req, res) => {
  res.send(await getEmployees());
});

app.get('/api/departments', async(req, res) => {
  res.send(await getDepartments());
});










app.listen(port, () => console.log(`Listening on port ${port}`));