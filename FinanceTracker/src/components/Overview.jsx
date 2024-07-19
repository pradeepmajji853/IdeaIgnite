import Sidebar from "./Sidebar.jsx"
import "./Overview.css"
import SWoverview from "./SWoverview.jsx"
export default function Overview(){
    return(
        <div className="Overview">
            <Sidebar/>
            <SWoverview/>
        </div>
    )
}