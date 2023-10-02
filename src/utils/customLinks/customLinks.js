import s from './customLinks.module.css'

export const activeLink = (tempIvent) => tempIvent.isActive ? s.active : s.disactive;