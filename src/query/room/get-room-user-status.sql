SELECT

  RU.roomId  AS id,
  R.status,
  U.id AS userId

FROM rooms AS R
INNER JOIN roomUsers AS RU ON R.id=RU.roomId
INNER JOIN users AS U ON U.id=RU.userId

WHERE R.status='active'
AND U.id=:id
