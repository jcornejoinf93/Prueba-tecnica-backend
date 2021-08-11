import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const getUsers = async  (req: Request, res: Response ) => {
    const usersDB = await getRepository(User).find();
    return res.json(usersDB);
};

export const getUsersById = async  (req: Request, res: Response ) => {
    const { id } = req.params;
    const userDB = await getRepository(User).findOne(id);

    if ( !userDB ) {
        return res.status(404).json({
            msg: 'No existe usuario con ese id'
        });
    }

    return res.json(userDB);
};

export const createUsers = async  (req: Request, res: Response ) => {
    const { body } = req;

    try {

        const userDB = getRepository(User).create(body);
        const newUser = await getRepository(User).save(userDB);
        return res.json(newUser);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        });        
    }
};

export const updateUser = async  (req: Request, res: Response ) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const userDB = await getRepository(User).findOne(id);
    
    if ( !userDB ) {
        return res.status(404).json({
            msg: 'No existe usuario con ese id'
        });
    }
    getRepository(User).merge(userDB , body);
    const modifiedUser = await getRepository(User).save(userDB);
    res.json(modifiedUser);    
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await getRepository(User).findOne(id);
        if (!user) {
            return res.status(404).json({
                msg: 'No existe usuario con ese id'
            });
        }

        await getRepository(User).delete(id);
        res.json({
            msg: 'Usuario correctamente eliminado'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        });
        
    }

};