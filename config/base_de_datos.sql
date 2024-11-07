CREATE database testing2;
USE testing2;

CREATE TABLE Year (
    year_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    year_value YEAR NOT NULL
);

CREATE TABLE Period (
    period_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    period_name VARCHAR(50) NOT NULL,
    year_id TINYINT unsigned NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (year_id) REFERENCES Year(year_id)
);

CREATE TABLE Parcial (
    parcial_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    period_id TINYINT UNSIGNED,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (period_id) REFERENCES Period(period_id)
);

CREATE TABLE Class (
    class_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    class_code CHAR(7),
    class_name VARCHAR(50) NOT NULL,
    class_active BOOLEAN default true,
);

CREATE TABLE Section (
    section_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    section_name VARCHAR(10) NOT NULL
);

CREATE TABLE Teacher (
    teacher_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    teacher_name VARCHAR(100) NOT NULL,
    teacher_active boolean default true
);

CREATE TABLE Career (
    career_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    career_name VARCHAR(100) NOT NULL
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
    class_name VARCHAR(50) NOT NULL,
    section_id TINYINT UNSIGNED,
    section_name VARCHAR(10) NOT NULL,
    parcial_id SMALLINT UNSIGNED,
    notes TEXT,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    FOREIGN KEY (class_id) REFERENCES Class(class_id),
    FOREIGN KEY (section_id) REFERENCES Section(section_id),
    FOREIGN KEY (parcial_id) REFERENCES Parcial(parcial_id)
);

CREATE TABLE GradesReportStatus (
    status_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE Responsible (
    responsible_id TINYINT PRIMARY KEY AUTO_INCREMENT,
    responsible_name VARCHAR(100) NOT NULL,
    responsible_rol VARCHAR(50),
    responsible_active boolean default true
);

CREATE TABLE GradesReport (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    schedule_id INT UNSIGNED,
    status_id TINYINT UNSIGNED,
    status_date DATE,
    responsible_id TINYINT,
    comments TEXT,
    FOREIGN KEY (schedule_id) REFERENCES ClassSchedule(schedule_id),
    FOREIGN KEY (status_id) REFERENCES GradesReportStatus(status_id),
    FOREIGN KEY (responsible_id) REFERENCES Responsible(responsible_id)
);

