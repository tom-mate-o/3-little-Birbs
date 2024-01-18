// useMongoDBData.jsx


import React from "react";

import {useEffect} from "react";
import { getPostsWithMachtingIDFromDatabaseConfig } from "../utils/getPostsWithMachtingIDFromDatabaseConfig";

export default function useMongoDBDataMessages() {
    const [messagePosts, setMessagePosts] = React.useState([]);

    useEffect(() => {
        loadMessagePostsFromDatabase();
    }, []);

    const loadMessagePostsFromDatabase = () => {
        try {
            getPostsWithMachtingIDFromDatabaseConfig(setMessagePosts);
            console.log("Message posts loaded from database");
        } catch (error) {
            console.error("error loading message posts from database");
        }
    };

    return { messagePosts, setMessagePosts };
}