SELECT COUNT(*) AS count
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
