import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/firebaseService";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(setUsers); // Fetch users and update state
    }, []);

    return (
        <div>
            <h2>Connect with other people:</h2>
            <div>
                {users.map((user, index) => (
                    <p style={{ margin: "0px" }} key={index}>
                        {user.name}
                    </p>
                ))}
            </div>
        </div >
    );
};

export default UserList;
