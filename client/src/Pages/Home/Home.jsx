import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "../Home/Home.css";

function Home() {
const [user, setUser] = useState("");
const [article, setArticle] = useState("");

useEffect(() => {
    axios.get(`/blog/latest`)
})

    return (
                <div className="articleBody">

                    <div className="mainLeft" >
                        <div className="title"> Blogger In Development </div>
                        <div className="aboutBlog"> Typewriter keytar freegan distillery DIY chambray. Williamsburg offal austin blog slow-carb. Cardigan authentic celiac, ramps swag pok pok ethical venmo craft beer. Jianbing etsy tacos mumblecore lyft VHS seitan polaroid. Flexitarian tattooed dreamcatcher jianbing four dollar toast succulents selvage narwhal cloud bread.

Flannel tbh gochujang subway tile, chillwave hella marfa schlitz. Taxidermy ramps green juice, banh mi chillwave before they sold out roof party. Celiac microdosing taiyaki williamsburg mlkshk shaman lomo chillwave wolf blog paleo cronut gentrify. Echo park artisan kickstarter af pickled flexitarian mustache leggings narwhal crucifix tacos. Next level prism mumblecore migas, everyday carry pug helvetica umami vegan kitsch leggings direct trade flannel health goth hammock. Neutra authentic craft beer chicharrones kitsch. Normcore crucifix humblebrag try-hard hot chicken.
</div>
                    </div>

                    <div className="articlesRight">
                        {article && (
                        article.map((article) => {
                        return (
                            <>
                                <div className="articleTitle"> ${article.title} </div>
                                <div className="articleTime"> ${article.timestamp} </div>
                            </>
                        );})
                        )}
                    </div>

                </div>
    );
};

export default Home;
