CREATE DATABASE todo_list；

CREATE TABLE todoItems(
    ID SERIAL PRIMARY KEY NOT NULL,
    List_ID INTEGER NOT NULL,
    Tittle text UNIQUE,
    Status INTEGER DEFAULT 0
);