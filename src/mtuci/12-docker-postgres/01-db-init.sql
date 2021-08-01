-- create schema for the project
CREATE SCHEMA IF NOT EXISTS vkgis;

-- set schema as default
SET search_path TO vkgis;

-- create tables according to designed schemme
CREATE TABLE obj_geometry (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  geojson jsonb,
  length_mm int,
  width_mm int,
  height_mm int,
  note varchar NOT NULL
);

COMMENT ON TABLE obj_geometry IS 'Dimension data in millimeters and GeoJSON geometry';

COMMENT ON COLUMN obj_geometry.id IS 'Id';

COMMENT ON COLUMN obj_geometry.geojson IS 'Geometry as GeoJSON';

COMMENT ON COLUMN obj_geometry.note IS 'Optional note to simplify searching for existing geometries';

COMMENT ON COLUMN obj_geometry.length_mm IS 'Object length (mm)';

COMMENT ON COLUMN obj_geometry.width_mm IS 'Object width (mm)';

COMMENT ON COLUMN obj_geometry.height_mm IS 'Object height (mm)';

CREATE TABLE obj_group (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  name_short varchar(32),
  note varchar,
  left_key int NOT NULL,
  right_key int NOT NULL
);

COMMENT ON TABLE obj_group IS 'List of all available object types';

COMMENT ON COLUMN obj_group.name_short IS 'Group unique name';

COMMENT ON COLUMN obj_group.note IS 'Group note';

COMMENT ON COLUMN obj_group.left_key IS 'Nested Sets: left key';

COMMENT ON COLUMN obj_group.right_key IS 'Nested Sets: right key';

CREATE TABLE obj (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  obj_geometry_id int REFERENCES obj_geometry (id),
  disable boolean NOT NULL DEFAULT FALSE,
  name_short varchar(32) NOT NULL,
  note varchar,
  properties jsonb
);

COMMENT ON TABLE obj IS 'Real-world objects';

COMMENT ON COLUMN obj.obj_geometry_id IS 'Object geometry';

COMMENT ON COLUMN obj.disable IS 'Use disable: true if object should be ignored for some reason';

COMMENT ON COLUMN obj.name_short IS 'Object display name';

COMMENT ON COLUMN obj.note IS 'Object note';

COMMENT ON COLUMN obj.properties IS 'Constant untyped object attributes';

CREATE TABLE obj_to_group (
  obj_id int REFERENCES obj (id),
  obj_group_id int REFERENCES obj_group (id),
  PRIMARY KEY (obj_id, obj_group_id)
);

COMMENT ON TABLE obj_to_group IS 'Object to group relations';

COMMENT ON COLUMN obj_to_group.obj_id IS 'Object id';

COMMENT ON COLUMN obj_to_group.obj_group_id IS 'Object group id';

-- TODO: temporary solution, i expect performance issues on highload
CREATE TABLE obj_position (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  ts timestamptz NOT NULL,
  obj_id int REFERENCES obj (id) NOT NULL,
  -- TODO: Double precision may be better, should check that
  lat real NOT NULL,
  lng real NOT NULL,
  alt real
);

COMMENT ON TABLE obj_position IS 'Geo position time-serie';

COMMENT ON COLUMN obj_position.id IS 'Object position ID';

COMMENT ON COLUMN obj_position.ts IS 'Timestamp (UTC)';

COMMENT ON COLUMN obj_position.obj_id IS 'Related object';

COMMENT ON COLUMN obj_position.lat IS 'Latitude';

COMMENT ON COLUMN obj_position.lng IS 'Longitude';

COMMENT ON COLUMN obj_position.alt IS 'Altitude';

CREATE TABLE schedule (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  schedule_cron varchar NOT NULL,
  name_short varchar(32) NOT NULL,
  note varchar,
  disable boolean NOT NULL DEFAULT FALSE
);

COMMENT ON TABLE schedule IS 'Schedule table';

