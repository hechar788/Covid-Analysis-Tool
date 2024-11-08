import GlobeSVG from '../../assets/svg/globe_svg.jsx'
import StatSVG from '../../assets/svg/statistics.jsx'
import { Link } from 'react-router-dom'
import '../../styles/home/selection.css'

export default function Selection(){
    return (
        <div className="selection-parent">
            <Link to="/analysis-tool">
            <div className="selection-child">
                <GlobeSVG />
                <p>This is the 3D Global Analysis Tool. It is extremely useful for visualizing worldwide Covid-19 statistics</p>
            </div>
            </Link>

            <div className="vertical"></div>
            <Link to="/stats">
            <div className="selection-child">
                <StatSVG />
                <p>This is the Statistics page. It is a more basic display of the data and useful for quick insights</p>
            </div>
            </Link>
        </div>
    )
}