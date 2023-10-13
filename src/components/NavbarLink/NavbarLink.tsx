import React from 'react'
import { NavLink } from "react-router-dom"
import {
	UserOutlined,
	CommentOutlined,
	TeamOutlined,
	ToolOutlined,
	CustomerServiceOutlined,
	TabletOutlined
} from '@ant-design/icons';

let icons: any = {
	profile: <UserOutlined />,
	dialogs: <CommentOutlined />,
	users: <TeamOutlined />,
	settings: <ToolOutlined />,
	music:<CustomerServiceOutlined />, 
	news:<TabletOutlined />,
}

type linkPropsType = {
	path: string
	iconName: string
}
export const NavbarLink: React.FC<linkPropsType> = ({path, iconName}) => {
	let icon: any = icons[iconName]
	return <div>
		{icon}
		<NavLink to={path}/>
	</div>
}