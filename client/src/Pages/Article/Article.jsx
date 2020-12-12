import React, { useState, useEffect } from 'react';

const Article = ({match}) => {

    const [article, setArticle] = useState({});
  
    useEffect(() => {
      fetch(`/articles/${match.params.articleId}`)
        .then(response => response.json())
        .then(article => setArticle(article))
        .catch(error => alert(error));
    });

    return(
        <div>
        <article>

            <div className="left">
                <h1>{article.title}</h1>
                <p>{article.text}</p>
            </div>

            <div className="right">
                <img src= {article.image} />
            </div>

        </article>
        
        <div className="commentsSection">
                {comment && (
                    comment.map((comment) => {
                        return (
                            <div className="eachComment">
                                <div className="left">
                                    <img src={comment.member.avatar} src="http://placehold.it/" alt="commenter's avatar" />
                                    <div className="commenterUsername">{comment.member.username}</div>
                                    <div className="commentTimestamp">{comment.member.timestamp}</div>
                                </div>
                                <div className="right"> {comment.text} </div>
                            </div>
                        );})
                    )};
            </div>


        </div>
      );
};

export default Article