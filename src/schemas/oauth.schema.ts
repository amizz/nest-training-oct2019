import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    code: String,
    client_id: String,
    redirectURI: String,
    user_id: String,
    scope: String
})