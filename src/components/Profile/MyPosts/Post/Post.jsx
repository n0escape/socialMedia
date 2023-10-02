import React from "react";
import s from './Post.module.css';
import usersPhoto from './../../../../assets/images/users.png'

const Post = ({userProfile, message, likeCounter, currUserId, currPostId, deletePost}) => {

	return(
		<div className={s.item}>
			<div>
				<button onClick={()=>{deletePost(currUserId, currPostId)}}>Delete</button>
			</div>
			<div> 
				<img src={userProfile.photos.small != null 
				? userProfile.photos.small 
				: usersPhoto }
				alt='user avatar'/> 
			</div>
			{ message }
			<div>
				<span>Like </span>{ likeCounter }
			</div>
		</div>
	);
}

export default Post;