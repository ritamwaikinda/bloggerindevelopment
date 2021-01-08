import React, { useState, useEffect, /*useContext*/ } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
// import { AppContext } from "../../Context/AppContext";
import "../Home/Home.css";

function Home() {
const [latest, setLatest] = useState("");
// const [author, setAuthor] = useState("");

useEffect(() => {
    axios.get(`/blog/latest`)
    .then((article) => {
        console.log(article);
        setLatest(article.data);
        // setAuthor(latest[i].owner);
    })
    .catch((error) => {
        console.log(error);
    })
}, []);
console.log(latest);
// console.log(author);

    return (
                <div className="articleBody">

                    <div className="mainLeft" >
                        <div className="title"> Blogger In Development </div>
                        <div className="aboutBlog"> Typewriter keytar freegan distillery DIY chambray. Williamsburg offal austin blog slow-carb. Cardigan authentic celiac, ramps swag pok pok ethical venmo craft beer. Jianbing etsy tacos mumblecore lyft VHS seitan polaroid. Flexitarian tattooed dreamcatcher jianbing four dollar toast succulents selvage narwhal cloud bread.

Flannel tbh gochujang subway tile, chillwave hella marfa schlitz. Taxidermy ramps green juice, banh mi chillwave before they sold out roof party. Celiac microdosing taiyaki williamsburg mlkshk shaman lomo chillwave wolf blog paleo cronut gentrify. Echo park artisan kickstarter af pickled flexitarian mustache leggings narwhal crucifix tacos. Next level prism mumblecore migas, everyday carry pug helvetica umami vegan kitsch leggings direct trade flannel health goth hammock. Neutra authentic craft beer chicharrones kitsch. Normcore crucifix humblebrag try-hard hot chicken.
</div>
                    </div>

                    <div className="articlesRight">
                        <div className="articlesWelcome">
                            <h1 className="listTitle">Latest Blog Posts</h1>
                            <h3 className="listSummary">Take a look at some of our <br/>latest posts by our wonderful authors...</h3>
                        </div>
                        <div className="articleList">
                            {latest && (
                            latest.map((latest, i) => {
                                return (
                                    <div className="eachArticle" key={i}>
                                        <div className="articleTitle"> {latest.title} </div>
                                        <div className="articleTime"> {latest.createdAt} </div>
                                        <div className="articleText"> {latest.text} </div>
                                        <div className="articleOwner"> {latest.owner} </div>
                                    </div>
                                );})
                            )}
                            {/* {author && (
                            author.map((author, i) => {
                                return (
                                    <>
                                        <div className="articleAuthor" key={i}> - by {author.firstName} {author.lastName} </div>
                                    </>
                                );})
                            )}       */}
                         </div>    
                    </div>

                </div>
    );
};

export default Home;
