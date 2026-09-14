CREATE TABLE IF NOT EXISTS history (
    id         serial PRIMARY KEY,
    expression TEXT NOT NULL,
    result     TEXT NOT NULL
);