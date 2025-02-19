const client = require('./client.js');

const createDepartment = async(teamName) => {
  try {
      const { rows } = await client.query(`
      INSERT INTO departments (name) 
      VALUES ('${teamName}')
      RETURNING *;
    `);
    const department = rows[0];
    return department;
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createDepartment };