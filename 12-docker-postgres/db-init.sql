-- create schema for the project
CREATE SCHEMA IF NOT EXISTS vkgis;

-- create tables according to designed schemme
-- use serial type instead of "integer not null default nextval('some_sequence')"

CREATE TABLE vkgis.obj_geometry (
  id serial PRIMARY KEY,
  geometry jsonb,
  length_mills int,
  width_mills int,
  height_mills int
);

CREATE TABLE vkgis.obj_type (
  id serial PRIMARY KEY,
  static boolean NOT NULL DEFAULT TRUE,
  name varchar NOT NULL,
  obj_geometry_id int REFERENCES obj_geometry (id),
  note varchar
);

CREATE TABLE vkgis.obj (
  id serial PRIMARY KEY,
  obj_type_id int REFERENCES obj_type (id) NOT NULL,
  name varchar NOT NULL,
  note varchar
);

-- todo: temporary solution, i expect performance issues on highload
CREATE TABLE vkgis.obj_position (
  id serial PRIMARY KEY,
  ts timestamptz NOT NULL,
  obj_id int REFERENCES obj (id) NOT NULL,
  lat real NOT NULL,
  lng real NOT NULL,
  alt real
);

CREATE TABLE vkgis.employee (
  id serial PRIMARY KEY,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  middle_name varchar,
  email varchar,
  phone_no varchar
);

CREATE TABLE vkgis.duty (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  note varchar NOT NULL
);

CREATE TABLE vkgis.employee_to_duty (
  employee_id int REFERENCES employee (id),
  duty_id int REFERENCES duty (id)
);

CREATE TABLE vkgis.schedule (
  id serial PRIMARY KEY,
  repeat varchar,
  exclude varchar,
  name varchar,
  note varchar
);

CREATE TABLE vkgis.schedule_to_employee (
  schedule_id int REFERENCES schedule (id),
  employee_id int REFERENCES employee (id)
);

CREATE TABLE vkgis.drive (
  id serial PRIMARY KEY,
  employee_id int REFERENCES employee (id),
  obj_id int REFERENCES obj (id)
);

