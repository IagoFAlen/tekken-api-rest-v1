create table users(
	userid integer not null primary key,
	username varchar(255) not null,
	userpass varchar(255) not null
);

create table tekkencharacters(
	characterid integer not null primary key,
	id_user integer not null,
	charname varchar(255) not null,
	foreign key(id_user) references users
	
);

insert into users(userid, username, userpass) values (1, 'Dealenc', '!M1sh1m4');
insert into tekkencharacters(characterid, id_user, charname) values (1, 1, 'Kazuya Mishima');

select * from users;