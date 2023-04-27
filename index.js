require("console.table")
const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username,
      port: 3306,
      user: 'root',
      // TODO: Add MySQL Password
      password: 'password',
      database: 'employee_db'
    },
  );

db.connect((err) => {
    if (err) throw err;
    init();
})

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
]

async function init() {
    try {
        const answer = await inquirer.prompt(initialQuestion);
        console.log(answer.choice);

        // if answer is "View all Departments", then call viewAllDeplartments() function
        // or, if answer is "View all Roles," then call viewAllRoles() function
        if (answer.choice === "View All Departments"){
            viewAllDepartments();
        } 
        else if (answer.choice === "View All Roles"){
            viewAllRoles();
        }
        else if (answer.choice === "View All Employees"){
            viewAllEmployees();
        }
        else if (answer.choice === "Add a Department"){
            addDeparment();
        }
        else if (answer.choice === "Add a Role"){
            addRole();
        }
        else if (answer.choice === "Add an Employee"){
            addEmployee();
        }
        else {
            updateEmployeeRole();
        }
    } catch (error) {
        console.log(error);
    }
}



function viewAllDepartments() {
    console.log('vew all dp')
    db.query('SELECT * FROM department', (err, res) => {
        console.log('i am here w/ res', res)
        if (err) {
            return reject(err);
        }

        console.table(res);
        init();
    })

    // db.promise().query('SELECT * FROM department', function (err, [results]) {
    //     console.table(results);
    //   });
    //console.log("function for view all departments")

    // db.promise().query('SELECT * FROM department');

}

function viewAllRoles() {
   
    db.query('SELECT * FROM role', (err, res) => {
        if (err) {
            return reject(err);
        }

        console.table(res);
        init();
    })
}
function viewAllEmployees() {
   
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            return reject(err);
        }

        console.table(res);
        init();
    })
}
function addDeparment(){

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

function addRole(){
    console.log("function for add role")
}

function addEmployee(){
    console.log("function for add employee")
    db.query("SELECT * FROM role", function (err, res){
        if (err) return (err);
            inquirer.prompt([
                {
                name: "firstName",
                type: "input",
                message: "What is the first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name?"
            },
            {
                name: "managerId",
                type: "input",
                message: "What is the manager id?"
            },
            {
                name: "addEmployeeRole",
                type: "input",
                message: "What is the role?"
            },
        ]).then(function(answer) {
            db.query("INSERT INTO employee SET ?",{
            
                first_name: answer.firstName,
                last_name: answer.lastName,
                manager_id: answer.managerId,
                added_Role: answer.addEmployeeRole,
            }),
        });
    });
}

function updateEmployeeRole(){
    console.log("function for update employee role")
}

// init();
// study react as a full stack developer
// basic of mysql mostly
// ask questions thru inquirer
