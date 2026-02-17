import * as filmeModel from '../models/filmeModel.js';

const GenerosValidos = ['Ação', 'Drama', 'Comédia', 'Terror', 'Romance', 'Animação', 'Ficção Científica', 'Suspense'];

export const getAll = async (req, res) => {
    try {
        const filme = await filmeModel.findAll(req.query);

        if (!filme || filme.length === 0) {
            return res.status(200).json({
                message: 'Nenhum registro encontrado.',
            });
        }
        res.json(filme);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};

export const create = async (req, res) => {
     try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Você esqueceu de enviar os dados do filme.',
            });
        }

        const { titulo, descricao, duracao, genero, nota } = req.body;

        // Validar título obrigatório
        if (!titulo) {
            return res.status(400).json({ 
                error: 'O titulo e obrigatorio' 
            });
        }

        if (typeof titulo !== 'string' || titulo.trim().length < 3) {
            return res.status(400).json({
                error: 'O titulo precisa ter pelo menos 3 letras!'
            });
        }

        const filmeExistente = await prisma.filme.findFirst({
            where: { titulo: titulo.trim() }
        });

        if (filmeExistente) {
            return res.status(400).json({ 
                error: 'O filme ja esta registrado no catálogo' 
            });
        }

        // Validar descrição obrigatória
        if (!descricao) {
            return res.status(400).json({ 
                error: 'A descrição do filme e obrigatoria' 
            });
        }

        if (typeof descricao !== 'string' || descricao.trim().length < 10) {
            return res.status(400).json({
                error: 'A descrição é muito curta! Precisa ter pelo menos 10 caracteres.'
            });
        }

        if (duracao === undefined || duracao === null) {
            return res.status(400).json({ 
                error: 'A duração é obrigatória!' 
            });
        }

        const duracaoNum = parseInt(duracao);
        if (isNaN(duracaoNum) || duracaoNum <= 0) {
            return res.status(400).json({
                error: 'A duração precisa ser um número positivo!'
            });
        }
         
        if (duracaoNum > 300) {
            return res.status(400).json({
                error: 'O filme deve ter no maximo 300 min de duração'
            });
        }

        if (!genero) {
            return res.status(400).json({ 
                error: 'O genero e obrigatorio' 
            });
        }

        if (!GenerosValidos.includes(genero)) {
            return res.status(400).json({
                error: 'Genero invalido. Generos validos: Ação, Drama, Comédia, Terror, Romance, Animação, Ficção Científica, Suspense'
            });
        }

        if (nota === undefined || nota === null) {
            return res.status(400).json({ 
                error: 'A nota deve estar entre 0 e 10!' 
            });
        }

        const notaNum = Number(nota);
        if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
            return res.status(400).json({ 
                error: 'A nota deve estar entre 0 e 10!)' 
            });
        }

        const data = await filmeModel.create({
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            duracao: duracaoNum,
            genero,
            nota: notaNum,
            available: true
        });

        res.status(201).json({
            message: 'Sucesso! Novo filme adicionado ao catálogo!',
            filme: data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro ao salvar o filme. Tente novamente.' });
    }
};
export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await filmeModel.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do filme!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await filmeModel.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }
        const notaNum = Number(nota);
        if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
            return res.status(400).json({ error: 'A nota (nota) deve ser um número válido!' });
        }

        if (typeof titulo !== 'string' || titulo.length < 3) {
            return res.status(400).json({
                message: 'O titulo deve ter no mínimo 3 caracteres',
            });
        }

        if (typeof descricao !== 'string' || descricao.length < 10) {
            return res.status(400).json({
                message: 'A descricao deve ter no minimo 10 caracteres',
            });
        }

        const generosVaidos = [
            'Ação',
            'Drama',
            'Comédia',
            'Terror',
            'Romance',
            'Animação',
            'Ficção Científica',
            'Suspense',
        ];

        if (!generosVaidos.includes(genero)) {
            return res.status(400).json({
                message: 'Gênero invalido',
            });
        }

        const Duracao = parseInt(duracao);

        if (isNaN(Duracao)) {
            return res.status(400).json({
                error: 'A duração deve ser um número inteiro',
            });
        }

        if (Duracao < 0) {
            return res.status(400).json({
                error: 'Valor inválido',
                message: 'A duração deve ser um número positivo!',
            });
        }

        if (Duracao > 300) {
            return res.status(400).json({
                error: 'Numero invalido',
                message: 'A duração deve estar abaixo de 300 minutos',
            });
        }
        
        const data = await filmeModel.update(id, req.body);
        res.json({
            message: `O registro "${data.titulo}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await filmeModel.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        if (exists.nota >= 9) {
            return res.status(403)({
                error: 'Proibido',
                message: `O filme ${titulo} tem nota ${nota} e é um classico!`
            });
        }

        await filmeModel.remove(id);
        res.json({
            message: `O registro "${exists.titulo}" foi deletado com sucesso!`,
            deletado: exists,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
};
