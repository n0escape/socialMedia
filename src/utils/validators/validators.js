export const required = value =>{
	if(!value) return 'Field is required'; return undefined
}
export const maxLengthCreator = maxValue => value => {
	if(value && value.length > maxValue ) return `Max length is ${maxValue} symbols`; return undefined
}