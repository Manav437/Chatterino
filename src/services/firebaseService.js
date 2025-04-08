import { database } from "../firebase";
import { ref, push, set, onValue } from "firebase/database";

// Function to add a new user
export const addUser = (user) => {
    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef);
    return set(newUserRef, user);
};

// Function to fetch users
export const fetchUsers = async (callback) => {
    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(Object.values(snapshot.val())); // Convert object to array
        } else {
            callback([]); // Empty array if no data
        }
    });
};