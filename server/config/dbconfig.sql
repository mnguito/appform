CREATE DATABASE dbform;

CREATE TABLE formulario(
    form_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50),
    fecha_nac DATE,
    genero VARCHAR(15)
);
