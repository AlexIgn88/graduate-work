import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import {
  getAllData, getOneDataFromColumnByID,
  getAllDataFromColumnByID, getOneDataFromColumnsByValues,
  addData, getAllDataFromColumnsByValues, deleteData, updateData
} from '../../../db/db_wrap';


export default async function handler(req, res) {
  const
    session = await getServerSession(req, res, authOptions),
    { body } = req,
    { store } = req.query,
    [table, id] = store;
  console.debug('req.query=', req.query);
  // console.debug('session=', session);
  console.debug('>> ', req.method, ' запрос на', req.url, 'store =', { table, id });
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
              return res.status(200).json(
                await Promise.all(
                  await getAllDataFromColumnByID(table, 'userId', session?.user?.id).then((result) => {
                    return result.map(async (item) => {
                      return {
                        ...await getOneDataFromColumnByID('product', 'id', item.productId, 'asc'),
                        number: item.quantity,
                      };
                    });
                  })
                ))
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

              const product = await getOneDataFromColumnByID('product', 'id', +id);
              const productInBasket = await getOneDataFromColumnsByValues(table, ['userId', 'productId'], [session?.user?.id, +id]);

              // console.debug('result=', result);
              // console.debug('product=', product);
              if (productInBasket !== null) {

                console.debug('product.quantity=', product.quantity);

                const idInBasket = productInBasket.id;
                // console.debug('idInBasket=', idInBasket);
                const bodyParsed = JSON.parse(body);
                const quantity = bodyParsed.quantity + productInBasket.quantity;

                if (quantity > product.quantity) {
                  return res.status(200).send({ noProduct: 'The quantity of goods you have chosen is more than there is in stock' });
                }

                const updatedQuantity = Object.assign({}, { quantity });
                const updatedJson = JSON.stringify(updatedQuantity);
                return res.status(200).json(await updateData(table, idInBasket, updatedJson));

              } else {
                return res.status(200).json(await addData(table, body));
              }

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

        switch (true) {
          case 'product' === table: if (session && 'manager' === session.user.role) {
            return res.status(200).json(await deleteData(table, +id)); //удалять товары из product может только manager
          } else {
            res.status(403).send({
              error: 'You must be a manager to view the protected content on this page.',
            });
          }
            return;

          case 'basket' === table:
            if (session) {

              id
                ? await getOneDataFromColumnsByValues(table, ['userId', 'productId'], [session?.user?.id, +id])
                  .then(async (result) => {
                    const deleted = await deleteData(table, result.id);
                    res.status(200).json({ deleted });
                  })

                : await getAllDataFromColumnsByValues(table, ['userId'], [session?.user?.id])
                  .then(async (result) => {
                    const deleted = await Promise.all(result.map(async (item) => {
                      await deleteData(table, item.id);
                      return item;
                    }));
                    res.status(200).json({ deleted });
                  });

            } else {
              res.status(403).send({
                error: 'You must be signed in to view the protected content on this page.',
              });
            }
            return;

          case 'order' === table:
            if (session && 'manager' === session.user.role) {
              null //удалять товары из order может только manager
            } else {
              res.status(403).send({
                error: 'You must be a manager to view the protected content on this page.',
              });
            }
            return;

          default:
            return res.status(200).json('error value');

        }


      case 'PUT':
        return res.status(200).json(await updateData(table, +id, body));
    }
  } catch (error) {
    console.debug(`FILE: ${__filename}\nERROR:`, error);
    console.log(`FILE: ${__filename}\nERROR:`, error);
    res.status(500).json({ error });
  }
}