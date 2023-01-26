import React, {useState} from 'react';

function AuthForm(props) {
    const [email, setEmail] = useState('hello@ggmail.com');
    const [password, setPassword] = useState('123123');
    const cell = ' p-1 border-[0.5px] border-cyan-800 w-24 '
    const cell2 = ' p-1 border-[0.5px] border-cyan-800 w-36 '
    const btn = ' bg-yellow-300 p-2 m-2 rounded-lg hover:bg-yellow-400 '


    const handleEmail = (e) => {
        const {value} = e.target
        setEmail(value)
    }
    const handlePassword = (e) => {
        const {value} = e.target
        setPassword(value)
    }
    const handleClick = () => {
        const obj = {email, password}
        console.log(obj)
        return obj
    }

    return (
        <div className={'border-2 border-cyan-800 m-5 p-5 w-min'}>
            <div className={'flex flex-row'}>
                <div className={cell}>Login</div>
                <input className={cell2} value={email} onChange={(e) => handleEmail(e)}/>
            </div>
            <div className={'flex flex-row'}>
                <span className={cell}>Password</span>
                <input className={cell2} value={password} onChange={(e) => handlePassword(e)}/>
            </div>
            <button className={btn + ' mt-5 '} onClick={handleClick}>Зарегистрироваться</button>
        </div>
    );
}

export default AuthForm;