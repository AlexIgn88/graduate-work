import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import {
  getAllData, getAllTopicStarters,
  getOneData, getAllDataFromColumnByID, getAllPostStartersByTopicID,
  addData, deleteData, updateData
} from '../../../db/db_wrap';


export default async function handler(req, res) {
  const
    session = await getServerSession(req, res, authOptions),
    { body } = req,
    { store } = req.query,
    [table, id] = store;
  console.debug('req.query=', req.query);
  console.debug('>> ', req.method, ' запрос на', req.url, 'forum =', { table, id });
  if (req.body) console.log('req.body=', JSON.stringify(req.body));
  if (!['product', 'basket', 'order'].includes(table)) {
    return res.status(404).send({ error: 'wrong table' });
  }
  try {

    switch (req.method) {
      case 'GET':

        switch (true) {
          case 'product' === table: return res.status(200).json(await getAllData(table));

          case 'basket' === table:
            if (session) {
              null //допишу
            } else {
              res.status(403).send({
                error: 'You must be signed in to view the protected content on this page.',
              });
            }
            return;

          case 'order' === table:
            if (session && 'manager' === session.user.role) {
              null //допишу
            } else {
              res.status(403).send({
                error: 'You must be a manager to view the protected content on this page.',
              });
            }
            return;

          default:
            return res.status(200).json('error value');
        }

      case 'POST':

        switch (true) {
          case 'product' === table: if (session && 'manager' === session.user.role) {
            null //допишу
          } else {
            res.status(403).send({
              error: 'You must be a manager to view the protected content on this page.',
            });
          }
            return;

          case 'basket' === table:
            if (session) {
              return res.status(200).json(await addData(table, body));
            } else {
              res.status(403).send({
                error: 'You must be signed in to view the protected content on this page.',
              });
            }
            return;

          case 'order' === table:
            if (session && 'manager' === session.user.role) {
              null //допишу
            } else {
              res.status(403).send({
                error: 'You must be a manager to view the protected content on this page.',
              });
            }
            return;

          default:
            return res.status(200).json('error value');
        }

      case 'DELETE':
        return res.status(200).json(await deleteData(table, +id));
      case 'PUT':
        return res.status(200).json(await updateData(table, +id, body));
    }
  } catch (error) {
    console.debug(`FILE: ${__filename}\nERROR:`, error);
    console.log(`FILE: ${__filename}\nERROR:`, error);
    res.status(500).json({ error });
  }
}