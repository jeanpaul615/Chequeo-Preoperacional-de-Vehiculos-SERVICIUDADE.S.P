DROP DATABASE IF EXISTS vehicle_inspection;
CREATE DATABASE vehicle_inspection
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish2_ci;

USE vehicle_inspection;

CREATE TABLE user(
    user_id CHAR(30) NOT NULL COMMENT 'created with a random alphanumeric string',
    user_name VARCHAR(40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    
    
);
