import { appStateType } from "redux/storeRedux.ts";
import { addNewPostJSON, deletePostJSON } from "../../../redux/profileReducer.ts";
import MyPosts from "./MyPosts.tsx";
// import MyPosts, { mapDispatchType, mapPropsType, ownPropsType } from "./MyPosts.tsx";
import { connect } from "react-redux";
import { postType, userProfileType } from "types/types.ts";

let mapStateToProps = (state: appStateType) => ({
  posts: state.contentBar.profilePage.posts,
  userProfile: state.contentBar.profilePage.userProfile,
});

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


export default connect<mapPropsType, mapDispatchType, ownPropsType, appStateType>(
	mapStateToProps,
	{addNewPostJSON, deletePostJSON}
)(MyPosts);

