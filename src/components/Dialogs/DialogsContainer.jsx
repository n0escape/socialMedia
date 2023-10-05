//import React from "react";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { actions } from '../../redux/dialogReducer.ts';


let mapStateToProps = (state, props) => {
	return{
		dialogsPage: state.contentBar.dialogsPage
	}
}

let mapDispatchToProps = (dispatch) => {
	return{
		addMessage: (newMessageText) => { dispatch(actions.addMessageActionCreator(newMessageText)) }
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect,
)(Dialogs)