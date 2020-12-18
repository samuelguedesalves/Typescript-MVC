import { getRepository } from 'typeorm';

import User from '../models/User';

interface CreateUserDTO {
  name: string | null;
}

interface UpdateUserDTO {
  id: string | null ;
  name: string | null;
}

interface DeletUserDTO {
  id: string | null ;
}


export async function createUser ({ name }: CreateUserDTO) {
  const userRepository = getRepository(User);
  if(name){
    const user = userRepository.create({ name });
    await userRepository.save(user);
    
    return user;
  }else {
    throw new Error('Error => this user name is nullable');
  }
}

export async function listUsers () {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  
  return users;
}

export async function updateUser({ id, name }: UpdateUserDTO){
  if(id && name) {
    const parsedId = parseInt(id);
    
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: parsedId });

    if(user) {
      user.name = name;

      await userRepository.save(user);
    }

    return user;
  }else {
    throw new Error('Error => This user name is nullable, not is posible make this update')
  }
}

export async function deleteUser ({ id }: DeletUserDTO) {
  const userRepository = getRepository(User);

  if(!id){
    throw new Error('Error => Invalid id param');
  }

  const parsedId = parseInt(id);

  const user = await userRepository.findOne({ id: parsedId });

  if(user) {
    await userRepository.delete(user);

  } else {
    throw new Error('Error => Error in user delete');
  }
}