COMMENT ON COLUMN schedule.id IS 'Schedule Id';

COMMENT ON COLUMN schedule.name_short IS 'Schedule name';

COMMENT ON COLUMN schedule.note IS 'Description';

COMMENT ON COLUMN schedule.schedule_cron IS 'Use CRON string to define when event should happen';

CREATE TABLE employee (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  middle_name varchar,
  schedule_id int REFERENCES schedule (id),
  email varchar UNIQUE,
  phone_no varchar,
  disable boolean NOT NULL DEFAULT FALSE,
  note varchar
);

COMMENT ON TABLE employee IS 'Eployee contains all managable human resources';

COMMENT ON COLUMN employee.first_name IS 'First name';

COMMENT ON COLUMN employee.last_name IS 'Last name';

COMMENT ON COLUMN employee.middle_name IS 'Middle name';

COMMENT ON COLUMN employee.schedule_id IS 'Working schedule';

COMMENT ON COLUMN employee.email IS 'Email';

COMMENT ON COLUMN employee.phone_no IS 'Phone number';

COMMENT ON COLUMN employee.disable IS 'Disable employee instead of deletion';

COMMENT ON COLUMN employee.note IS 'Notes';

CREATE TABLE occupation (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  name_short varchar(32) NOT NULL,
  note varchar,
  disable boolean NOT NULL DEFAULT FALSE
);

COMMENT ON TABLE occupation IS 'All available duties (jobs)';

COMMENT ON COLUMN occupation.name_short IS 'Occupation name';

COMMENT ON COLUMN occupation.note IS 'Notes';

COMMENT ON COLUMN occupation.disable IS 'Archived occupations';

CREATE TABLE employee_to_occupation (
  employee_id int REFERENCES employee (id) ON DELETE CASCADE,
  occupation_id int REFERENCES occupation (id) ON DELETE CASCADE,
  PRIMARY KEY (employee_id, occupation_id)
);

COMMENT ON TABLE employee_to_occupation IS 'Employee may have multiple jobs. So we bind employees to duties with this table.';

COMMENT ON COLUMN employee_to_occupation.employee_id IS 'Employee';

COMMENT ON COLUMN employee_to_occupation.occupation_id IS 'Occupation';

CREATE TABLE route (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  name_short varchar(32) NOT NULL,
  obj_geometry_id int REFERENCES obj_geometry (id),
  note varchar,
  disable boolean NOT NULL DEFAULT FALSE
);

COMMENT ON TABLE route IS 'Route with geometry';

COMMENT ON COLUMN route.name_short IS 'Short name';

COMMENT ON COLUMN route.obj_geometry_id IS 'Geomtry';

COMMENT ON COLUMN route.note IS 'Notes';

COMMENT ON COLUMN route.disable IS 'Disable instead of deletion';

CREATE TABLE drive (
  id int PRIMARY KEY GENERATED always AS IDENTITY,
  employee_id int REFERENCES employee (id) NOT NULL,
  obj_id int REFERENCES obj (id),
  route_id int REFERENCES route (id),
  schedule_id int REFERENCES schedule (id),
  schedule_ts_start timestamptz NOT NULL DEFAULT NOW(),
  schedule_ts_end timestamptz NOT NULL DEFAULT NOW() + interval '1' day
);

COMMENT ON TABLE drive IS 'Drive is a scheduled event wich utilize employee and obj (vehicle) resources';

COMMENT ON COLUMN drive.employee_id IS 'Employee';

COMMENT ON COLUMN drive.obj_id IS 'Assigned vehicle';

COMMENT ON COLUMN drive.route_id IS 'Assigned route';

COMMENT ON COLUMN drive.schedule_id IS 'Schedule';

COMMENT ON COLUMN drive.schedule_ts_start IS 'drive start ts (UTC)';

COMMENT ON COLUMN drive.schedule_ts_end IS 'drive end ts (UTC)';

