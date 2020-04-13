-- create schema for the project
CREATE SCHEMA IF NOT EXISTS vkgis;

-- create tables according to designed schemme
CREATE TABLE vkgis.obj_geometry (
  id serial PRIMARY KEY,
  geometry jsonb,
  length_mm int,
  width_mm int,
  height_mm int
);

COMMENT ON TABLE vkgis.obj_geometry IS 'Dimension data in millimeters and GeoJSON geometry';

COMMENT ON COLUMN vkgis.obj_geometry.id IS 'Use SERIAL type for PK. It is an alias for: integer not null default nextval("seq")';

CREATE TABLE vkgis.obj_type (
  id serial PRIMARY KEY,
  static boolean NOT NULL DEFAULT TRUE,
  name varchar NOT NULL UNIQUE,
  obj_geometry_id int REFERENCES vkgis.obj_geometry (id),
  note varchar
);

COMMENT ON TABLE vkgis.obj_type IS 'List of all available object types';

COMMENT ON COLUMN vkgis.obj_type.static IS 'Static objects have no telemetry for geo position';

COMMENT ON COLUMN vkgis.obj_type.name IS 'Entry visible name';

COMMENT ON COLUMN vkgis.obj_type.note IS 'Entry visible note';

CREATE TABLE vkgis.obj (
  id serial PRIMARY KEY,
  obj_type_id int REFERENCES vkgis.obj_type (id) NOT NULL,
  disable boolean NOT NULL DEFAULT FALSE,
  name varchar NOT NULL,
  note varchar,
  properties jsonb
);

COMMENT ON TABLE vkgis.obj IS 'Real-world objects';

COMMENT ON COLUMN vkgis.obj.obj_type_id IS 'Main attribute wich describes object';

COMMENT ON COLUMN vkgis.obj.disable IS 'Use disable: true if object should be ignored for some reason';

COMMENT ON COLUMN vkgis.obj.properties IS 'Constant untyped object attributes';

-- TODO: temporary solution, i expect performance issues on highload
CREATE TABLE vkgis.obj_position (
  id serial PRIMARY KEY,
  ts timestamptz NOT NULL,
  obj_id int REFERENCES vkgis.obj (id) NOT NULL,
  -- TODO: Double precision may be better, should check that
  lat real NOT NULL,
  lng real NOT NULL,
  alt real
);

COMMENT ON TABLE vkgis.obj_position IS 'Geo position time-serie';

COMMENT ON COLUMN vkgis.obj_position.ts IS 'Timestamp (timezone required)';

COMMENT ON COLUMN vkgis.obj_position.obj_id IS 'Data should be binded to existing object';

COMMENT ON COLUMN vkgis.obj_position.lat IS 'Latitude';

COMMENT ON COLUMN vkgis.obj_position.lng IS 'Longitude';

COMMENT ON COLUMN vkgis.obj_position.alt IS 'Altitude';

CREATE TABLE vkgis.employee (
  id serial PRIMARY KEY,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  middle_name varchar,
  email varchar UNIQUE,
  phone_no varchar UNIQUE
);

COMMENT ON TABLE vkgis.employee IS 'Eployee contains all managable human resources';

CREATE TABLE vkgis.occupation (
  id serial PRIMARY KEY,
  name varchar NOT NULL UNIQUE,
  note varchar
);

COMMENT ON TABLE vkgis.occupation IS 'All available duties (jobs)';

CREATE TABLE vkgis.employee_to_occupation (
  employee_id int REFERENCES vkgis.employee (id),
  occupation_id int REFERENCES vkgis.occupation (id)
);

COMMENT ON TABLE vkgis.employee_to_occupation IS 'Employee may have multiple jobs. So we bind employees to duties with this table.';

CREATE TABLE vkgis.schedule (
  id serial PRIMARY KEY,
  repeat varchar NOT NULL,
  exclude varchar,
  name varchar NOT NULL,
  note varchar
);

COMMENT ON TABLE vkgis.schedule IS 'Schedule table';

COMMENT ON COLUMN vkgis.schedule.repeat IS 'Use CRON string to define when event should happen. Has lower priority than "exclude" column';

COMMENT ON COLUMN vkgis.schedule.exclude IS 'Use CRON string to define when event should not happen. Has higher priority than "repeat" column';

CREATE TABLE vkgis.drive (
  id serial PRIMARY KEY,
  schedule_id int REFERENCES vkgis.schedule (id),
  employee_id int REFERENCES vkgis.employee (id),
  obj_id int REFERENCES vkgis.obj (id)
);

COMMENT ON TABLE vkgis.drive IS 'Drive is a scheduled event wich utilize employee and obj (vehicle) resources';

