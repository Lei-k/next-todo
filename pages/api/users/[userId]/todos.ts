// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import mongo, { ObjectId } from 'lib/mongo';

import Todo from 'models/todo';

import apiHandler, { API } from "lib/api-handler";

const api: API = {
    post: async (req: NextApiRequest, res: NextApiResponse) => {
        const { userId } = req.query;

        const body = req.body;

        let todo = new Todo({
            title: body.title,
            desc: body.desc,
            userId: userId
        });

        await todo.save();
        
        res.status(200).json({});
    },
    get: async (req: NextApiRequest, res: NextApiResponse) => {

        const { userId } = req.query;

        let todos = await Todo.find({
            userId: ObjectId(userId as string)
        });

        let view = todos.map(todo => {
            return {
                id: todo._id,
                title: todo.title,
                desc: todo.desc,
                userId: todo.userId
            }
        })
        
        res.status(200).json(view);
    }
}

export default apiHandler(api);