USE employee_db;

INSERT INTO department (name) VALUES
    ("Engineering"),
    ("Sales"),
    ("Finance"),
    ("Legal");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Accountant", 125000, 3),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Salesperson", 80000, 1),
    ("Lawyer", 190000, 4),
    ("Account Manager", 160000, 3),
    ("Legal Team Lead", 250000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Mike", "Roberts", 2, NULL),
    ("Jared", "Lee", 1, 1),
    ("Kerry", "Dawn", 4, 1),
    ("Max", "Shaun'", 4, 2),
    ("Derrick", "Fisher", 4, 2),
    ("Tim", "Arnold", 2, 2),
    ("Selma", "Taryn", 3, 3);