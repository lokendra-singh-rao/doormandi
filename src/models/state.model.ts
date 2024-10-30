import mongoose, { Schema, Document, Types } from "mongoose";

export interface IState extends Document {
  name: string;
  countryId: Types.ObjectId;
}

const StateSchema: Schema<IState> = new Schema(
  {
    name: { type: String, required: true },
    countryId: { type: Schema.Types.ObjectId, required: true, ref: "Country" },
  },
  {
    timestamps: true,
  }
);

export const stateModel = mongoose.model<IState>("State", StateSchema);
