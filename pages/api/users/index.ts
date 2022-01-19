// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import mongo from 'lib/mongo';

import User from 'models/user';

import apiHandler, { API } from "lib/api-handler";

const api: API = {
    get: async (req: NextApiRequest, res: NextApiResponse) => {
        let users = await User.find();

        let view = users.map(user => {
            return {
                id: user._id,
                name: user.name
            }
        })

        res.status(200).json(view);
    },
    post: async (req: NextApiRequest, res: NextApiResponse) => {

        const body = req.body;

        let user = new User({
            name: body.name
        });

        await user.save();

        res.status(200).json({});
    },
}

export default apiHandler(api);