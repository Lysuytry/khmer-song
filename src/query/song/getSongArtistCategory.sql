SELECT CT.name AS category, CT.id AS categoryId, S.id AS songId, S.name AS songName, S.duration AS duration,
S.size as size, S.albumId as albumId, S.categoryId , S.status, S.createdAt AS createdAt, S.createdBy AS createdBy,
AST.songId , AST.artistId as ArtistId, A.image AS artistImage, A.name AS artistName, A.type AS artistType,
A.id AS artistId, A.status AS artistStatus
FROM categories as CT
INNER JOIN songs as S ON CT.id=S.categoryId
INNER JOIN artistSongs as AST ON S.id=AST.songId
INNER JOIN artists as A ON A.id=AST.artistId
WHERE S.id IS NOT NULL
{fliterSingerId}
{fliterSingerName}
{fliterSingerType}
{fliterAlbumId}
AND S.status = 'active'
GROUP BY S.id, A.id
LIMIT :limitValue
OFFSET :offsetValue
