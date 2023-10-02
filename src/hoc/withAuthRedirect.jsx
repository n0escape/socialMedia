import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";

let mapStateToPropsForRedirect = (state) => ({
	isAuth: state.auth.isAuth
})

// если авторизирован - то отображаем компоненту
// если не авторизирован и нет данных пользователя (props.router) - логинизация
// если не авторизирован и нет юсер айди - то на логиниацию
// если не автооризирован но есть юсер айди - то отображаем компоненту (скорее всего это профиль)
// используем только в компонентах, которые хотим защитить авторизацией
export const withAuthRedirect = (Component) => {
	const RedirectComponent = (props) => {
		if(props.isAuth){
			return <Component {...props}/>
		}else if(!props.isAuth && !props.router){
			return <Navigate to='/login'/>
		}else {
			if(!props.isAuth && !props.router.params.userId){
				return <Navigate to='/login'/>
			} else {
				if(!props.isAuth && props.router.params.userId) return <Component {...props}/>
			}
		}
	}
	return compose(connect(mapStateToPropsForRedirect, {}))((RedirectComponent));
}