import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";
import { postType, userProfileType } from "types/types";

export type mapPropsType = {
	posts: Array<postType>
	userProfile: userProfileType | null
}
export type mapDispatchType = {
	deletePostJSON: (postId: string, currUserId: number | null) => void
	addNewPostJSON: (newPostText: string, currUserId: number | null) => void
}
export type ownPropsType = {
	currUserId: number | null
}
export type addPostFormValuesType = {
	newPostText: string
}

const MyPosts: React.FC<mapPropsType & mapDispatchType & ownPropsType> = ({posts, userProfile, currUserId, addNewPostJSON, deletePostJSON}) => {
	// console.log("render") //render 4 times... 1-2 before api 2-3 after apis

	let addNewPost = (values: addPostFormValuesType ) => {
		addNewPostJSON(values.newPostText, currUserId);
	}
	let deletePost = (currUserId: number | null, postId: string) => {
		deletePostJSON(postId, currUserId)
	}

	let postsElem = posts.map( p => <Post message={p.message} key={p.id} likeCounter={p.likeCounter} userProfile={userProfile} currUserId={currUserId} currPostId={p.id} deletePost={deletePost}/>);

	return(
		<div>
			<div className={s.postsBlock}>
				<h3>My posts</h3>
				<div className={s.newPost}>
					{/* <AddingTextReduxForm 
						form="profileAddPost"
						onSubmit={addNewPost}
						textLength={20}
						textButton="Add post"
						name= "newPostText"
					/> */}
					<AddPostForm onSubmit={addNewPost}/>
				</div>
			</div>
			<div className={s.posts}>
				{ postsElem }
			</div>
		</div>
	);
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo;