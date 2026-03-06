
--Information about the college
CREATE TABLE college_info (
    college_name varchar(255) PRIMARY KEY,
    zipcode int(16)
);

--Information about a degree
CREATE TABLE degree_info (
    degree_name varchar(50) PRIMARY KEY,
    degree_type varchar(50) NOT NULL,
    field varchar(50)
);


--Information about a specific job listing
CREATE TABLE job_info (
    job_id int(32) PRIMARY KEY,
    job_location varchar(100),
    company varchar(255) NOT NULL,
    pay dec(16, 2) NOT NULL,
    job_title varchar(255) NOT NULL,
    job_type varchar(50) NOT NULL,
    duration varchar(50)
);


--Information about a broad career
CREATE TABLE career_info (
    career_name varchar(50) PRIMARY KEY,
    recommended_skills varchar(255) DEFAULT NULL,
    education varchar(50)
);

--This is how we link careers to being able to list out jobs.
--Lists of foreign keys are not a default capability
CREATE TABLE career_job_junction (
    career_name varchar(50) NOT NULL,
    job_id int(32) NOT NULL,
    PRIMARY KEY(career_name, job_id),
    CONSTRAINT fk_cn FOREIGN KEY(career_name) REFERENCES career_info(career_name),
    CONSTRAINT fk_ji FOREIGN KEY(job_id) REFERENCES job_info(job_id)
);


--Information about a course (college class)
CREATE TABLE course_info (
    course_id int(32) PRIMARY KEY,
    course_number varchar(50) NOT NULL,
    course_name varchar(255) NOT NULL,
    degree varchar(50),
    college varchar(255),
    CONSTRAINT fk_d FOREIGN KEY(degree) REFERENCES degree_info(degree_name),
    CONSTRAINT fk_c FOREIGN KEY(college) REFERENCES college_info(college_name)
);


--Contains all user info
--This is the one that stores the majority of information
CREATE TABLE user_info (
    user_id int(32) PRIMARY KEY,
    user_password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    zipcode int(16) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    user_resume varchar(255) DEFAULT NULL,
    user_transcript varchar(255) DEFAULT NULL,
    major varchar(50) DEFAULT NULL,
    survey_results varchar(255) DEFAULT NULL,
    level_education varchar(50) DEFAULT NULL,
    graduation_year int(16) DEFAULT NULL,
    experience varchar(500) DEFAULT NULL,
    college varchar(255) NULL,
    career_name varchar(50) NULL,
    CONSTRAINT fk_ci FOREIGN KEY(college) REFERENCES college_info(college_name),
    CONSTRAINT fk_cni FOREIGN KEY(career_name) REFERENCES career_info(career_name)
);


--Junction table to handle what courses a person is taking
CREATE TABLE user_course_junction (
    user_id int(32) NOT NULL,
    course_id int(32) NOT NULL,
    PRIMARY KEY(user_id, course_id),
    CONSTRAINT fk_ui FOREIGN KEY(user_id) REFERENCES user_info(user_id),
    CONSTRAINT fk_cij FOREIGN KEY(course_id) REFERENCES course_info(course_id)
);

--Junction table to handle past degrees
CREATE TABLE user_degree_junction (
    user_id int(32) NOT NULL,
    degree_name varchar(50) NOT NULL,
    PRIMARY KEY(user_id, degree_name),
    CONSTRAINT fk_uid FOREIGN KEY(user_id) REFERENCES user_info(user_id),
    CONSTRAINT fk_dn FOREIGN KEY(degree_name) REFERENCES degree_info(degree_name)
);
