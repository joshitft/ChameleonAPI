
 CREATE TABLE `chameleon`.`profiles` (
  `id` INT NOT NULL,
  `alias` VARCHAR(250) NOT NULL,
  `first_name` VARCHAR(250) NOT NULL,
  `last_name` VARCHAR(250) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `cellularNumber` VARCHAR(250) NOT NULL,
  `country` VARCHAR(250) NOT NULL,
  `city` VARCHAR(250) NOT NULL,
  `zip_code` VARCHAR(250) NOT NULL,
  `industry` VARCHAR(250) NOT NULL,
  `currentPosition` VARCHAR(250) NOT NULL,
  `removedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);


