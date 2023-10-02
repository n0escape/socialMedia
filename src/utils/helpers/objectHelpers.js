//проходит по всем элементам массива и изменяет определенный параметр в элементе с совпадающим itemId
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
	return items.map( item => {
		if (item[objPropName] === itemId) {
			return { ...item, ...newObjProps }
		}
		return item;
	} )
}