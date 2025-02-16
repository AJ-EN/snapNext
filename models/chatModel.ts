import mongoose, { Types, Document, Model } from "mongoose";

export interface IChat{
    participants: Types.ObjectId[];
    messages: Types.ObjectId[];
}

export interface IChatDocument extends IChat, Document {
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
}, {
    timestamps: true,
});


const Chat:Model<IChatDocument> = mongoose.models?.Chat || mongoose.model("Chat", chatSchema);

export default Chat;