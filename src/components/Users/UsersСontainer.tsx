import React from 'react';
import { useSelector } from 'react-redux';
import Users from './Users.tsx';
import Preloader from '../common/Preloader/Preloader.tsx';
import { getIsFetching } from '../../redux/usersSelectors.ts';

type propsType = {

}

export const UsersPage: React.FC<propsType> = ({}) => {

	const isFetching = useSelector(getIsFetching)

	return <>
		{isFetching ? <Preloader /> : null}
		<Users/>
	</>
}