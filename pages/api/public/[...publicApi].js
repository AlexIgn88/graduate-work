import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({
  // log: ['query','info'],
  // errorFormat:'pretty'
});

export default async function handler(req, res) {
  const { publicApi } = req.query,
    [table, id] = publicApi;
  // console.debug('req.query=',req.query);
  console.debug('>> ', req.method, ' запрос на', req.url, 'publicApi =', { table, id });
  if (req.body) console.log('req.body=', JSON.stringify(req.body));

  if (!['topic', 'post'].includes(table)) {
    return res.status(404).send({ error: 'wrong table' });
  }
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(await prisma[table].findMany({ orderBy: { id: 'asc' } }));
      case 'POST':
        return res.status(200).json(await prisma[table].create({
          data: Object.fromEntries(new URLSearchParams(req.body).entries())
        }));
      case 'DELETE':
        return res.status(200).json(await prisma[table].delete({
          where: {
            id: +id
          }
        }));
      case 'PUT':
        return res.status(200).json(await prisma[table].update({
          where: {
            id: +id
          },
          data: Object.fromEntries([...new URLSearchParams(req.body).entries()].filter(([n]) => 'id' !== n))
        }));

    }
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ error });
  }
}