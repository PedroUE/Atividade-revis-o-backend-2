import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.filme.create({ data });
};

export const findAll = async (filters = {}) => {
    const { titulo, descricao, duracao, genero, nota} = filters;
    const where = {};

    if (titulo) where.titulo = { contains: titulo, mode: 'insensitive' };
    if (descricao) where.descricao = { contains: descricao, mode: 'insensitive' };
    if (duracao !== undefined) where.duracao = parseInt(duracao);
    if (genero) where.genero = {contains: genero, mode: 'insensitive'}
    if (nota !== undefined) where.nota = parseFloat(nota);

    return await prisma.filme.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.filme.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.filme.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.filme.delete({
        where: { id: parseInt(id) },
    });
};
