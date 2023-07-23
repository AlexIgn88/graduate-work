import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // log: ['query','info'],
  // errorFormat:'pretty'
});

export default async function handler(req, res) {

  // console.debug('req=', req, 'res=', res);

  const { forum } = req.query,
    [table, id] = forum;
  console.debug('req.query=', req.query);
  console.debug('>> ', req.method, ' запрос на', req.url, 'forum =', { table, id });
  if (req.body) console.log('req.body=', JSON.stringify(req.body));

  if (!['user', 'post', 'topic'].includes(table)) {
    return res.status(404).send({ error: 'wrong table' });
  }
  try {
    switch (req.method) {
      case 'GET':

        console.debug('req.query.topicId in switch=', req.query.topicId);

        switch (true) {
          // switch (+req.query.topicId) {

          // case req.query.topicId:
          // case 20:
          // case true:

          case 'topic' === table:

            res.status(200).json({

              topics: await prisma.topic.findMany(
                { orderBy: { id: 'asc' } }
              ),
              users: await prisma.user.findMany({
                where: { topics: { some: { id: { gt: 0 } } } },
                orderBy: { id: 'asc' }
              })
            })
            return;

          case 'post' === table:

            res.status(200).json({

              topic: await prisma.topic.findUnique({
                where: {
                  id: +req.query.topicId
                }
              }),
              posts: await prisma.post.findMany({
                where: {
                  topicId: +req.query.topicId
                },
                orderBy: { id: 'asc' }
              }),
              users: await prisma.user.findMany({
                where: { posts: { some: { topicId: { equals: +req.query.topicId } } } },
                orderBy: { id: 'asc' }
              })

            })
            return;

          default:
            return res.status(200).json('error value');
        }



      case 'POST':
        // return res.status(200).json(await prisma[table].create({
        //   data: Object.fromEntries(new URLSearchParams(req.body).entries())
        // }));

        return res.status(200).json(await prisma[table].create({
          data: {
            ...JSON.parse(req.body)
          }
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
          // data: Object.fromEntries([...new URLSearchParams(req.body).entries()].filter(([n]) => 'id' !== n))
          data: {
            ...JSON.parse(req.body)
          }
        }));

    }
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ error });
  }
}