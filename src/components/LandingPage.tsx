import '../index.css';
import '../scss/landing-page.scss';
import dreamImage from '../assets/home.svg';
function LandingPage(){
    return(
        <>
        <img className="dream-image" src={dreamImage} alt="Landing photo"/>
        </>
    )
}
export default LandingPage;