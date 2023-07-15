import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({
  // log: ['query','info'],
  // errorFormat:'pretty'
});

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { adminapi } = req.query,
    [table, id] = adminapi;
  console.debug('req.query=', req.query);
  console.debug('>> ', req.method, ' запрос на', req.url, 'adminapi =', { table, id });
  if (req.body) console.log('req.body=', JSON.stringify(req.body));

  if (session && 'admin' === session.user.role) {
    if (!['user'].includes(table)) {
      return res.status(404).send({ error: 'wrong table' });
    }
    try {
      if (session && 'admin' === session.user.role)
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
                // id: +id
                id: id
              }
            }));
          case 'PUT':
            return res.status(200).json(await prisma[table].update({
              where: {
                // id: +id
                id: id
              },
              data: Object.fromEntries([...new URLSearchParams(req.body).entries()].filter(([n]) => 'id' !== n))
            }));

        }
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ error });
    }
  } else {
    res.status(403).send({
      error: 'You must be ADMIN to view the protected content on this page.',
    });
  }
}