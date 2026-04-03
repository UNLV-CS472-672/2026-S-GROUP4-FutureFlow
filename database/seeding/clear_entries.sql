--Clear out information from the career, college, and degree information tables.
--The order is important; the junction tables need to be cleared out first because they rely on more basic tables.

DELETE FROM career_job_junction;
DELETE FROM user_course_junction;
DELETE FROM user_degree_junction;

DELETE FROM course_info;
DELETE FROM user_info;
DELETE FROM job_info;

DELETE FROM career_info;
DELETE FROM college_info;
DELETE FROM degree_info;   