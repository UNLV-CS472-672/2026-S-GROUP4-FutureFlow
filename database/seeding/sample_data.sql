--Insert values into the college table. Zip codes are not accurate; just tests.

INSERT INTO college_info VALUES
    ("University of Nevada Las Vegas", 12345),
    ("University of Nevada Reno", 98765),
    ("College of Southern Nevada", 12346);

--Insert a few sample degree types into the degree information table.
INSERT INTO degree_info VALUES
    ("Computer Science", "Bachelor's of Science", "Engineering"),
    ("Cardiology", "Master's of Medicine", "Medical"),
    ("Dance", "Associate's of Arts", "Fine Arts"),
    ("Nuclear Engineering", "Master's of Engineering", "Engineering"),
    ("Graphic Design", "Bachelor's of Arts", "Fine Arts"),
    ("Engineering", "Bachelor's of Science", "Engineering"),
    ("Mathematics", "Bachelor's of Science", "Mathematics");

--Career and job link

INSERT INTO job_info VALUES
    (1, "Las Vegas", "ACME", 60000, "Data Scientist", "Full time",  NULL),
    (2, "Las Vegas", "ACME", 50000, "Graphic Designer", "Full time",  NULL),
    (3, "Las Vegas", "MSTS", 80000, "Security Officer", "Full time",  NULL),
    (4, "Las Vegas", "MSTS", 45000, "Associate in Information Technology", "Part time",  NULL),
    (5, "Livermore", "LLNL", 110000, "DevOps Engineer", "Full time",  NULL),
    (6, "Livermore", "LLNL", 100000, "Nuclear Engineer", "Full time",  NULL),
    (7, "North Las Vegas", "MSTS", 50000, "Pipefitter", "Full time", "5 years");

--Insert sample values into the career table, with some null values to test if it is allowed in the schema (it should be.)
INSERT INTO career_info VALUES
    ("Plumbing",  NULL,"Trade school"),
    ("Computer Science",  NULL,"Bachelor's Degree"),
    ("Nuclear Engineering",  NULL, "Master's Degree"),
    ("Security",  NULL, "Certification"),
    ("Graphic Design",  NULL, "Bachelor's Degree");

--Table that allows multiple jobs to connect to a career
INSERT INTO career_job_junction VALUES
    ("Plumbing", 7),
    ("Computer Science", 1),
    ("Computer Science", 4),
    ("Computer Science", 5),
    ("Nuclear Engineering", 6),
    ("Security", 3),
    ("Graphic Design", 2);


--Course information
INSERT INTO course_info VALUES
    (1, "CS460", "Compilers", "Computer Science", "University of Nevada Las Vegas"),
    (2, "CS135", "Introduction to Programming", "Computer Science", "College of Southern Nevada"),
    (3, "MATH182", "Calculus 2", "Mathematics", "University of Nevada Reno"),
    (4, "EGG101", "Introduction to Engineering Ethics", "Engineering", "University of Nevada Las Vegas");

--User information
INSERT INTO user_info VALUES
    (1, "password123", "example@gmail.com", NULL,  NULL,  NULL,  NULL, "Computer Science",  NULL, "High School", 2026,  NULL, "University of Nevada Las Vegas", "Computer Science"),
    (2, "example321", "email@yahoo.com", 89149, "7021234567",  NULL,  NULL, "Graphic Design",  NULL, "Bachlor's of Art", 2022,  NULL, "College of Southern Nevada", "Graphic Design"),
    (3, "anotherpass", "something@myspace.com", 12345, "0987654321",  NULL,  NULL, "Nuclear Engineering",  NULL, "Master's Degree", 2011,  NULL, "University of Nevada Las Vegas", "Nuclear Engineering"),
    (4, "placeholder", "johndoe@gmail.com", NULL,  NULL,  NULL,  NULL, "Plumbing",  NULL, "Trade School", 2020,  NULL, NULL, "Plumbing");

--Junction table that allows users to have multiple courses assigned to them
INSERT INTO user_course_junction VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (3, 3),
    (3, 4);

--Junction table that allows users to have multiple different degrees assigned to them.
INSERT INTO user_degree_junction VALUES
    (1, "Computer Science"),
    (2, "Graphic Design"),
    (3, "Nuclear Engineering");