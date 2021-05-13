import { Router } from 'express';
import { middlewareJWT } from '../controllers/middlewares/index.js';
import { home } from '../controllers/homeController/index.js';
import { store as carsStore, index as indexCars, destroy as carsDestroy } from '../controllers/carsController/index.js';
import { store as cars_DescriptionStore } from '../controllers/carsDescriptionController/index.js';
import { store as cars_DatasheetStore } from '../controllers/carsDatasheetController/index.js';
import { store as usersStore, index as usersIndex, update as usersUpdate, destroy as usersDestroy, login} from '../controllers/usersController/index.js';

const routes = Router();

routes.get('/', middlewareJWT, home);

routes.post('/cars', carsStore);
routes.get('/cars', indexCars);
routes.delete('/cars/:id', carsDestroy);

routes.post('/cars/description/:id_cars', cars_DescriptionStore);
routes.post('/cars/datasheet/:id_cars', cars_DatasheetStore);

routes.post('/users', usersStore);
routes.get('/users', usersIndex);
routes.put('/users/:id', usersUpdate);
routes.delete('/users/:id', usersDestroy);

routes.post('/users/login', login);

export { routes }