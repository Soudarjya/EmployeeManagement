const mongoose = require('mongoose');
const Employee = require('../models/employee');
const { faker } = require('@faker-js/faker');
const connectDB = require('./db');
const dotenv = require('dotenv').config();
connectDB();

const adminSeed = async () => {
  try {
    
    const employees = [];
    const customDepartments = [
        'Engineering',
        'Marketing',
        'Human Resources',
        'Finance',
        'Operations',
        'Sales',
        'IT Support',
        'Research and Development',
        'Customer Service',
        'Legal',
      ];

    for (let i = 0; i < 100; i++) {
      const id=i;
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const position = faker.person.jobTitle();
      const department = faker.helpers.arrayElement(customDepartments);
      const dateOfJoining = faker.date.past(5); // Past 5 years
      const status = faker.helpers.arrayElement(['Active', 'Inactive']);
      const profilePicture = faker.image.avatar(); // URL for avatar image
      const auditLog = Array.from({ length: 3 }, () => ({
        change: faker.lorem.sentence(),
        date: faker.date.recent(30), // Recent 30 days
      }));

      employees.push({
        id,
        name,
        email,
        position,
        department,
        dateOfJoining,
        status,
        profilePicture,
        auditLog,
      });
    }

    await Employee.insertMany(employees);

    console.log('100 employees seeded successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding employees:', error);
    mongoose.connection.close();
  }
};

adminSeed();
