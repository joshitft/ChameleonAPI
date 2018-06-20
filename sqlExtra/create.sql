
 CREATE TABLE `chameleon`.`profile` (
  `id` INT NOT NULL,
  `alias` VARCHAR(250) NOT NULL,
  `first_name` VARCHAR(250) NOT NULL,
  `last_name` VARCHAR(250) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `cellular_number` VARCHAR(250) NOT NULL,
  `country` VARCHAR(250) NOT NULL,
  `city` VARCHAR(250) NOT NULL,
  `zip_code` VARCHAR(250) NOT NULL,
  `industry` VARCHAR(250) NOT NULL,
  `current_position` VARCHAR(250) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `removed_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);


