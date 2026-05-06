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

--Insert sample values into the career table, with some null values to test if it is allowed in the schema (it should be.)
INSERT INTO career_info VALUES
    ("Plumbing",  NULL,"Trade school"),
    ("Computer Science",  NULL,"Bachelor's Degree"),
    ("Nuclear Engineering",  NULL, "Master's Degree"),
    ("Security",  NULL, "Certification"),
    ("Graphic Design",  NULL, "Bachelor's Degree");

