import './About.css';
import { Link as LinkUp } from 'react-router-dom';
import { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='About'>
            <span className='created_by'>Yael Krigman |  <a className="about_link"
                href="mailto:yaelkrig@gmail.com"
                rel="noreferrer"
                target={"_blank"}>Contact Me | </a>
                <LinkUp to={'/about'} color="inherit" className="about_link" >
                    About Me
                </LinkUp>
            </span>
        </div>
    )

}
export default About;