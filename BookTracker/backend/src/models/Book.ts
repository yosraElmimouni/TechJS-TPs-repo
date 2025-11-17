import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  numberOfPages: number;
  pagesRead: number;
  status: string;
  price: number;
  format: string;
  suggestedBy: string;
  finished: boolean;
}

const BookSchema = new Schema<IBook>({
  title: String,
  author: String,
  numberOfPages: Number,
  pagesRead: {
    type: Number,
    default: 0
  },
  status: String,
  price: Number,
  format: String,
  suggestedBy: String,
  finished: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IBook>("Book", BookSchema);
