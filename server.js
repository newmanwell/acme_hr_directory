const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
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

app.post('/api/employees', async(req, res) => {
  const { name, dept_id } = req.body;

  try {
    const newEmployee = await createEmployee(name, dept_id);
    res.send(newEmployee);
  } catch(error) {
    console.log(error);
  }
})










app.listen(port, () => console.log(`Listening on port ${port}`));