import React from "react";
import s from './Post.module.css';
import usersPhoto from './../../../../assets/images/users.png'
import { userProfileType } from "types/types";

type propsType = {
	userProfile: userProfileType | null
	message: string
	likeCounter: number
	currUserId: number | null
	currPostId: string
	deletePost: (currUserId: number | null, currPostId: string) => void
}

const Post: React.FC<propsType> = ({userProfile, message, likeCounter, currUserId, currPostId, deletePost}) => {

	if (userProfile != null) return(
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