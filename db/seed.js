const client = require('./client.js');
const { createDepartment } = require('./departments.js');
const { createEmployee } = require('./employees.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS departments;
      `)
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE departments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL
      );

      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(36) NOT NULL,
        dept_id INTEGER REFERENCES departments(id)
      );
    `);
  } catch(error) {
    console.log(error);
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('Connected to Acme DB');

    console.log('Dropping Tables')
    dropTables();
    console.log('Tables Dropped');

    console.log('Creating Tables');
    await createTables();
    console.log('Tables Created');

    console.log('Creating Departments');
    const warehouse = await createDepartment('Wharehouse');
    const frontOffice = await createDepartment('Front Office');
    const infoTech = await createDepartment('Info Tech');
    console.log('Departments Created')

    console.log('Creating Employees');
    await createEmployee('Shaun Newman', warehouse.id);
    await createEmployee('Joe Callahan', frontOffice.id);
    await createEmployee('Ryan Matthews', infoTech.id);
    console.log('Employees Created');

    await client.end();
    console.log('Disconnected from Acme DB');
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();