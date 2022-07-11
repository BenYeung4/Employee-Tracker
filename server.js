//adding the connections files
const db = require("./db/connection");

//npm that are used
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

//specific api connection for all the routes
// const apiRoutes = require("./routes/apiRoutes");

//port
const PORT = process.env.PORT || 3001;

//starting server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  PromptUser();
});

//prompt the start
PromptUser = () => {
  console.log(`
  =================
  Review Company
  =================
  `);

  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What actions would you like to perform?",
      //this helps with displaying all the choices, the page originally shows 7 choices, anymore than that, when we scroll to search, then all the choices disappear
      pageSize: 15,
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit",
      ],
    })
    .then(function ({ action }) {
      switch (action) {
        case "View all Departments":
          viewDepartment();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployee();
          break;
        case "Exit":
          console.log(`
          =================
          Thank you!!
          =================
          `);
          db.end();
          break;
      }
    });
};

//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids
viewDepartment = () => {
  console.log("Displaying departments\n");
  db.query(
    "SELECT * FROM department",

    function (err, results) {
      if (err) throw err;
      console.table(results);
      PromptUser();
    }
  );
};

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
viewRoles = () => {
  console.log("Displaying roles\n");
  db.query(
    `SELECT role.id, 
    role.title, 
    department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`,

    function (err, results) {
      if (err) throw err;
      console.table(results);
      PromptUser();
    }
  );
};

// //WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
viewEmployees = () => {
  console.log("Displaying employees\n");
  db.query(
    `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name,
    role.salary,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`,

    function (err, results) {
      if (err) throw err;
      console.table(results);
      PromptUser();
    }
  );
};

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "Department",
        message: "Add new department",
        validate: (Department) => {
          if (Department) {
            return true;
          } else {
            console.log("Please enter a department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        answer.Department,
        (err, results) => {
          if (err) throw err;
          console.log(" Added " + answer.Department + " to departments!");

          PromptUser();
        }
      );
    });
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Add a role",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "salary",
        message: "Enter the salary",
        validate: (value) => {
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log("Please enter a salary");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "department_id",
        message: "Enter department id number",
        validate: (value) => {
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log("Please enter the department id");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err) => {
          if (err) throw err;
          console.log(" Added " + answer.role + " to roles!");

          PromptUser();
        }
      );
    });
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

addEmployee = () => {
  //will figure out how to get id when i have the chance
  // db.query("SELECT * FROM role", function (err, results) {
  //   if (err) throw err;

  inquirer
    .prompt([
      {
        type: "input",
        name: "fName",
        message: "new employee's first name",
        validate: (fname) => {
          if (fname) {
            return true;
          } else {
            console.log("Please enter employee's first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lName",
        message: "new employee's Last name",
        validate: (lname) => {
          if (lname) {
            return true;
          } else {
            console.log("Please enter employee's last name");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "role",
        message: "Enter role number",
        validate: (role) => {
          if (isNaN(role) === false) {
            return true;
          } else {
            console.log("Please enter role number");
            return false;
          }
        },
        // choices: function () {
        //   var choiceArr = [];
        //   for (i = 0; i < results.length; i++) {
        //     choiceArr.push(res[i].title);
        //   }
        //   return choiceArr;
        // },
      },
      {
        type: "number",
        name: "manager",
        message: "Enter Manager ID",
        validate: (manager) => {
          if (isNaN(manager) === false) {
            return true;
          } else {
            console.log("Please enter manager's ID");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fName,
          last_name: answer.lName,
          role_id: answer.role,
          manager_id: answer.manager,
        },

        (err) => {
          if (err) throw err;
          console.log(
            " Added " + answer.fName + " " + answer.lName + " to our employees!"
          );

          PromptUser();
        }
      );
    });
};
// );
// };

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

updateEmployee = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "choice",
          message: "Select employee to update",
          choices: function () {
            let choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].last_name);
            }
            return choiceArr;
          },
        },
      ])
      .then((answer) => {
        const saveName = answer.choice;
        db.query("SELECT * FROM employee", function (err, results) {
          if (err) throw err;

          inquirer
            .prompt([
              {
                type: "rawlist",
                name: "role",
                message: "Select Title",
                choices: function () {
                  var choiceArr = [];
                  for (i = 0; i < results.length; i++) {
                    choiceArr.push(results[i].role_id);
                  }
                  return choiceArr;
                },
              },
              {
                type: "number",
                name: "manager",
                validate: (value) => {
                  if (isNaN(value) === false) {
                    return true;
                  } else {
                    console.log("Please enter the manager's id");
                    return false;
                  }
                },
              },
            ])
            .then((answer) => {
              console.log(answer);
              console.log(saveName);
              db.query("UPDATE employee SET ? WHERE last_name = ?", [
                {
                  role_id: answer.role,
                  manager_id: answer.manager,
                },
                saveName,
              ]),
                console.log("Employee updated!");
              PromptUser();
            });
        });
      });
  });
};
