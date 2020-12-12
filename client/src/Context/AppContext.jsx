import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [article, setArticle] = useState("");
  const [comments, setComments] = useState("");
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get(`/blog/me`, {
          withCredentials: true
        })
        .then((response) => {
          console.log(response.data);
          setCurrentUser(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [currentUser, user]);

  return (
    <AppContext.Provider
      value={{ currentUser, setCurrentUser, article, setArticle, comments, setComments }}>
      {children}
    </AppContext.Provider>
  );
};