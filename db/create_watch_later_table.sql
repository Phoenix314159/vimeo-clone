create table videos(
  id int references users(id),
  video varchar(1000)
);