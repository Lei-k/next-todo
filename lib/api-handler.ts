import type { NextApiRequest, NextApiResponse } from 'next';

import mongo from './mongo';

type METHOD = 'get' | 'put' | 'post' | 'delete';

export type API = {
    [key in METHOD]?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

function apiHandler(api: API) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req.method!.toLowerCase();

        if(method in api) {
            await mongo();
            
            await api[method as METHOD]!(req, res);
        }
    }
}

export default apiHandler;