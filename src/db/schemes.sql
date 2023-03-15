CREATE TABLE Users (
  id           INT           NOT NULL   AUTO_INCREMENT,
  firstName    VARCHAR(255)  NOT NULL,
  secondName   VARCHAR(255)  NOT NULL,
  email        VARCHAR(255)  NOT NULL,
  telegramId   INT,
  PRIMARY KEY (id)
);

CREATE TABLE Tokens (
  id           INT           NOT NULL   AUTO_INCREMENT,
	token				 VARCHAR(255)  NOT NULL,
  userId      INT            NOT NULL,
  PRIMARY KEY (id),
  KEY (userId)
);

CREATE TABLE CountableEntities (
  id           INT           NOT NULL   AUTO_INCREMENT,
  userId      INT            NOT NULL,
  name         VARCHAR(255)  NOT NULL,
	init         INT					 NOT NULL   DEFAULT 0,
	result			 INT           NOT NULL   DEFAULT 0,
  PRIMARY KEY (id),
  KEY (userId)
);

CREATE TABLE Operations (
  id           INT           NOT NULL   AUTO_INCREMENT,
  created      TIMESTAMP     NOT NULL   DEFAULT NOW(),
  value        INT           NOT NULL,
	type         CHAR(1)       NOT NULL,
  tickers      VARCHAR(255)  NOT NULL,
  information  VARCHAR(255)  DEFAULT "",
  userId      INT            NOT NULL,
  PRIMARY KEY (id),
  KEY (userId)
);
