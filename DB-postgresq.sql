drop table boots cascade

create table boots(
	--основная информация
	id serial primary key,
	title char(100), --название
	img char(100), --путь к картинке
	category_id INT REFERENCES categories(id),--категории (выды обуви)
	price int, --стоимость
	season_id INT REFERENCES seasons(id),--сезоны
	gender char(10),
	brend_id INT REFERENCES  brends(id),--бренды
	
	--для карточек (дополнительно)
	country_id INT REFERENCES countries(id),--страны производства
	articul char(25),
	material_id int references materials(id),
	description char(100)
);
SELECT DISTINCT c.id AS category_id
FROM boots b
JOIN categories c ON b.category_id = c.id
WHERE b.gender = 'Мужские';


create table colors( --возможные цвета определенной обуви
	id serial primary key,
	color char(50),
	boot int references boots(id)
);

create table materials(
	id serial primary key,
	material char(50)
);

create table categories(
	id serial primary key,
	category char(25)
);

create table seasons(
	id serial primary key,
	season char(25)
);

create table brends(
	id serial primary key,
	brend char(25)
);

create table countries(
	id serial primary key,
	county char(50)
);

create table size(
	id serial primary key,
	boot_id int references boots(id),
	size int
);

drop table rating

create table rating(
	id serial primary key,
	r1 int,
	r2 int,
	r3 int,
	r4 int,
	r5 int,
	rat NUMERIC(5,1)
);
select * from rating;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);





select * from boots;
select * from categories;
select * from seasons;
select * from countries;
select * from colors;
select * from brends;
select * from materials;
select * from size;

select * from users;

SELECT EXISTS (SELECT 1 FROM users WHERE email = 'kyxmistrov.igor17@gmail.com') AS email_exists;



SELECT login
FROM users
WHERE email = 'kyxmistrov.igor17@gmail.com' AND password = '17092003';

INSERT INTO users (login, password, email) VALUES ('example_user', 'hashed_password', 'example@example.com');