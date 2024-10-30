import mongoose, { Schema, Document } from "mongoose";

export interface ICountry extends Document {
  name: string;
}

const CountrySchema: Schema<ICountry> = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const countryModel = mongoose.model<ICountry>("Country", CountrySchema);
