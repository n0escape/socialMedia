//import React from "react";
import Dialogs from "./Dialogs";
import { addMessageActionCreator } from "../../redux/dialogReducer.ts";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


let mapStateToProps = (state, props) => {
	return{
		dialogsPage: state.contentBar.dialogsPage
	}
}

let mapDispatchToProps = (dispatch) => {
	return{
		addMessage: (newMessageText) => { dispatch(addMessageActionCreator(newMessageText)) }
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect,
)(Dialogs)