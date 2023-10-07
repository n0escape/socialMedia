import React from "react";
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { actions } from '../../redux/dialogReducer.ts';
import { appStateType } from "redux/storeRedux.ts";


let mapStateToProps = (state: appStateType) => {
	return{
		dialogsPage: state.contentBar.dialogsPage
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, { addMessage: actions.addMessage }),
	withAuthRedirect,
)(Dialogs)