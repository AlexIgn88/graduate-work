import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import {
  getAllData, getOneData, getOneDataFromColumnByID,
  getAllDataFromColumnByID, getOneDataFromColumnsByValues,
  addData, getAllDataFromColumnsByValues, deleteData, updateData
} from '../../../db/db_wrap';


export default async function handler(req, res) {
  const
    session = await getServerSession(req, res, authOptions),
    { body } = req,
    { store } = req.query,
    [table, id] = store;

  const roleManager = 'manager' === session?.user?.role || 'admin' === session?.user?.role;
  // console.debug('roleManager=', roleManager);
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
                error: 'You must be signed',
              });
            }
            return;

          case 'order' === table:

            switch (true) {
              case session && roleManager:
                return await getAllData(table)
                  .then(async (result) => {
                    const productsInOrder = await Promise.all(result.map(async (item) => getOrderItem(item)));
                    // console.debug('productsInOrder=', productsInOrder)
                    res.status(200).json(productsInOrder)
                  });
              case session && !roleManager:
                return await getAllDataFromColumnsByValues(table, ['userId'], [session?.user?.id])
                  .then(async (result) => {
                    const productsInOrder = await Promise.all(result.map(async (item) => getOrderItem(item)));
                    // console.debug('productsInOrder=', productsInOrder)
                    res.status(200).json(productsInOrder)
                  });
              default:
                return res.status(200).json({ error: 'You must be signed' });
            }

          default: return res.status(200).json({ error: 'error value' });
        }

      case 'POST':

        switch (true) {
          case 'product' === table: if (session && roleManager) {
            null //данные в этой таблице может поменять только менеджер 
          } else {
            res.status(403).send({
              error: 'You must be a manager',
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
                error: 'You must be signed',
              });
            }
            return;

          case 'order' === table:
            if (session) {

              await getAllDataFromColumnsByValues('basket', ['userId'], [session?.user?.id])
                .then(async (result) => {

                  const addedInOrder = await Promise.all(result.map(async (item) => {
                    const { id, userId, productId, quantity } = item;
                    const orderItem = { userId, productId, quantity };
                    const orderItemJson = JSON.stringify(orderItem);
                    await addData('order', orderItemJson);

                    const product = await getOneData('product', +productId);
                    const updatedQuantity = Object.assign({}, { quantity: product.quantity - quantity });
                    // console.debug('updatedQuantity=', updatedQuantity);
                    const updatedJson = JSON.stringify(updatedQuantity);
                    await updateData('product', +productId, updatedJson)

                    await deleteData('basket', +id);
                    return orderItem;
                  }));

                  return res.status(200).json({ addedInOrder });
                });

            } else {
              res.status(403).send({
                error: 'You must be signed',
              });
            }
            return;

          default:
            return res.status(200).json({ error: 'error value' });
        }

      case 'DELETE':

        switch (true) {
          case 'product' === table: if (session && roleManager) {
            return res.status(200).json(await deleteData(table, +id)); //удалять товары из product может только manager
          } else {
            res.status(403).send({
              error: 'You must be a manager',
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
                error: 'You must be signed',
              });
            }
            return;

          case 'order' === table:
            if (session && roleManager) {
              null //удалять товары из order может только manager
            } else {
              res.status(403).send({
                error: 'You must be a manager',
              });
            }
            return;

          default:
            return res.status(200).json({ error: 'error value' });

        }


      case 'PUT':

        switch (true) {
          case 'product' === table: if (session && roleManager) {
            return res.status(200).json(await updateData(table, +id, body)); //редактировать товары из product может только manager или как результат заказа
          } else {
            res.status(403).send({
              error: 'You must be a manager',
            });
          }
            return;

          case 'basket' === table:
            if (session) {

              await getOneDataFromColumnsByValues(table, ['userId', 'productId'], [session?.user?.id, +id])
                .then(async (result) => {
                  const bodyParsed = JSON.parse(body);
                  const updatedQuantity = Object.assign({}, { quantity: bodyParsed.number });

                  const updatedJson = JSON.stringify(updatedQuantity);
                  const edited = await updateData(table, result.id, updatedJson)
                  res.status(200).json({ edited });
                })

            } else {
              res.status(403).send({
                error: 'You must be signed',
              });
            }
            return;

          case 'order' === table:
            if (session && roleManager) {
              null //редактировать товары из order может только manager
            } else {
              res.status(403).send({
                error: 'You must be a manager',
              });
            }
            return;

          default:
            return res.status(200).json({ error: 'error value' });

        }

      // return res.status(200).json(await updateData(table, +id, body));
    }
  } catch (error) {
    console.debug(`FILE: ${__filename}\nERROR:`, error);
    console.log(`FILE: ${__filename}\nERROR:`, error);
    res.status(500).json({ error });
  }
}

async function getOrderItem(item) {
  const { id: orderId, userId, productId, quantity: number, orderStatus } = item;

  const product = await getOneDataFromColumnsByValues('product', ['id'], [productId]);
  const user = await getOneDataFromColumnsByValues('user', ['id'], [userId]);
  const { name: productName, price, category, description, quantity: totalNumber, image } = product;
  const { name: userName, email } = user;
  const orderItem = {
    orderId, orderStatus,
    userId, userName, email,
    productId, productName, totalNumber, number,
    price, category, description, image
  };
  return orderItem;
}