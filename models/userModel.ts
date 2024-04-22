import mongoose, { Model } from "mongoose";

export interface IUser {
    username: string;
    fullName: string;
    email: string;
    avatar?: string;
};

export interface IUserDocument extends IUser, Document{
    _id: any;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    fullName: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    avatar: {
        type: 'string',
        default: "",
    }
}, {
    // Created At and Updated At
    timestamps: true,
});

const User:Model<IUserDocument> = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;