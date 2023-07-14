import Head from "next/head";

export default function StorePage() {

    //временно, потом возьму из базы
    const products = [
        { id: 1, name: 'Название товара 1', price: 100 },
        { id: 2, name: 'Название товара 2', price: 200 },
        { id: 3, name: 'Название товара 3', price: 300 },
    ];


    return <>
        <Head>
            <title>Магазин сувениров</title>
        </Head>
        <div className="page store-page">
            <h1>Магазин сувениров</h1>

            <div>
                <div className="card-container">
                    {products.map((product) => (
                        <div key={product.id} className="card">
                            <h2>{product.name}</h2>
                            <p>{product.price} рублей</p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    </>
}