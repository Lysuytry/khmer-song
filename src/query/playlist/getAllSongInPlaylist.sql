SELECT S.name AS songName, S.duration AS songDuration, S.size
FROM khmersong.playists AS PL
INNER JOIN playlistSongs AS PLS ON PL.id = PLS.playlistId
INNER JOIN songs AS S ON S.id=PLS.songId
where PL.id IS NOT NULL
AND PL.id=:id
AND PL.userId=:userId
LIMIT :limitValue
OFFSET :offsetValue
