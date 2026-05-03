

INSERT INTO college_info VALUES
    ("University of Nevada Las Vegas", 12345),
    ("University of Nevada Reno", 98765),
    ("College of Southern Nevada", 12346);

INSERT INTO degree_info VALUES
    ("Computer Science", "Bachelor's of Science", "Engineering"),
    ("Cardiology", "Master's of Medicine", "Medical"),
    ("Dance", "Associate's of Arts", "Fine Arts"),
    ("Nuclear Engineering", "Master's of Engineering", "Engineering"),
    ("Graphic Design", "Bachelor's of Arts", "Fine Arts"),
    ("Engineering", "Bachelor's of Science", "Engineering"),
    ("Mathematics", "Bachelor's of Science", "Mathematics");


INSERT INTO job_info VALUES
    (101, "Las Vegas", "ACME", 60000, "Data Scientist", "Full time",  NULL, NULL, NULL, NULL),
    (102, "Las Vegas", "ACME", 50000, "Graphic Designer", "Full time",  NULL,NULL, NULL, NULL),
    (103, "Las Vegas", "MSTS", 80000, "Security Officer", "Full time",  NULL, NULL, NULL, NULL),
    (104, "Las Vegas", "MSTS", 45000, "Associate in Information Technology", "Part time",  NULL, NULL, NULL, NULL),
    (105, "Livermore", "LLNL", 110000, "DevOps Engineer", "Full time",  NULL, NULL, NULL, NULL),
    (106, "Livermore", "LLNL", 100000, "Nuclear Engineer", "Full time",  NULL, NULL, NULL, NULL),
    (107, "North Las Vegas", "MSTS", 50000, "Pipefitter", "Full time", "5 years", NULL, NULL, NULL);

INSERT INTO career_info VALUES
    ("Plumbing",  NULL,"Trade school"),
    ("Computer Science",  NULL,"Bachelor's Degree"),
    ("Nuclear Engineering",  NULL, "Master's Degree"),
    ("Security",  NULL, "Certification"),
    ("Graphic Design",  NULL, "Bachelor's Degree");

INSERT INTO career_job_junction VALUES
    ("Plumbing", 7),
    ("Computer Science", 1),
    ("Computer Science", 4),
    ("Computer Science", 5),
    ("Nuclear Engineering", 6),
    ("Security", 3),
    ("Graphic Design", 2);


INSERT INTO course_info VALUES
    (1, "CS460", "Compilers", "Computer Science", "University of Nevada Las Vegas"),
    (2, "CS135", "Introduction to Programming", "Computer Science", "College of Southern Nevada"),
    (3, "MATH182", "Calculus 2", "Mathematics", "University of Nevada Reno"),
    (4, "EGG101", "Introduction to Engineering Ethics", "Engineering", "University of Nevada Las Vegas");

INSERT INTO user_info VALUES
    (1, "password123", "example@gmail.com", NULL,  NULL,  NULL,  NULL, NULL, "Computer Science",  NULL, "High School", 2026,  NULL, NULL, "University of Nevada Las Vegas", "Computer Science", NULL, NULL, NULL, TRUE, 10),
    (2, "example321", "email@yahoo.com", 89149, "7021234567",  NULL,  NULL, NULL, "Graphic Design",  NULL, "Bachlor's of Art", 2022,  NULL, NULL, "College of Southern Nevada", "Graphic Design", NULL, NULL, NULL, TRUE, 12),
    (3, "anotherpass", "something@myspace.com", 12345, "0987654321",  NULL,  NULL, NULL, "Nuclear Engineering",  NULL, "Master's Degree", 2011,  NULL, NULL, "University of Nevada Las Vegas", "Nuclear Engineering", NULL, NULL, NULL, FALSE, 11),
    (4, "placeholder", "johndoe@gmail.com", NULL,  NULL,  NULL,  NULL, "Plumbing",  NULL, NULL, "Trade School", 2020,  NULL, NULL, NULL, "Plumbing", NULL, NULL, NULL, FALSE, 27);

INSERT INTO user_course_junction VALUES
    (1, 1, "FALL24"),
    (1, 2, "FALL25"),
    (1, 3, "SPRING25"),
    (3, 3, "SUMMER25"),
    (3, 4, "SPRING26");

INSERT INTO user_degree_junction VALUES
    (1, "Computer Science"),
    (2, "Graphic Design"),
    (3, "Nuclear Engineering");