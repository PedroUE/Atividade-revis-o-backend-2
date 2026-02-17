import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.filme.create({ data });
};

export const findAll = async (filters = {}) => {
    const {title,
           genre,
           available,
           minRating,
           maxDuration,
           titulo,
           genero,
           nota,
           duracao,} = filters;
    const where = {};

     const titleFilter = title ?? titulo;
    const genreFilter = genre ?? genero;
    const minRatingFilter = minRating ?? nota;
    const maxDurationFilter = maxDuration ?? duracao;

    if (titleFilter) where.titulo = { contains: titleFilter, mode: 'insensitive' };
    if (genreFilter) where.genero = { contains: genreFilter, mode: 'insensitive' };
    if (available !== undefined) where.available = available;
    if (minRatingFilter !== undefined) where.nota = { gte: parseFloat(minRatingFilter) };
    if (maxDurationFilter !== undefined) where.duracao = { lte: parseInt(maxDurationFilter) };

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
