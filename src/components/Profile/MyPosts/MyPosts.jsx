import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { AddingTextReduxForm } from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo( ({posts, userProfile, currUserId, addNewPostJSON, deletePostJSON}) => {
	// console.log("render") //render 4 times... 1-2 before api 2-3 after apis

	let addNewPost = (values) => {
		addNewPostJSON(values.newPostText, currUserId);
	}
	let deletePost = (currUserId, postId) => {
		deletePostJSON(currUserId, postId)
	}

	let postsElem = posts.map( p => <Post message={p.message} key={p.id} likeCounter={p.likeCounter} userProfile={userProfile} currUserId={currUserId} currPostId={p.id} deletePost={deletePost}/>);

	return(
		<div>
			<div className={s.postsBlock}>
				<h3>My posts</h3>
				<div className={s.newPost}>
					<AddingTextReduxForm 
						form="profileAddPost"
						onSubmit={addNewPost}
						textLength={20}
						textButton="Add post"
						fieldProps={{
							child: "textarea",
							placeholder: "Type new post",
							name: "newPostText",
							type: "text"
						}}
					/>
				</div>
			</div>
			<div className={s.posts}>
				{ postsElem }
			</div>
		</div>
	);
} )

export default MyPosts;