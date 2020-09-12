import {
  Router, Request, Response, NextFunction,
} from 'express';
import UserController from './controllers/UserController';

const routes = Router();
const controller = new UserController();
const prefix = '/users';

routes.get(`${prefix}/`, (req: Request, res: Response, next: NextFunction) => controller.getUSer()
  .then((result) => res.send(result))
  .catch((error) => next(error)));

routes.post(`${prefix}/`, (req: Request, res: Response, next: NextFunction) => controller.createUSer({ ...req.body })
  .then((result) => res.send(result))
  .catch((error) => next(error)));

routes.put(`${prefix}/:id`, (req: Request, res: Response, next: NextFunction) => controller.updateUser({
  _id: req.params.id,
  name: req.body.name,
})
  .then((result) => res.send(result))
  .catch((error) => next(error)));

routes.delete(`${prefix}/:id`, (req: Request, res: Response, next: NextFunction) => controller.deleteUser({
  _id: req.params.id,
})
  .then((result) => res.send(result))
  .catch((error) => next(error)));

export default routes;
