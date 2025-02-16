import Message, { IMessageDocument } from "@/models/messageModel";
import User, { IUserDocument } from "@/models/userModel";

export const getUsersForSidebar = async (authUserId: string) => {
  try {
    const allUser: IUserDocument[] = await User.find({
      _id: { $ne: authUserId },
    });
    const userInfo = await Promise.all(
      allUser.map(async (user) => {
        const lastMessage: IMessageDocument | null = await Message.findOne({
          $or: [
            { sender: user._id },
            { receiver: authUserId },
            { sender: authUserId },
            { receiver: user._id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate("sender", "fullName avatar _id")
          .populate("receiver", "fullName avatar _id")
          .exec();

        return {
          _id: user._id,
          participants: [user],
          lastMessage: lastMessage
            ? {
                ...lastMessage.toJSON(),
                sender: lastMessage.sender,
                receiver: lastMessage.receiver,
              }
            : null,
        };
      })
    );

    return userInfo;
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error);
    throw error;
  }
};
