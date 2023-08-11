import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    // log: ['query','info'],
    // errorFormat:'pretty'
});

export async function getOneData(table, id) {
    return await prisma[table].findUnique({
        where: { id: id }
    })
}

export async function getAllData(table) {
    return await prisma[table].findMany({ orderBy: { id: 'asc' } })
}

export async function getOneDataFromColumnByID(table, column, columnId, orderByIdValue) {
    return await prisma[table].findFirst({
        where: { [column]: columnId },
        orderBy: { id: orderByIdValue },
    });
}

export async function getOneDataFromColumnByArrayOfIDs(table, column, columnIdsArray, orderByIdValue) {
    const results = await Promise.all(
        columnIdsArray.map((id) =>
            getOneDataFromColumnByID(table, column, id, orderByIdValue))
    );

    return results.filter((result) => result !== null);
}

// export async function getAllDataByUserID(table, userId) {
//     return await prisma[table].findMany({ where: { userId: userId }, orderBy: { id: 'asc' } })
// }
//getAllDataFromColumnByID - улучшенная версия getAllDataByUserID
export async function getAllDataFromColumnByID(table, column, id) {
    return await prisma[table].findMany({ where: { [column]: id }, orderBy: { id: 'asc' } })
}

export async function getAllTopicStarters() {
    return await prisma.user.findMany({ where: { topics: { some: { id: { gt: 0 } } } }, orderBy: { id: 'asc' } })
}

export async function getAllPostStartersByTopicID(id) {
    return await prisma.user.findMany({ where: { posts: { some: { topicId: { equals: id } } } }, orderBy: { id: 'asc' } })
}

export async function addData(table, body) {
    return await prisma[table].create({
        data: {
            ...JSON.parse(body)
        }
    })
}

export async function deleteData(table, id) {
    return await prisma[table].delete({
        where: {
            id: id
        }
    })
}

export async function updateData(table, id, body) {
    return await prisma[table].update({
        where: {
            id: id
        },
        data: {
            ...JSON.parse(body)
        }
    })
}
