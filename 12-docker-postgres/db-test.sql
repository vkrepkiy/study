-- set schema as default
SET search_path TO vkgis;

-- Add vehicle of type "parkon_new_group"
INSERT INTO obj_group (name_short, left_key, right_key) VALUES ('parkon_new_group', 100, 101);

INSERT INTO obj (name_short ) VALUES ('Parkon NEW');

INSERT INTO obj_to_group (obj_id, obj_group_id ) VALUES (
  (SELECT id FROM obj WHERE name_short = 'Parkon NEW'),
  (SELECT id FROM obj_group WHERE name_short = 'parkon_new_group')
);

-- Add driver
INSERT INTO employee (first_name, last_name, email)
  VALUES ('Angus', 'Young', 'Angus.Young@mycompany.org');

INSERT INTO employee_to_occupation (employee_id , occupation_id ) VALUES (
  (SELECT id FROM employee WHERE email LIKE 'Angus.Young@mycompany.org'),
  (SELECT id FROM occupation WHERE name_short LIKE 'Driver')
);

-- Add route
INSERT INTO route (name_short) VALUES ('Route 12011');

-- Add schedule
INSERT INTO schedule (name_short, schedule_cron ) VALUES ('Mon,Wed,Fri', '0 8 * * 1,3,5');

-- Create drive (schedule + driver + route)
INSERT INTO drive (employee_id , route_id , schedule_id ) VALUES (
	(SELECT id FROM employee WHERE email LIKE 'Angus.Young@mycompany.org'),
	(SELECT id FROM route WHERE name_short LIKE 'Route 12011'),
	(SELECT id FROM schedule WHERE name_short LIKE 'Mon,Wed,Fri')
);

-- get all currently working drivers
SELECT first_name, last_name, name_short, schedule_ts_start FROM (
  SELECT * FROM drive WHERE schedule_ts_start < NOW() AND schedule_ts_end > NOW()
) AS drives
  LEFT JOIN employee ON drives.employee_id = employee.id
  LEFT JOIN obj ON drives.obj_id = obj.id;

-- get all available drivers sorted by last name
SELECT last_name, first_name, name_short, "disable" FROM (SELECT id , name_short FROM occupation WHERE name_short LIKE 'Driver') AS a
  LEFT JOIN employee_to_occupation ON employee_to_occupation.occupation_id = a.id
  LEFT JOIN employee ON employee.id = employee_id AND employee.disable = false
  ORDER BY last_name;

-- get all available vehicles
SELECT obj.name_short, b.name_short FROM (
	SELECT obj_id, name_short FROM
		(SELECT id, name_short FROM obj_group WHERE name_short LIKE 'parkon') AS a
	LEFT JOIN obj_to_group ON a.id = obj_to_group.obj_group_id
) AS b
LEFT JOIN obj ON b.obj_id = obj.id
ORDER BY obj.name_short DESC;

-- update object group
UPDATE obj_group SET
  name_short = 'parkon_msk_zao'
WHERE
  name_short = 'parkon_new_group';

-- put total drives count to note column for each employee
UPDATE employee SET note =
  (SELECT count(*) FROM drive WHERE drive.employee_id = employee.id);

-- Clean obj_position table (remove all entries which are older than 30 days)
DELETE FROM obj_position WHERE ts < NOW() - interval '30 days';

-- Run safe clean for "employee" table
DELETE FROM employee WHERE employee.disable = True AND employee.id NOT IN (SELECT employee_id FROM drive);

-- Add company phone number to all employees with empty phone column
UPDATE employee SET phone_no = '+74991234567' FROM (
  SELECT * FROM employee WHERE employee.phone_no IS NULL AND employee.disable = False FOR UPDATE
) AS a;
