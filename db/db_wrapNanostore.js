import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    // log: ['query','info'],
    // errorFormat:'pretty'
});

export async function addDataNanostore(table, body) {
    return await prisma[table].create({
        data: Object.fromEntries(new URLSearchParams(body).entries())
    })
}

export async function updateDataNanostore(table, id, body) {
    return await prisma[table].update({
        where: {
            id: id
        },
        data: Object.fromEntries([...new URLSearchParams(body).entries()].filter(([n]) => 'id' !== n))
    })
}