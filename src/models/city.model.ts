import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICity extends Document {
  name: string;
  stateId: Types.ObjectId;
}

const CitySchema: Schema<ICity> = new Schema(
  {
    name: { type: String, required: true },
    stateId: { type: Schema.Types.ObjectId, required: true, ref: "State" },
  },
  {
    timestamps: true,
  }
);

export const cityModel = mongoose.model<ICity>("City", CitySchema);
