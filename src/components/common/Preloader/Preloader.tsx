import React from "react"
import preloader from '../../../assets/images/preloader.svg'
import s from './Preloader.module.css'

type propsType = {

}

const Preloader: React.FC<propsType> = (props) => {
	return <div>
			<img className={s.preloaderContainer} src={preloader} alt='preloader'/>
		</div>
}

export default Preloader