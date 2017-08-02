select * from videos
join videos on users.id = video.iD
where users.id = $1