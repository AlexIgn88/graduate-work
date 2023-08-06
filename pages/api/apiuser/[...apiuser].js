import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getOneData, getAllDataFromColumnByID, addData, deleteData, updateData } from '../../../db/db_wrap';


export default async function handler(req, res) {
  const
    session = await getServerSession(req, res, authOptions),
    { body } = req,
    { apiuser } = req.query,
    [table, id] = apiuser;
  // console.debug('req.query=', req.query);
  // console.debug('>> ', req.method, ' запрос на', req.url, 'apiuser=', { table, id }, 'session =', session);
  // console.debug('____', session?.user?.id); console.debug('____', session?.user?.email);
  // if (req.body) console.log('req.body=', JSON.stringify(req.body));
  if (session) {
    if (!['user'].includes(table)) {
      return res.status(404).send({ error: 'wrong table' });
    }
    try {
      switch (req.method) {
        case 'GET':
          return res.status(200)
            .json({
              user: await getOneData(table, session?.user?.id),
              accouts: await getAllDataFromColumnByID('account', 'userId', session?.user?.id)
            });
        case 'POST':
          return res.status(200).json(await addData(table, body));
        case 'DELETE':
          return res.status(200).json(await deleteData(table, id));
        case 'PUT':
          return res.status(200).json(await updateData(table, id, body));
      }
    } catch (error) {
      console.debug(`FILE: ${__filename}\nERROR:`, error);
      console.log(`FILE: ${__filename}\nERROR:`, error);
      res.status(500).json({ error });
    }
  } else {
    res.status(403).send({
      error: 'You must be signed in to view the protected content on this page.',
    });
  }
}