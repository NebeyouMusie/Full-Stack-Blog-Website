import React from 'react'
import './post.css'
import postImage from '/src/assets/blob-scene-haikei.svg'
import { Link } from "react-router-dom"

export default function Post({post}) {
  const PF = "http://localhost:5000/images/";
  console.log(post.photo);
  return (
    <div className='post'>
      {post.photo && (
        <img className="postImg" src={PF + post.photo} alt="Post Image" />
      ) }
        
        <div className="postInfo">
          <div className="postCategories">
            {post.categories.map((category) => {
              return (
              <span className="postCat">{category.name}</span>
              );
            })}
          </div>
          <Link to={`/post/${post._id}`} className='link'>
           <span className="postTitle">{post.title}</span>
          </Link>
          <hr />
          <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className='postDesc'>
          {post.desc}
        </p>
    </div>
  )
}
