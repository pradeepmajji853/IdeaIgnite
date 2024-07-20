import Sidebar from "./Sidebar.jsx"
import "./Overview.css"
import SWoverview from "./SWoverview.jsx"
export default function Overview(){
    const userId = localStorage.getItem('userId');
    return(
        <div className="Overview">
            {userId}
            <Sidebar/>
            <SWoverview/>
        </div>
    )
}