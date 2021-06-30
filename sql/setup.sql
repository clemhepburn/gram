DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    profile_photo_url TEXT NOT NULL
);