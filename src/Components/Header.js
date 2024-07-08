import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
    return (<div className="bg-gray-800 flex flex-row pl-3 items-center justify-items-center justify-between border-b-4 border-gray-700">
        <FontAwesomeIcon icon={faBars} onClick={() => props.togglemenu(!props.menu)} className="text-slate-200 text-2xl"/>
        <h1 className="text-slate-200 text-2xl text-center font-bold pl-16">Chat App</h1>
        <button className="bg-zinc-950 py-2 w-20 m-3 rounded text-normal text-slate-200" onClick={() => props.update(false)}>Logout</button>
    </div>);
}
export default Header;