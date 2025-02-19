const client = require('./client.js');

const createEmployee = async(employeeName, departmentID) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO employees (name, dept_id)
      VALUES ('${employeeName}', ${departmentID})
      RETURNING *
      `)
      const employee = rows[0];
      return employee
  } catch(error) {
    console.log(error)
  }
}

module.exports = { createEmployee }