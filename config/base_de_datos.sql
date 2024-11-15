CREATE database testing2;
USE testing2;

CREATE TABLE Year (
    year_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    year_value YEAR NOT NULL
);

CREATE TABLE Period (
    period_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    period_name VARCHAR(50) NOT NULL,
    year_id TINYINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (year_id) REFERENCES Year(year_id)
);

CREATE TABLE Parcial (
    parcial_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    parcial_name VARCHAR(50) NOT NULL,
    period_id TINYINT UNSIGNED,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (period_id) REFERENCES Period(period_id)
);

CREATE TABLE Class (
    class_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    class_code CHAR(7) UNIQUE NOT NULL ,
    class_name VARCHAR(50) UNIQUE NOT NULL,
    class_active BOOLEAN default true
);

CREATE TABLE Section (
    section_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    section_name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE Teacher (
    teacher_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    teacher_name VARCHAR(100) NOT NULL UNIQUE,
    teacher_email VARCHAR(50),
    teacher_active boolean default true
);

CREATE TABLE Career (
    career_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    career_name VARCHAR(100) NOT NULL UNIQUE,
    career_active boolean default true
);

CREATE TABLE TeacherCareer (
    teacher_id SMALLINT UNSIGNED,
    career_id TINYINT UNSIGNED,
    PRIMARY KEY (teacher_id, career_id),
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    FOREIGN KEY (career_id) REFERENCES Career(career_id)
);

CREATE TABLE ClassSchedule (
    schedule_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    teacher_id SMALLINT UNSIGNED,
    teacher_name VARCHAR(100) NOT NULL,
    class_id SMALLINT UNSIGNED,
    class_code CHAR(7),
    class_name VARCHAR(50) NOT NULL,
    section_id TINYINT UNSIGNED,
    section_name VARCHAR(10) NOT NULL,
    parcial_id SMALLINT UNSIGNED,
	parcial_name VARCHAR(50) NOT NULL,
    period_name VARCHAR(50) NOT NULL,
    year_name YEAR NOT NULL, 
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    FOREIGN KEY (class_id) REFERENCES Class(class_id),
    FOREIGN KEY (section_id) REFERENCES Section(section_id),
    FOREIGN KEY (parcial_id) REFERENCES Parcial(parcial_id)
);

/*Replace the responsible_rol from a varchar to an FK*/
CREATE TABLE Responsible (
    responsible_id TINYINT PRIMARY KEY AUTO_INCREMENT,
    responsible_name VARCHAR(100) NOT NULL,
    responsible_rol VARCHAR(50),
    responsible_active boolean default true
);

CREATE TABLE GradesReport (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    schedule_id INT UNSIGNED,
    status boolean default false,
    status_date DATE,
    responsible_id TINYINT,
    FOREIGN KEY (schedule_id) REFERENCES ClassSchedule(schedule_id),
    FOREIGN KEY (responsible_id) REFERENCES Responsible(responsible_id)
);

CREATE TABLE Classroom (
	classroom_id TINYINT PRIMARY KEY AUTO_INCREMENT,
    classroom_name VARCHAR(15) NOT NULL UNIQUE
);


/* Inserts*/

INSERT INTO career(career_name) VALUES
("ARQUITECTURA"),
("INGENIERIA EN INFOTECNOLOGIA"),
("DISEÑO DE INTERIORES"),
("INGENIERIA INDUSTRIAL"),
("INGENIERIA CIVIL"),
("FISICO-MATEMATICO"),
("UDAC");

INSERT INTO section(section_name) VALUES
("A-C"),
("B-C"),
("C-C"),
("D-C"),
("E-C"),
("F-C"),
("G-C"),
("H-C");


INSERT INTO Year (year_value) VALUES
(2020),
(2021),
(2022),
(2023),
(2024),
(2025),
(2026),
(2027),
(2028),
(2029),
(2030),
(2031),
(2032),
(2033),
(2034),
(2035),
(2036),
(2037),
(2038),
(2039),
(2040);

INSERT INTO Period (period_name, year_id, start_date, end_date) 
VALUES 
  ('I PERIODO', 5, '2024-01-02', '2024-04-30'),
  ('II PERIODO', 5, '2024-05-02', '2024-08-30'),
  ('III PERIODO', 5, '2024-09-01', '2024-12-30');


-- Parciales para el I PERIODO
INSERT INTO Parcial (parcial_name, period_id, start_date, end_date) 
VALUES
  ('I PARCIAL', 1, '2024-01-02', '2024-02-10'),
  ('II PARCIAL', 1, '2024-02-11', '2024-03-22'),
  ('III PARCIAL', 1, '2024-03-23', '2024-04-30');

-- Parciales para el II PERIODO
INSERT INTO Parcial (parcial_name, period_id, start_date, end_date) 
VALUES
  ('I PARCIAL', 2, '2024-05-02', '2024-06-11'),
  ('II PARCIAL', 2, '2024-06-12', '2024-07-22'),
  ('III PARCIAL', 2, '2024-07-23', '2024-08-30');

-- Parciales para el III PERIODO
INSERT INTO Parcial (parcial_name, period_id, start_date, end_date) 
VALUES
  ('I PARCIAL', 3, '2024-09-01', '2024-10-10'),
  ('II PARCIAL', 3, '2024-10-11', '2024-11-20'),
  ('III PARCIAL', 3, '2024-11-21', '2024-12-30');


