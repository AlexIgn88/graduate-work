import {
  getAllData, getAllTopicStarters, getOneDataFromColumnByArrayOfIDs,
  getOneData, getAllDataFromColumnByID, getAllPostStartersByTopicID,
  addData, deleteData, updateData
} from '../../../db/db_wrap';


export default async function handler(req, res) {
  const
    { body } = req,
    { forum } = req.query,
    [table, id] = forum;
  // console.debug('req.query=', req.query);
  // console.debug('>> ', req.method, ' запрос на', req.url, 'forum =', { table, id });
  // if (req.body) console.log('req.body=', JSON.stringify(req.body));
  if (!['user', 'post', 'topic', 'session'].includes(table)) {
    return res.status(404).send({ error: 'wrong table' });
  }
  try {

    switch (req.method) {
      case 'GET':
        // console.debug('req.query.topicId in switch=', req.query.topicId);

        switch (true) {
          case 'topic' === table:
            return res.status(200).json({
              topics: await getAllData(table),
              // users: await getAllTopicStarters(),
              users: await getAllData('user'),
              onlineUsers: await getAllData('session').then(result => result.map(user => user.userId)),
              posts: await getAllData('post'),
              lastPosts: await getAllData(table)
                .then(result => result.map(topic => topic.id))
                .then(result => getOneDataFromColumnByArrayOfIDs('post', 'topicId', result, 'desc'))
            });
          case 'post' === table:
            return res.status(200).json({
              topic: await getOneData('topic', +req.query.topicId),
              posts: await getAllDataFromColumnByID(table, 'topicId', +req.query.topicId),
              users: await getAllPostStartersByTopicID(+req.query.topicId)
            });
          default:
            return res.status(200).json('error value');
        }

      case 'POST':
        return res.status(200).json(await addData(table, body));
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