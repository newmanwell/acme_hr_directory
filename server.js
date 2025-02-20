const express = require('express');
const app = express();
const port = 8080;
const { createEmployee, getEmployees, deleteEmployee } = require('./db/employees.js');
const { getDepartments } = require('./db/departments.js');

app.use(express.json());

const client = require('./db/client.js');
client.connect();
console.log(getEmployees);

// Show employees
app.get('/api/employees', async(req, res) => {
  res.send(await getEmployees());
});

// Show departments
app.get('/api/departments', async(req, res) => {
  res.send(await getDepartments());
});

// Add an employee
app.post('/api/employees', async(req, res) => {
  const { name, dept_id } = req.body;

  try {
    const newEmployee = await createEmployee(name, dept_id);
    res.send(newEmployee);
  } catch(error) {
    console.log(error);
  }
});

// Delete an employee
app.delete('/api/employees/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteEmployee(id);
  } catch(error) {
    console.log(error);
  }
});



app.listen(port, () => console.log(`Listening on port ${port}`));