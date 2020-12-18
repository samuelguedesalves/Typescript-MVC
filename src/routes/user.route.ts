import { Router } from 'express';

import { 
  createUser, 
  listUsers, 
  updateUser,
  deleteUser,
} from '../controllers/User';

const usersRoute = Router();

usersRoute.get('/', async (request, response) => {
  try{
    const users = await listUsers();

    return response.status(200).json(users);
  } catch (error) {
    return response.status(400).json({ error : 'error in request' });
  }
});

usersRoute.post('/', async (request, response) => {
  try {
    const { name } = request.body;
    const user = await createUser({ name });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error : error.message });
  }
});

usersRoute.put('/:id', async (request, response) => {
  try {
    const { name } = request.body;
    const { id } = request.params;

    const user = await updateUser({ id, name });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRoute.delete('/:id', async (request, response) => {
  try{
    const { id } = request.params;

    await deleteUser({ id });

    return response.status(200).send();
  }catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRoute;