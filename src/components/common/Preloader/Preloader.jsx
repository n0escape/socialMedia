import React from "react"
import preloader from '../../../assets/images/preloader.svg'
import s from './Preloader.module.css'

const Preloader = (props) => {
	return <div>
			<img className={s.preloaderContainer} src={preloader} alt='preloader'/>
		</div>
}

export default Preloader