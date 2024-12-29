import '../index.css';
import '../scss/nav-bar.scss';
import githubIcon from '../assets/github.svg';

function NavBar(){
    return(
        <>
        <div className="nav-bar">
            <div className="name pt-sans"><a href="https://itish2003io-itish-srivastavas-projects.vercel.app/">Itish Srivastava</a></div>
            <a href="https://github.com/Itish2003"><img className="github" src={githubIcon} alt="github icon"/></a>
        </div>
        </>
    )
}

export default NavBar;