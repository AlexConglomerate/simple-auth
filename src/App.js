import {ToastContainer} from "react-toastify";
import Request from "./components/request";
import AuthForm from "./components/authForm";

function App() {

    return (
        <div className={'m-5'}>
            <h1 className=" text-3xl text-amber-800 mb-5"> Authorization practice </h1>
            <div className={' flex flex-row h-[800px] '}>
                <AuthForm/>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default App;
