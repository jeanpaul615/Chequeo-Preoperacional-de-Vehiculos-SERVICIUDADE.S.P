DROP DATABASE IF EXISTS vehicle_inspection;

CREATE DATABASE vehicle_inspection 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE vehicle_inspection;

CREATE TABLE `user`(
    `user_id` SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(60) NOT NULL UNIQUE,
    `hashed_password` VARCHAR(120) NOT NULL,
    `role` ENUM ('ADMIN', 'AUDITOR', 'CONDUCTOR') NOT NULL,
    `status` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
    `updated_at` DATETIME DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `driver`(
    `driver_id` SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` SMALLINT UNSIGNED,
    `name` VARCHAR(40) NOT NULL,
    `license_until` DATE NOT NULL,
    `seguridad_social_until` DATE NOT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE token (
    `user_id` SMALLINT UNSIGNED,
    `token` VARCHAR(255),
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (`user_id`, `token`),
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE vehicle (
    `vehicle_id` SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `type` ENUM ('RECOLECTOR', 'VOLQUETA', 'LIVIANO', 'OTRO') NOT NULL,
    `license_plate` CHAR(6) NOT NULL,
    `brand` VARCHAR(20) NOT NULL,
    `area` ENUM ('ASEO', 'ACUEDUCTO', 'ALCANTARILLADO', 'OTRO'),
    `soat_until` DATE NOT NULL,
    `rtm_until` DATE NOT NULL,
    `seguro_contractual_until` DATE NOT NULL,
    `seguro_extracontractual_until` DATE NOT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE inspection (
    `inspection_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `driver_id` SMALLINT UNSIGNED NOT NULL,
    `vehicle_id` SMALLINT UNSIGNED,
    `mileage` INT UNSIGNED NOT NULL,
    `comment` TEXT DEFAULT NULL,
    `checked_by` VARCHAR(40) DEFAULT NULL,
    `audited_by` VARCHAR(40) DEFAULT NULL,
    `is_checked` tinyint(1) DEFAULT 0,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    FOREIGN KEY (`driver_id`) REFERENCES driver(`driver_id`),
    FOREIGN KEY (`vehicle_id`) REFERENCES vehicle(`vehicle_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE parameter (
    `parameter_id` SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    `type` ENUM(
        'NIVELES',
        'INSTRUMENTOS',
        'VIDRIOS',
        'LUCES',
        'REVISION INTERNA',
        'OTROS',
        'LLANTAS',
        'VIAL',
        'COMPACTADOR',
        'CONDUCTOR'
    ) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE vehicle_condition (
    `condition_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `inspection_id` INT UNSIGNED,
    `parameter_id` SMALLINT UNSIGNED,
    `condition` ENUM ('BIEN', 'MAL', 'NO APLICA'),
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    FOREIGN KEY (`inspection_id`) REFERENCES inspection(`inspection_id`),
    FOREIGN KEY (`parameter_id`) REFERENCES parameter(`parameter_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
