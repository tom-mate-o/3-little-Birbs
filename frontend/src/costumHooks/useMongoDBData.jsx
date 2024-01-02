// useMongoDBData.jsx

import React from "react";

import {useEffect} from "react";
import { getPoolPostsFromDatabaseConfig } from "../utils/getPoolPostsFromDatabaseConfig";

export default function useMongoDBData() {
    const [poolPosts, setPoolPosts] = React.useState([]);

    useEffect(() => {
        loadPoolPostsFromDatabase();
    }, []);

    const loadPoolPostsFromDatabase = () => {
        try {
            getPoolPostsFromDatabaseConfig(setPoolPosts);
            console.log("Pool posts loaded from database");
        } catch (error) {
            console.error("error loading pool posts from database");
        }
    };

    return { poolPosts, setPoolPosts };
}