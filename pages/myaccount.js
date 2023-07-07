import { useSession, signIn } from 'next-auth/react';
import { nanoquery } from '@nanostores/query';
import { useStore } from '@nanostores/react';

const
  [createFetcherStore] = nanoquery(
    { fetcher: (...keys) => fetch(keys.join('')).then(r => r.json()), }),
  $characters = createFetcherStore(['/api/restricted/myaccount']);

/* eslint-disable */

export default function MyAccount() {
  const sessionHookResult = useSession();
  const storeHookResult = useStore($characters);

  console.log('sessionHookResult=', sessionHookResult);
  console.log('storeHookResult=', storeHookResult);

  // let a = storeHookResult.data?.accouts[0];
  // console.log('a= ', a);
  // console.log('typeof a=', typeof a);
  // console.log('a[userId]= ', a?.userId);
  // let keys = Object.keys(a || {});
  // console.log(keys);

  return <div className='user-accout'>
    <button onClick={() => signIn()}>Добавить аккаунт</button>
    <h3>frontend:</h3>
    <pre>{JSON.stringify(sessionHookResult, null, '\t')}</pre>
    <h3>backend:</h3>
    <pre>{JSON.stringify(storeHookResult, null, '\t')}</pre>

    {/* {    <h3>frontend:</h3>
    <div className='user-frontend'>
      <div>Пользователь: {sessionHookResult.data?.user?.name}</div>
      <div>email: {sessionHookResult.data?.user?.email || 'Не указан'}</div>
      <div>image: <img src={sessionHookResult.data?.user?.image} width="100" alt="ava"></img>
      </div>
      <div>id: {sessionHookResult.data?.user?.id}</div>
      <div>role: {sessionHookResult.data?.user?.role}</div>
    </div>} */}

    {/* <h3>backend:</h3>
    <div>{JSON.stringify(storeHookResult, null, '\t')}</div>
    <div>{JSON.stringify(storeHookResult.data?.accouts, null, '\t')}</div>

    <div className='user-backend'>
      <div>Пользователь: {storeHookResult.data?.user?.name}</div>
      <div>email: {storeHookResult.data?.user?.email || 'Не указан'}</div>
      <div>emailVerified: {storeHookResult.data?.user?.emailVerified || 'Не указано'}</div>
      <div>image: <img src={storeHookResult.data?.user?.image} width="100" alt="ava"></img>
      </div>
      <div>id: {storeHookResult.data?.user?.id}</div>
      <div>role: {storeHookResult.data?.user?.role}</div>

      {storeHookResult.data?.accouts.map(accout => (
        <div>
          {keys.map((key, i) => (
            <div key={i}>{key}: {accout[key]}</div>
          ))}
        </div>)
      )}
    </div> */}



  </div>;
}

/* eslint-enable */