import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

function Home() {
const [user, setUser] = useState("");
const [article, setArticle] = useState("");

useEffect(() => {
    axios.get(`/blog/latest`)
})

    return (
        <div>

            <div className="articleBody">

                <div className="mainLeft">
                    <div className="title"> Blogger In Development </div>
                    <div className="aboutBlog"> IpsumLoremBlaBlaBlaEeerrnieee </div>
                </div>

                {article && (
                    article.map((article) => {
                        return (

                            <div className="articlesRight">
                                <div className="articleTitle"> ${article.title} </div>
                                <div className="articleTime"> ${article.timestamp} </div>
                            </div>

                        );})
                    )};
                
            </div>

        </div>
    );
};

export default Home;
