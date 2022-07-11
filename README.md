

# Employee-Tracker

## Description

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

there are still some bugs where role and manager only shows number rather than the individual.  Will fix when I have the oppotunity

https://drive.google.com/file/d/1FMmVCt0vOtvoCwW4aG6z8csjwKjPa24F/view

## Table of Content

- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [License](#License)
- [Questions](#Questions)

## Installation

Please install the following dependencies to run the application properly:

npm init --y
npm install inquirer mysql2
npm install --save inquirer@8.2.3
npm install jest --save-dev
npm install console.table --save

## Usage:

After installs above

in terminal:
mysql -u root -p
"enter your username and password for mysql"

source db/schema.sql and source db/seeds.sql

quit mysql

npm start

## Contributors:

none

## Tests:

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Questions

If you have any questions, please open a issue or contact the following:

Github Profile Contact: https://github.com/BenYeung4
Email Contact: byeungis@gmail.com
