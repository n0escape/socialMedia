import React from "react";
import s from "./User.module.css";
import usersPhoto from './../../../assets/images/users.png'
import { NavLink } from "react-router-dom";
import { userType } from "types/types";

type propsType = {
	user: userType
	followingInProcess: Array<number>
	unfollow: (userId: number) => void,
	follow: (userId: number) => void
}

const User: React.FC<propsType> = ({user, followingInProcess, unfollow, follow}) => {	
	return <div key={user.id} className={s.usersItem}>
		<span>
			<div>
				<NavLink to={'/profile/' + user.id}>
					<img src={user.photos.small != null ? user.photos.small : usersPhoto } className={s.userPhoto} alt='userPhoto'/>
				</NavLink>
			</div>
			<div> 
				{ user.followed
				? <button disabled={
					followingInProcess.some(id=> id===user.id)} onClick={ () => { unfollow(user.id) } 
				}> unFollow </button>
				: <button disabled={
					followingInProcess.some(id=> id===user.id)} onClick={ () => { follow(user.id) } 
					}> Follow </button> }
			</div>
		</span>
		<span>
			<span className={s.infoContainer}>
				<div className={s.userName}> {user.name} </div>
				<div className={s.userStatus}> {user.status} </div>
			</span>
			{/* <span>
				<div> {"user.location.country"} </div>
				<div> {"user.location.city"} </div>
			</span> */}
		</span>
	</div> 
}

export default User;