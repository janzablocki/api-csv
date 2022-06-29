CREATE TABLE users(
  id serial PRIMARY KEY,
  first_name character varying(50),
  last_name character varying(50),
  email character varying(50) UNIQUE,
  role_description character varying(1000),
  team character varying(50)
);

CREATE TABLE teams(
  id serial PRIMARY KEY,
  team character varying(50) UNIQUE
);