import headerDark from '../../assets/header.webp'
import '../../styles/home/header.css'

export default function Header(){
    return (
        <>
        <img className="header-img" src={headerDark} />
        <h1 className="header-text">Covid-19 Global Analysis Tool</h1>
        </>
    )
}