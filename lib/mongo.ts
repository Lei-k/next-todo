import mongoose from 'mongoose';

if(!process.env.MONGODB_URI) {
    throw new Error('please set MONGODB_URI in .env file');
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {
        conn: undefined,
        promise: undefined
    }
}

async function database() {

    if(cached.conn) {
        return cached.conn;
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI as string);

    cached.conn = await cached.promise;

    return cached.conn;
}

/**
 * helper function to generate mongoose object id
 * 
 * @param id - mongoose object id
 * @returns 
 */
export function ObjectId(id: string) {
    return new mongoose.Types.ObjectId(id);
}

export default database;