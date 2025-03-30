import { Router } from 'express';

const baseRoutes = (controller: any) => {
    const router = Router();

    router.get('/', (req, res) => controller.getItems(req, res));
    router.get('/:id', (req, res) => controller.getItemById(req, res));
    router.get('/uuid/:uuid', (req, res) => controller.getItemByUuid(req, res));
    router.post('/', (req, res) => controller.createItem(req, res));
    router.put('/:id', (req, res) => controller.updateItem(req, res));
    router.put('/uuid/:uuid', (req, res) => controller.updateItemByUuid(req, res));
    router.delete('/:id', (req, res) => controller.deleteItem(req, res));
    router.delete('/uuid/:uuid', (req, res) => controller.deleteItemByUuid(req, res));


    return router;
};

export default baseRoutes;
