
// useMongoDBUserData.jsx

import React from "react";
import { useEffect } from "react";
import { getUserDataFromDatabase } from "../utils/getUserDataFromDatabase";

export default function useMongoDBUserData() {
    const [userData, setUserData] = React.useState([]); // Set initial state to empty array

    useEffect(() => {
        loadUserDataFromDatabase();
    }, []);

    const loadUserDataFromDatabase = () => {
        try {
            getUserDataFromDatabase(setUserData);
            console.log("User data loaded from database");
        } catch (error) {
            console.error("error loading user data from database");
        }
    }

    return { userData, setUserData };
}