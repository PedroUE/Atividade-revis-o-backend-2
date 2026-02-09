import express from 'express';
import * as controller from '../controllers/filmeController.js';

const router = express.Router();

router.post('/filmes', controller.create);
router.get('/filmes', controller.getAll);
router.get('/filme/:id', controller.getById);
router.put('/filmes/:id', controller.update);
router.delete('/filmes/:id', controller.remove);

export default router;
