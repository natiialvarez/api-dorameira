 CREATE DATABASE api_dorameira

CREATE TABLE doramas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    summary TEXT,
    release_date DATE,
    episode INT
);

INSERT INTO doramas (name, summary, release_date, episode_count) VALUES
('Boys Over Flowers', 'A poor girl attends an elite high school and is terrorized by the leader of the F4 clique.', '2009-01-05', 25),
('My Love from the Star', 'An alien who landed on Earth 400 years ago falls in love with a top actress.', '2013-12-18', 21),
('Descendants of the Sun', 'A love story between a special forces captain and a surgeon in a war-torn country.', '2016-02-24', 16),
('Goblin', 'A lonely immortal goblin seeks to end his cursed existence with the help of a human bride.', '2016-12-02', 16),
('Crash Landing on You', 'A South Korean heiress accidentally lands in North Korea and falls in love with an army officer.', '2019-12-14', 16),
('Itaewon Class', 'A young man seeks revenge on a powerful corporation after his father dies in a tragic accident.', '2020-01-31', 16),
('The King: Eternal Monarch', 'A king crosses into a parallel universe in search of his doppelganger and true love.', '2020-04-17', 16),
('Hospital Playlist', 'Five doctors who have been friends since medical school work together at the same hospital.', '2020-03-12', 12),
('Start-Up', 'Young entrepreneurs compete in the world of start-ups as they pursue their dreams and romance.', '2020-10-17', 16),
('Vincenzo', 'An Italian lawyer and Mafia consigliere seeks revenge in South Korea with the help of a resourceful tenant.', '2021-02-20', 20);

ALTER TABLE doramas ADD COLUMN where_to_watch VARCHAR(255);

UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Boys Over Flowers';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'My Love from the Star';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Descendants of the Sun';
UPDATE doramas SET where_to_watch = 'Viki' WHERE name = 'Goblin';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Crash Landing on You';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Itaewon Class';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'The King: Eternal Monarch';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Hospital Playlist';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Start-Up';
UPDATE doramas SET where_to_watch = 'Netflix' WHERE name = 'Vincenzo';

ALTER TABLE doramas
ADD CONSTRAINT unique_dorama_name UNIQUE (name);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_birth DATE,
    watched_dorama_name TEXT REFERENCES doramas(name),
    registered_dorama_name TEXT REFERENCES doramas(name)
);

INSERT INTO users (name, email, password, date_of_birth)
VALUES ('John Doe', 'john.doe@example.com', '123456', '1990-01-01');

ALTER TABLE doramas
ADD COLUMN added_by_user_id INT,
ADD CONSTRAINT fk_added_by_user
FOREIGN KEY (added_by_user_id) REFERENCES users(id);

ALTER TABLE doramas
ADD COLUMN add_by_user_email VARCHAR(255);