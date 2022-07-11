INSERT INTO department (name)
VALUES
('SALES'),
('FINANCE'),
('LEGAL'),
('ENGINEER');

INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 12000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Operations', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Benjamin','Yeung', 6, 1),
('John','Doe', 4, 2),
('Terry', 'Bogard', 2, 3),
('Mary', 'Blue', 7, 4),
('New Manager', 'Forgot Name', 4, null),
('Joey','Rong',1,1);