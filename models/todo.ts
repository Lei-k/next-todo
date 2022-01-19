import mongoose, { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Todo {
    id: string;
    title: string;
    desc: string;
    userId: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Todo>({
  title: { type: String, required: true },
  desc: { type: String, required: true},
  userId: { type: String, required: true}
}, {
    collection: 'todo'
});

export default (mongoose.models.Todo || model<Todo>('Todo', schema)) as mongoose.Model<Todo>;
