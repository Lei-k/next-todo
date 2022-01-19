// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import mongo, { ObjectId } from 'lib/mongo';

import User from 'models/user';

import apiHandler, { API } from "lib/api-handler";

const api: API = {
    delete: async (req: NextApiRequest, res: NextApiResponse) => {
        const { userId } = req.query;

        await User.deleteOne({
            _id: ObjectId(userId as string)
        })

        res.status(200).json({});
    }
}

export default apiHandler(api);