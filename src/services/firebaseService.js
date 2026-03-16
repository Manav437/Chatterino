import { database } from "../firebase";
import { ref, push, set, onValue } from "firebase/database";


export const addUser = (user) => {
    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef);
    return set(newUserRef, user);
};


export const fetchUsers = async (callback) => {
    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(Object.values(snapshot.val()));
        } else {
            callback([]);
        }
    });
};