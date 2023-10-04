export type fieldValidatorType = (value: string) => string | undefined

export const required: fieldValidatorType = (value) =>{
	if(!value) return 'Field is required'; return undefined
}
export const maxLengthCreator = (maxValue: number): fieldValidatorType => (value) => {
	if(value && value.length > maxValue ) return `Max length is ${maxValue} symbols`; return undefined
}