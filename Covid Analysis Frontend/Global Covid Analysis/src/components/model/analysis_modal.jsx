import '../../styles/model/analysis_modal.css'
import graph from '../../assets/analysis_modal/fake-graph.png'

export default function AnalysisModal({ country, setIsPlusClicked }){
    // MODAL TO DISPLAY THE INDIVIDUAL COUNTRIES DATA AFTER THE PLUS HAS BEEN CLICKED 
    return (
        <div className="analysis-modal">
          <div className="analysis-modal-content">
            <h2>{country.country}</h2>

            <p style={{color: "white", width: "25vw"}}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Aliquet interdum tortor; varius non dignissim ac ut. Scelerisque et et sit curae aenean nisi. Imperdiet euismod consectetur massa, massa integer suspendisse duis. Finibus fusce himenaeos sem vehicula praesent orci. Taciti integer ut integer fames tempor sem inceptos pharetra augue.Lorem ipsum odor amet, consectetuer adipiscing elit.
            </p>

            <img style={{width: "75%"}} src={graph}/>

            <button onClick={()=>setIsPlusClicked(false)}>Close</button>
          </div>
        </div>
      )     
}