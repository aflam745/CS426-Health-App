-- schema.sql

-- 1. Users
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  phone         VARCHAR(20),
  date_of_birth DATE NOT NULL,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2.a Metric types
CREATE TABLE metric_types (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL
             REFERENCES users(id) ON DELETE CASCADE,
  name       VARCHAR(100) NOT NULL,
  unit       VARCHAR(50),     
  goal       NUMERIC,          
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, name)
);

-- 2.b Metric entries
CREATE TABLE metric_entries (
  id             SERIAL PRIMARY KEY,
  metric_type_id INT NOT NULL
                 REFERENCES metric_types(id) ON DELETE CASCADE,
  entry_date     DATE    NOT NULL,
  value          NUMERIC NOT NULL,
  note           TEXT,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Prescriptions
CREATE TABLE prescriptions (
  id                 SERIAL PRIMARY KEY,
  user_id            INT NOT NULL
                      REFERENCES users(id) ON DELETE CASCADE,
  name               VARCHAR(200) NOT NULL,
  dosage             VARCHAR(100),
  frequency          VARCHAR(100),
  supply_remaining   INT,
  next_refill_date   DATE,
  prescribing_doctor VARCHAR(200),
  pharmacy           VARCHAR(200),
  instructions       TEXT,
  created_at         TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at         TIMESTAMP WITH TIME ZONE DEFAULT now()
);
