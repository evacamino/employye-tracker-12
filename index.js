require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  // MySQL Username,
  port: 3306,
  user: "root",
  // TODO: Add MySQL Password
  password: "password",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  init();
});

const initialQuestion = [
  {
    type: "list",
    name: "choice",
    message: "What do you want to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Employee Role",
    ],
  },
];

async function init() {
  try {
    const answer = await inquirer.prompt(initialQuestion);
    console.log(answer.choice);

    // if answer is "View all Departments", then call viewAllDeplartments() function
    // or, if answer is "View all Roles," then call viewAllRoles() function
    if (answer.choice === "View All Departments") {
      viewAllDepartments();
    } else if (answer.choice === "View All Roles") {
      viewAllRoles();
    } else if (answer.choice === "View All Employees") {
      viewAllEmployees();
    } else if (answer.choice === "Add a Department") {
      addDeparment();
    } else if (answer.choice === "Add a Role") {
      addRole();
    } else if (answer.choice === "Add an Employee") {
      addEmployee();
    } else {
      updateEmployeeRole();
    }
  } catch (error) {
    console.log(error);
  }
}

function viewAllDepartments() {
  console.log("vew all dp");
  db.query("SELECT * FROM department", (err, res) => {
    console.log("i am here w/ res", res);
    if (err) {
      return reject(err);
    }

    console.table(res);
    init();
  });

}

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) {
      return reject(err);
    }

    console.table(res);
    init();
  });
}
function viewAllEmployees() {
  let sqlEmployeeQuery = `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name,
      role.title as ROLE, 
      department.name as DEPARTMENT, 
      CONCAT (manager.first_name, ' ', manager.last_name) 
      AS MANAGER FROM employee 
      LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department on role.department_id = department.id 
      LEFT JOIN employee manager on employee.manager_id = manager.id`;
  db.query(sqlEmployeeQuery, function (error, results) {
    if (error) throw error;
    console.table(results);
    db.end();
  });
}

function addDeparment() {
  // const addDeptPrompt = [{
  //     //     type: "input",
  //     //     name: "department",
  //     //     message: "What is the name of the new department?",}
  //     // ]
  //     // const newDept = inquirer.prompt(addDeptPrompt);
  //     // console.log(newDept)
  //   db.query(`INSERT INTO department (name),
  //   VALUES (?)`,(err,res) => {
  //     if (err) {
  //         return reject(err);
  //     }
  //    // console.table(res);
  //     //init();
  // })
}

// const addDeptPrompt = [{
//         type: "input",
//         name: "department",
//         message: "What is the name of the new department?",}

//     ]
//     const newDept = inquirer.prompt(addDeptPrompt);
//     console.log(newDept)

//     db.query('INSERT INTO `department`(id, name) VALUES ?'), (err, res) => {
//         if (err) {
//             return reject(err);
//         }

//          console.table(res);
//         init();
//     }

///// ask the user for name of dept (prompt?)

///// add the new row to dept table (insert into?) w/ query tool

function addRole() {
  console.log("function for add role");
  // department.title department.id
}

function addEmployee() {
  console.log("function for add employee");
  db.query("SELECT * FROM role", function (err, res) {
    if (err) return err;
    // console.log(res);
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the last name?",
        },
        {
          name: "addEmployeeRole",
          type: "list",
          choices: res.map((role) => ({ name: role.title, value: role.id })),
          message: "What is the role?",
        },
        {
          name: "managerId",
          type: "input",
          message: "What is the manager id?",
        },
      ])
      .then(function (answer) {
        let newEmployee = {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.addEmployeeRole,
          manager_id: answer.managerId,
        };
        // console.log(newEmployee);
        db.query("INSERT INTO employee SET ?", newEmployee), init();
      });
  });
}

function updateEmployeeRole() {
  console.log("function for update employee role");
}

// init();
// study react as a full stack developer
// basic of mysql mostly
// ask questions thru inquirer
