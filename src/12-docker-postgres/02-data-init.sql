-- set schema as default
SET search_path TO vkgis;

-- generate some object geometries
INSERT INTO obj_geometry (length_mm, width_mm, height_mm, note)
  VALUES (4384, 1927, 1465, 'volkswagen polo'), (8210, 2210, 2550, 'evakuator'), (5540, 2380, 2200, 'Skoraya pomosh');

-- generate some familiar object types
INSERT INTO obj_group (name_short, left_key, right_key)
  VALUES ('parkon', '1', '2'), ('tow truck', '3', '4'), ('police', '5', '6'), ('ambulance', '7', '8'), ('building', '9', '10');

--- create objects
INSERT INTO obj (name_short)
SELECT
  'obj_' || seq
FROM
  generate_series(1, 10001) seq;

-- obj to group
INSERT INTO obj_to_group (obj_id, obj_group_id)
SELECT
  seq,
  random() * 4 + 1
FROM
  generate_series(1, 10001) seq;

-- generate object positions
INSERT INTO obj_position (lat, lng, ts, obj_id)
SELECT
  55 + random(),
  56 + random(),
  gs::timestamptz,
  random() * 10000 + 1
FROM
  generate_series('2020-01-01', '2020-04-13', interval '1 minute') AS gs;

-- create occupations
INSERT INTO occupation (name_short)
  VALUES ('Sysadmin'), ('Driver'), ('Operator'), ('Chief security officer'), ('Junior security officer');

-- create employees
INSERT INTO employee (first_name, last_name)
SELECT
  (
    CASE (RANDOM() * 2)::int
    WHEN 0 THEN
      'Sergey'
    WHEN 1 THEN
      'Pavel'
    WHEN 2 THEN
      'John'
    END) AS firstname,
  (
    CASE (RANDOM() * 2)::int
    WHEN 0 THEN
      'Sidorenko'
    WHEN 1 THEN
      'Stocky'
    WHEN 2 THEN
      'Fahritdinov'
    END) AS lastname
FROM
  generate_series(1, 100);

-- employee to occupation
INSERT INTO employee_to_occupation (employee_id, occupation_id)
SELECT
  seq,
  random() * 4 + 1
FROM
  generate_series(1, 100) AS seq;

-- schedules
INSERT INTO schedule (schedule_cron, name_short)
  VALUES ('0 12 * * 1-5', '5/2 working week'), ('0 09 */2 * *', '2/2 schedule');

-- drive
INSERT INTO drive (obj_id, employee_id, schedule_id)
SELECT
  random() * 10000 + 1,
  random() * 99 + 1,
  random() + 1
FROM
  generate_series('2020-01-01', '2020-04-13', interval '1 day') AS gs;

