-- export PATH=$PATH:/usr/local/mysql/bin/
-- mysql -u root -p

--crear base de datos
CREATE DATABASE IF NOT EXISTS aroma;

--ver las tablas de la base de datos
show databases;

--usar tabla
USE aroma

--crear tablas
CREATE TABLE mesas(
    NRO INT(6) NOT NULL,
    STATUS TINYINT(1),
    HORA VARCHAR(10),
    VENDE INT(6),
    NOMEUEN Varchar(23),
    ACUMULA FLOAT(10)
);

ALTER TABLE mesas
    ADD PRIMARY KEY (NRO);

INSERT INTO mesas values (1,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (2,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (3,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (4,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (5,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (6,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (7,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (8,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (9,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (10,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (11,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (12,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (13,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (14,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (15,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (16,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (17,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (18,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (19,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (20,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (21,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (22,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (23,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (24,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (25,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (26,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (27,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (28,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (29,0,'12:23',123,'nomeven',2000);
INSERT INTO mesas values (30,0,'12:23',123,'nomeven',2000);

CREATE TABLE grupos(
    FCGRUPO VARCHAR(4) NOT NULL,
    imagen VARCHAR(300),
    FCDESC VARCHAR(35),
    Nivel VARCHAR(1)
);

ALTER TABLE grupos
    ADD PRIMARY KEY (FCGRUPO);

CREATE TABLE inventa(
    FCREF VARCHAR(13) NOT NULL,
    FNCOSTO FLOAT,
    FCDESC VARCHAR(45),
    imagen VARCHAR(300),
    LOCAL VARCHAR(3),
    FNVRUNI FLOAT,
    LINEA VARCHAR(4), index(LINEA),
    promox VARCHAR(1),
    FNVPROMOX FLOAT
);

ALTER TABLE inventa
    ADD PRIMARY KEY (FCREF);

CREATE TABLE detawait(
    VENDE INT(3) NOT NULL,
    HORA VARCHAR(10) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered TINYINT(1),
    comanda1 VARCHAR(45),
    comanda2 VARCHAR(45),
    LOCAL VARCHAR(3),
    fcdesc VARCHAR(35),
    cantidad SMALLINT(6),
    vrtotal FLOAT,
    Mesa SMALLINT(6),
    fcref VARCHAR(13),
    OLDCUENTA SMALLINT(6), index(OLDCUENTA),
    imagen VARCHAR(300),
    FNCOSTO FLOAT,
    promox VARCHAR(1),
    FNVRUNI FLOAT,
    CELULAR VARCHAR(20),
    FNVPROMOX FLOAT
);

ALTER TABLE detawait ADD PRIMARY KEY(fcref,VENDE,HORA,CELULAR);



