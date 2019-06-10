create table users (
    id serial primary key,
    first_name varchar,
    last_name varchar,
    email varchar,
    password varchar
);

create table books (
    id serial primary key,
    title varchar,
    author varchar,
    cover_image varchar
);

create table reviews (
    id serial primary key,
    user_id integer references users(id),
    book_id integer references books(id),
    score integer,
    content varchar
);