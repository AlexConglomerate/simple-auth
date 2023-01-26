import {ToastContainer} from "react-toastify";
import Request from "./components/request";
import CreateMockData from "./components/createMockData";
import AuthForm from "./components/authForm";

function App() {

    return (
        <>
            <h1 className="text-3xl hover:font-bold text-red-800"> Hello world! </h1>
            <AuthForm/>
            <CreateMockData/>
            <Request/>
            <ToastContainer/>
        </>
    );
}

export default App;
