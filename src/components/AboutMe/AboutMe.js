import './AboutMe.css';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Tooltip } from '@mui/material';

const AboutMe = () => {
    return (
        <div className='about_me_conteiner'>
            <h2 className='about_header'>About Me</h2>
            <p>My name is Yael Krigman, I live in Ofra. I am 21 years old. </p>
            <p>During 2021 I have learned Full Stack development at Beta Academy. </p>
            <p>This project was wroten with React, css using MUI, Youtube Api.
                The server wroten with Node.js using Express.
                And for Data Base- MongoDB using mongoose. </p>
            <p>I realy enjoyed during work on this project, hope you will too.</p>
            <p>Thankes for your time! </p>
            <div className='contact_icons'>
                <h4 className='contact_header'>Contact Me-</h4>
                <Tooltip title="E-Mail Me: yaelkrig@gnail.com" placement="right-start">
                    <a className="mail-link"
                        href="mailto:yaelkrig@gmail.com"
                        rel="noreferrer"
                        target={"_blank"}><MailOutlinedIcon className='about_icon' sx={{ fontSize: 50 }} /></a>
                </Tooltip>
                <Tooltip title="Call Me on 058-431-8513" placement="right-start">
                    <a href="tel:0584318513"> <PhoneIcon className='about_icon' sx={{ fontSize: 50 }} /></a>
                </Tooltip>
            </div>
            <div className='more_projects_con'>
                <p className='more_projects'>For More Of My Projects-</p>
                <Tooltip title="My GitHub" placement="right-start">
                    <a href='https://github.com/Yaelkrig'
                        rel="noreferrer"
                        target={"_blank"}><GitHubIcon className='about_icon' sx={{ fontSize: 50 }} /></a>
                </Tooltip>
                <Tooltip title="My Linkedin" placement="right-start">
                    <a href='www.linkedin.com/in/yael-krigman'
                        rel="noreferrer"
                        target={"_blank"}><LinkedInIcon className='about_icon' sx={{ fontSize: 50 }} /></a>
                </Tooltip>
            </div>

        </div>
    )
}
export default AboutMe;