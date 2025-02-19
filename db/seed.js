const client = require('./client.js');
const { createDepartment } = require('./departments.js');
const { createEmployee } = require('./employees.js');

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE departments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL
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

    console.log('Creating Tables');
    await createTables();
    console.log('Tables Created');

    console.log('Creating Departments');
    const warehouse = await createDepartment('Wharehouse');
    const frontOffice = await createDepartment('Front Office');
    const infoTech = await createDepartment('Info Tech');
    console.log('Departments Created')

    await client.end();
    console.log('Disconnected from Acme DB');
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();