import React from 'react'
import s  from './ContactsList.module.css';
import Contact from './Contact'

const ContactsList = ({contacts}) => {
	if(!contacts) return <div> Zero contacts </div>
	const iconMapping = {
    facebook: '../../../../assets/images/socialNetworks/facebookIcon.png',
    vk: '../../../../assets/images/socialNetworks/vkIcon.png',
    github: '../../../../assets/images/socialNetworks/githubIcon.png',
    mainLink: '../../../../assets/images/socialNetworks/webIcon.png',
		instagram: '../../../../assets/images/socialNetworks/instagramIcon.png',
		twitter: '../../../../assets/images/socialNetworks/twitterIcon.png',
		website: '../../../../assets/images/socialNetworks/websiteIcon.png',
		youtube: '../../../../assets/images/socialNetworks/youtubeIcon.png'
    // Добавьте сюда другие ключи и соответствующие иконки
  };
	return (
		<div className={s.contactsList}>
			{
				Object.values(contacts).every( value => value === null || value === '' )
				? <div> Zero contacts </div>
				: Object.keys(contacts).map( key =>
					contacts[key] !== null && contacts[key] !== ''
					? <Contact key={key} contact={key} link={contacts[key]} icon={iconMapping[key]}/>
					: null)
			}
		</div>
	)
}

export default ContactsList
