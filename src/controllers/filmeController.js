import * as filmeModel from '../models/filmeModel.js';

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
                error: 'Corpo da requisição vazio. Envie os dados do filme!',
            });
        }

        const { titulo, descricao, duracao, genero, nota, available } = req.body;

       if (!titulo) {
            return res.status(400).json({ 
                error: 'O filme precisa de um título!' 
            });
       }
        
        if (typeof titulo !== 'string' || titulo.trim().length < 3) {
            return res.status(400).json({
                error: 'O titulo precisa ter pelo menos 3 letras'
            });
        }

        const filmeExistente = await prisma.filme.findFirst({
            where: { titulo: titulo.trim() }
        });

        if (filmeExistente) {
            return res.status(400).json({ 
                error: 'O Filme com este titulo ja esta catalogado. Tente outro título.' 
            });
        }

        if(!descricao) {
            return res.status(400).json({
                error: 'É obrigatório uma descrição para o filme.'
            });
        }

        if (typeof descricao !== 'string' || descricao.trim().length < 10) {
            return res.status(400).json({
                error: 'A descrição é muito curta! Precisa ter pelo menos 10 caracteres.'
            });
        }
        
        if (!genero) return res.status(400).json({ error: 'O genero (genero) é obrigatório!' });
        if (!nota === undefined) return remove.status(400).json({ error: 'A nota (nota) é obrigatória'});
        if (available == undefined) return res.status(400).json({ error: `O filme deve ser válido`});

        const notaNum = Number(nota);
        if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
            return res.status(400).json({ error: 'A nota (nota) deve ser um número válido!' });
        }

        if (typeof titulo !== 'string' || titulo.length < 3) {
            return res.status(400).json({
                message: 'O titulo deve ter no mínimo 3 caracteres'
            });
        }

        if (typeof descricao !== 'string' || descricao.length < 10) {
            return res.status(400).json({
                message: 'A descricao deve ter no minimo 10 caracteres'
            });
        }

        const generosVaidos = ['Ação', 'Drama', 'Comédia', 'Terror', 'Romance', 'Animação', 'Ficção Científica', 'Suspense'];

        if (!generosVaidos.includes(genero)) {
            return res.status(400).json({
                message: 'Gênero invalido'
            });
        }

        const Duracao = parseInt(duracao);

        if (isNaN(Duracao)) {
            return res.status(400).json({
                error: 'A duração deve ser um número inteiro'
            });
        }

        if (Duracao < 0) {
            return res.status(400).json({
                error: 'Valor inválido',
                message: 'A duração deve ser um número positivo!'
            });
        }

        if (Duracao > 300) {
            return res.status(400).json({
                error: 'Numero invalido',
                message: 'A duração deve estar abaixo de 300 minutos'
            });
        }

        const data = await filmeModel.create({
            titulo,
            descricao,
            duracao: Duracao,
            genero,
            nota: notaNum,
            available
        });

        const filmeExiste = await prisma.filme.findFirst();

        if (filmeExiste) {
            return res.status(400).json({error: 'Já existe um filme com esse titulo'})
        }

        res.status(201).json({
            message: 'Registro cadastrado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar o registro.' });
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
