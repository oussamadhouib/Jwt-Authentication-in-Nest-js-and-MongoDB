import { Mongoose } from "mongoose";

import { Document } from 'mongoose';
export interface User extends Document {
    email: string;
    country: string;
}