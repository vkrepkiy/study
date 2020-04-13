-- generate some object geometries
INSERT INTO vkgis.obj_geometry ("length_mm", "width_mm", "height_mm")
  VALUES (4384, 1927, 1465), (8210, 2210, 2550), (5540, 2380, 2200);

-- generate a lot of fake object types
INSERT INTO vkgis.obj_type ("name")
SELECT
  'obj_type_' || seq
FROM
  GENERATE_SERIES(1, 10) seq;

-- generate some familiar object types
INSERT INTO vkgis.obj_type ("name", obj_geometry_id)
  VALUES ('parkon', 1), ('tow truck', 2), ('police', 1), ('ambulance', 3), ('building', NULL);

--- create objects
INSERT INTO vkgis.obj (obj_type_id, name)
SELECT
  random() * 14 + 1,
  'obj_' || seq
FROM
  generate_series(1, 10001) seq;

-- generate object positions
INSERT INTO vkgis.obj_position (lat, lng, ts, obj_id)
SELECT
  55 + random(),
  56 + random(),
  gs::timestamptz,
  random() * 10000 + 1
FROM
  generate_series('2020-01-01', '2020-04-13', interval '1 minute') AS gs;

-- create occupations
INSERT INTO vkgis.occupation (name)
  VALUES ('Sysadmin'), ('Driver'), ('Operator'), ('Chief security officer'), ('Junior security officer');

-- create employees
INSERT INTO vkgis.employee (first_name, last_name)
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
INSERT INTO vkgis.employee_to_occupation (employee_id, occupation_id)
SELECT
  seq,
  random() * 4 + 1
FROM
  generate_series(1, 100) AS seq;

-- schedules
INSERT INTO vkgis.schedule (repeat, name)
  VALUES ('0 12 * * 1-5', '5/2 working week'), ('0 09 */2 * *', '2/2 schedule');

-- drive
INSERT INTO vkgis.drive (obj_id, employee_id, schedule_id)
SELECT
  random() * 10000 + 1,
  random() * 99 + 1,
  random() + 1
FROM
  generate_series('2020-01-01', '2020-04-13', interval '1 day') AS gs;

