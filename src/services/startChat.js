import { ref, get, set } from "firebase/database";
import { database } from "./firebase";

export const startChat = async (currentUserId, otherUserId) => {
    // Generate a consistent chatId by sorting the uids
    const chatId = [currentUserId, otherUserId].sort().join("_");

    const chatRef = ref(database, `chats/${chatId}`);
    const snapshot = await get(chatRef);

    if (!snapshot.exists()) {
        // Create the chat node if it doesn't exist
        await set(chatRef, {
            users: {
                [currentUserId]: true,
                [otherUserId]: true
            },
            messages: {} // optional: or leave it until the first message
        });
        console.log("New chat started ✅");
    } else {
        console.log("Chat already exists ✅");
    }

    return chatId; // Return the chatId to open or continue the chat
};
