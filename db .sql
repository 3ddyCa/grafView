CREATE DATABASE IF NOT EXISTS meteoNews CHARSET utf8mb4;
USE meteoNews;

CREATE TABLE IF NOT EXISTS city_datas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) UNIQUE NOT NULL,
    latitue VARCHAR(50) UNIQUE NOT NULL,
    longitude VARCHAR(50) UNIQUE NOT NULL,
    elevation VARCHAR(50) NOT NULL
)ENGINE=innoDB;

CREATE TABLE IF NOT EXISTS today(
    id INT PRIMARY KEY AUTO_INCREMENT,
    currentDate DATETIME UNIQUE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    TC DECIMAL UNIQUE NOT NULL,
    TCmax DECIMAL UNIQUE NOT NULL,
    TCmin DECIMAL NOT NULL,
    sunrise VARCHAR(50) NOT NULL,
    sunset VARCHAR(50) NOT NULL,
    pressure DECIMAL NOT NULL,
    humidity VARCHAR(50) NOT NULL,
    fk_city INT NOT NULL
    ADD CONSTRAINT fk_meteoJour_city_datas FOREIGN KEY (fk_city) REFERENCES city_datas(id) ON DELETE CASCADE;
)ENGINE=innoDB;

CREATE VIEW IF NOT EXISTS vw_currentCity AS
SELECT cd.id, `name`, latitude, longitude, elevation, 
td.id, currentDate, TC, TCmax, TCmin, sunrise, sunset, presure, humidity FROM city_datas cd INNER JOIN today td ON cd.id = td.fk_city;

CREATE VIEW IF NOT EXISTS vw_weekCity AS
SELECT cd.id, `name`, latitude, longitude, elevation, 
GROUP_CONCAT(CONCAT(td.id, currentDate, TC, TCmax, TCmin, sunrise, sunset, presure, humidity) SEPARATOR ' | ') FROM city_datas cd INNER JOIN today td ON cd.id = td.fk_city GROUP BY cd.id ORDER BY td.id DESC LIMIT 7;