import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getAllData, getAllDataFromColumnByID, addData, deleteData, updateData } from '../../../db/db_wrap';


export default async function handler(req, res) {
  const
    session = await getServerSession(req, res, authOptions),
    { body } = req,
    { adminapi } = req.query,
    [table, id] = adminapi;
  console.debug('req.query=', req.query);
  console.debug('>> ', req.method, ' запрос на', req.url, 'adminapi =', { table, id });
  if (req.body) console.log('req.body=', JSON.stringify(req.body));
  if (session && 'admin' === session.user.role) {
    if (!['user', 'account'].includes(table)) {
      return res.status(404).send({ error: 'wrong table' });
    }
    try {
      if (session && 'admin' === session.user.role)
        switch (req.method) {
          case 'GET':
            if (id) return res.status(200).json(await getAllDataFromColumnByID(table, 'userId', id));
            return res.status(200).json(await getAllData(table));
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
      error: 'You must be ADMIN to view the protected content on this page.',
    });
  }
}