import { ref, get, set } from "firebase/database";
import { database } from "./firebase";

export const startChat = async (currentUserId, otherUserId) => {
    const chatId = [currentUserId, otherUserId].sort().join("_");

    const chatRef = ref(database, `chats/${chatId}`);
    const snapshot = await get(chatRef);

    if (!snapshot.exists()) {
        await set(chatRef, {
            users: {
                [currentUserId]: true,
                [otherUserId]: true,
            },
            messages: {},
        });
        console.log("New chat started");
    } else {
        console.log("Chat already exists");
    }

    return chatId;
};
