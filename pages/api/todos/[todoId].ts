// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import mongo, { ObjectId } from 'lib/mongo';

import Todo from 'models/todo';

import apiHandler, { API } from "lib/api-handler";

const api: API = {
    delete: async (req: NextApiRequest, res: NextApiResponse) => {
        const { todoId } = req.query;

        await Todo.deleteOne({
            _id: ObjectId(todoId as string)
        })
        
        res.status(200).json({});
    }
}

export default apiHandler(api);