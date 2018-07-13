SELECT COUNT(*) AS count
FROM playlistSongs AS PLS
WHERE PLS.playlistId=:id
