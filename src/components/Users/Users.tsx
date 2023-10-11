import React, { useEffect } from 'react';
import Pagination from '../common/Pagination/Pagination.tsx'
import User from './User/User.tsx';
import { UsersSearchForm } from './UsersSearchForm.tsx';
import { filterType, getUsers } from 'redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProcess, getPageSize, getStateUsersReselect, getTotalUsersCount, getUsersFilter } from 'redux/usersSelectors.ts';
import { appDispatch } from 'redux/storeRedux.ts';
import { follow, unfollow } from './../../redux/usersReducer';
import { useSearchParams } from 'react-router-dom';

type propsType = {
	
}

const Users: React.FC<propsType> = (props) => {

	const users = useSelector(getStateUsersReselect)
	const totalUsersCount = useSelector(getTotalUsersCount)
	const pageSize = useSelector(getPageSize)
	const currentPage = useSelector(getCurrentPage)
	const filter = useSelector(getUsersFilter)
	const followingInProcess = useSelector(getFollowingInProcess)

	const dispatch = useDispatch<appDispatch>()
	//для анализа url
	const [searchParams, setSearchParams] = useSearchParams() //также как и useState объявляем переменную и функцию для ее изменения

	useEffect(() => { //анализируем строку браузера на наличие фильтров и диспатчим санку со стандартными или введенными значениями
		const result: any = {}
		// @ts-ignore
		for (const [key, value] of searchParams.entries()) { // берем ключ значение из url
			let typedValue: any = +value; // временная переменная которой присваиваем значение превращенное в число
			if(typeof typedValue === 'number') { //если значение - число, значит это номер страницы потому сразу присваиваем
				result[key] = value
			} else if (typeof value === 'string') { // если значение не число то это строка
				switch (value) { // в которой значения: 'true' или 'false' или строка из поиска
					case 'true': // если пришло 'true' значит значение из friend
						result[key] = true; // меняем string на bool сохраняя значение
						break;
					case 'false': // если пришло 'false' значит значение из friend
						result[key] = false; // меняем string на bool сохраняя значение
						break;
					default: // если пришло не 'true' и не 'false' значит значение из строки поиска
						result[key] = value; // присваиваем ничего не меняя
				}
			}
		}
		// если пришли новые значения из url после определения того какие значения пришли
		// диспатчим getUsers с новыми параметрами 
		// если новых параметров нет присваиваем из state - часть после "или" (вторая часть тернарного выражения)
		let actualPage = result.page || currentPage
		let term = result.term || filter.term
		let friend = result.friend || filter.friend
		// в случае если result.friend = false, без условия у нас установится значение filter.friend = null
		// потому делаем условие
		if (result.friend === false) {
			friend = result.friend
		}
		const actualFilter = {term, friend}
		//при диспатче идет get запрос а также устанавливается filter и actualPage в state
		dispatch(getUsers(actualPage, pageSize, actualFilter)) 
		// eslint-disable-next-line
 }, [])

	useEffect(() => { //формируем новую строку браузера если меняется filter или currentPage
		const term = filter.term
		const friend = filter.friend
		let urlQuery =
			(term === '' ? '' : `&term=${term}`)
			+ (friend === null ? '' : `&friend=${friend}`)
			+ (currentPage === 1 ? '' : `&page=${currentPage}`)
		setSearchParams(urlQuery) //формируем новую строку браузера
 }, [filter, currentPage, setSearchParams]) //если меняется filter или currentPage


	const onPageChanged = (currentPageNumb: number) => {
		dispatch(getUsers(currentPageNumb, pageSize, filter))
	}
	const onFilterChanged = (filter: filterType) => {
		dispatch(getUsers(1, pageSize, filter))
	}
	const onFollow = (userId: number) => {
		dispatch(follow(userId))
	}
	const onUnFollow = (userId: number) => {
		dispatch(unfollow(userId))
	}

	return <div>
		<UsersSearchForm onFilterChanged={onFilterChanged} />
		<Pagination
			totalItemsCount={totalUsersCount}
			pageSize={pageSize}
			currentPage={currentPage}
			onPageChanged={onPageChanged}
		/>
		{ users.map( user =>
			<User
				key={user.id}
				user={user}
				followingInProcess={followingInProcess}
				unfollow={onUnFollow}
				follow={onFollow}
			/>
		)}
	</div>
}

export default Users;


