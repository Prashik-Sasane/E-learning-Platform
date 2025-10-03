CREATE DATABASE student;
use students;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    grade VARCHAR(50) NOT NULL,
    subjects JSON NOT NULL,
    goals JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE problems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(50),
    difficulty VARCHAR(20),
    points INT DEFAULT 10,
    solution TEXT
);

CREATE TABLE user_solved_problems (
    user_id INT,
    problem_id INT,
    PRIMARY KEY(user_id, problem_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(problem_id) REFERENCES problems(id)
);

CREATE TABLE badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    criteria VARCHAR(255)
);

CREATE TABLE user_badges (
    user_id INT,
    badge_id INT,
    PRIMARY KEY(user_id, badge_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(badge_id) REFERENCES badges(id)
);
