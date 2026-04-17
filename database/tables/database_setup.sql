
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
    job_id INT(32) PRIMARY KEY,
    job_location VARCHAR(100),
    company VARCHAR(255) NOT NULL,
    pay DEC(16, 2) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) NOT NULL,
    duration VARCHAR(50),
    job_description TEXT,
    extracted_skills JSON
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
    user_id INT(32) PRIMARY KEY,
    cognito_sub VARCHAR(36) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    zipcode INT(16) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    user_resume VARCHAR(255) DEFAULT NULL,
    user_transcript VARCHAR(255) DEFAULT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    major VARCHAR(50) DEFAULT NULL,
    survey_results VARCHAR(255) DEFAULT NULL,
    level_education VARCHAR(50) DEFAULT NULL,
    graduation_year INT(16) DEFAULT NULL,
    experience VARCHAR(500) DEFAULT NULL,
    college VARCHAR(255) NULL,
    career_name VARCHAR(50) NULL,
    skills JSON DEFAULT NULL,
    dark_mode BOOLEAN DEFAULT FALSE,
    text_size INT(16) DEFAULT 10,
    CONSTRAINT fk_ci FOREIGN KEY(college) REFERENCES college_info(college_name),
    CONSTRAINT fk_cni FOREIGN KEY(career_name) REFERENCES career_info(career_name)
);

CREATE TABLE skill_matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_sub VARCHAR(36) NOT NULL,
  job_id INT NOT NULL,
  match_score INT,
  matched_skills JSON,
  missing_skills JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_job FOREIGN KEY(job_id) REFERENCES job_info(job_id),
  CONSTRAINT fk_user_sub FOREIGN KEY (user_sub) REFERENCES user_info(cognito_sub),
  UNIQUE KEY unique_user_job (user_sub, job_id)
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
