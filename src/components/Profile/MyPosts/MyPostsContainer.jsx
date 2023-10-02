import { addNewPostJSON, deletePostJSON } from "../../../redux/profileReducer.ts";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";


let mapStateToProps = (state) => {
	return{
		posts: state.contentBar.profilePage.posts,
		newPostText: state.contentBar.profilePage.newPostText,
		userProfile: state.contentBar.profilePage.userProfile
	}
}

export default connect(mapStateToProps, {addNewPostJSON, deletePostJSON})(MyPosts);