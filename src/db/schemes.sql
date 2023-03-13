CREATE TABLE Users (
  id           INT           NOT NULL   AUTO_INCREMENT,
  firstName    VARCHAR(255)  NOT NULL,
  secondName   VARCHAR(255)  NOT NULL,
  email        VARCHAR(255)  NOT NULL,
  telegramId   INT,
  PRIMARY KEY (id)
);

CREATE TABLE Operations (
  id           INT           NOT NULL   AUTO_INCREMENT,
  value        INT           NOT NULL,
  tickers      VARCHAR(100)  NOT NULL,
  information  VARCHAR(100)  NOT NULL,
  created      TIMESTAMP     NOT NULL   DEFAULT NOW(),
  userId       INT           NOT NULL,
  PRIMARY KEY (id),
  KEY (userId)
);

CREATE TABLE SaveOperations (
  id           INT           NOT NULL   AUTO_INCREMENT,
  value        INT           NOT NULL,
  tickers      VARCHAR(100)  NOT NULL,
  information  VARCHAR(100)  NOT NULL,
  created      TIMESTAMP     NOT NULL   DEFAULT NOW(),
  userId       INT           NOT NULL,
  PRIMARY KEY (id),
  KEY (userId)
);
