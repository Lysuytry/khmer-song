SELECT

  COUNT(*) AS count

FROM rooms AS R
INNER JOIN roomUsers AS RU ON R.id=RU.roomId
INNER JOIN users AS U ON U.id=RU.userId

WHERE R.status='active'
AND U.id=:id
LIMIT :limit
OFFSET :offset
