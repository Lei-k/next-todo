import mongoose, { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface User {
    id: string;
    name: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  name: { type: String, required: true }
}, {
    collection: 'users'
});

export default (mongoose.models.User || model<User>('User', schema)) as mongoose.Model<User>;
