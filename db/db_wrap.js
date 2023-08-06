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


export async function getAllDataByID(table, id) {
    return await prisma[table].findMany({ where: { userId: id }, orderBy: { id: 'asc' } })
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
