import Mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn?: typeof Mongoose,
        promise?: Promise<typeof Mongoose>
    };
}