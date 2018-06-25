#for profiles dummy data

INSERT INTO `chameleon`.`profiles`
(`id` ,`alias` ,`firstName`,`lastName`,`gender`,`email`,`cellularNumber`,`country`,`city`,`zipCode`,`industry`,`currentPosition`,`createdAt`,`updatedAt`)
VALUES
("1","user1","f_name1","l_name1","male","user1@yahoo.com","999999991","india","pune","471105","I.T","developer","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`profiles`
(`id` ,`alias` ,`firstName`,`lastName`,`gender`,`email`,`cellularNumber`,`country`,`city`,`zipCode`,`industry`,`currentPosition`,`createdAt`,`updatedAt`)
VALUES
("2","user2","f_name2","l_name2","female","user2@yahoo.com","999999992","nepal","kathmandu","784851","I.T","support","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`profiles`
(`id` ,`alias` ,`firstName`,`lastName`,`gender`,`email`,`cellularNumber`,`country`,`city`,`zipCode`,`industry`,`currentPosition`,`createdAt`,`updatedAt`)
VALUES
("3","user3","f_name3","l_name3","male","user3@yahoo.com","999999993","india","dehradun","248002","Management","HR","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`profiles`
(`id` ,`alias` ,`firstName`,`lastName`,`gender`,`email`,`cellularNumber`,`country`,`city`,`zipCode`,`industry`,`currentPosition`,`createdAt`,`updatedAt`)
VALUES
("4","user4","f_name4","l_name4","female","user4@yahoo.com","999999994","china","fushan","84821","Management","Executive","2018-06-15 03:14:07 ","2018-06-15 03:14:07"); 

INSERT INTO `chameleon`.`profiles`
(`id` ,`alias` ,`firstName`,`lastName`,`gender`,`email`,`cellularNumber`,`country`,`city`,`zipCode`,`industry`,`currentPosition`,`createdAt`,`updatedAt`)
VALUES
("5","user5","f_name5","l_name5","male","user5@yahoo.com","999999995","america","california","21214","Marketing","senior head","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

#for posts
INSERT INTO `chameleon`.`posts`
(`id` ,`profileId`,`content`,`imageLink`,`createdAt`,`updatedAt`)
VALUES
("1","1","superb prformance by brasil","./postImages/brasil.jpg","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`posts`
(`id` ,`profileId`,`content`,`imageLink`,`createdAt`,`updatedAt`)
VALUES
("2","2","superb prformance by brasil","./postImages/brasil.jpg","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`posts`
(`id` ,`profileId`,`content`,`imageLink`,`createdAt`,`updatedAt`)
VALUES
("3","3","superb prformance by Argentina","./postImages/argentina.jpg","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`posts`
(`id` ,`profileId`,`content`,`imageLink`,`createdAt`,`updatedAt`)
VALUES
("4","4","superb prformance by brasil","./postImages/brasil.jpg","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

#for comments
INSERT INTO `chameleon`.`comments`
(`id` ,`postId`,`profileId`,`content`,`createdAt`,`updatedAt`)
VALUES
("1","1","2","yes indeed","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`comments`
(`id` ,`postId`,`profileId`,`content`,`createdAt`,`updatedAt`)
VALUES
("2","3","1","no brasil was better","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

#for reactionTypes
INSERT INTO `chameleon`.`reactionTypes`
(`id` ,`name`,`createdAt`,`updatedAt`)
VALUES
("1","like","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

#for postReactions
INSERT INTO `chameleon`.`postReactions`
(`id` ,`postId`,`profileId`,`reactionTypeId`,`createdAt`,`updatedAt`)
VALUES
("1","1","2","1","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 

INSERT INTO `chameleon`.`postReactions`
(`id` ,`postId`,`profileId`,`reactionTypeId`,`createdAt`,`updatedAt`)
VALUES
("2","1","4","1","2018-06-15 03:14:07 ","2018-06-15 03:14:07 "); 


#for followings dummy data

INSERT INTO `chameleon`.`followings`
(`id` ,`following` ,`follower`)
VALUES
(1,1,2,NOW(),NOW());

INSERT INTO `chameleon`.`followings`
(`id` ,`following` ,`follower`,`createdAt`,`updatedAt`)
VALUES
(2,2,1,NOW(),NOW());