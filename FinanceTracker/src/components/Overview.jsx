import Sidebar from "./Sidebar.jsx"
import "./Overview.css"
export default function Overview(){
    const userId = localStorage.getItem('userId');
    return(
        <div className="Overview">
            <Sidebar/>
        </div>
    )
}