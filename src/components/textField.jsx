import React from "react";

const TextField = ({name, label, value, onChange}) => {
    const cell = ' p-1 border-[0.5px] border-cyan-800 w-24 '
    const cell2 = ' p-1 border-[0.5px] border-cyan-800 w-36 '
    return (
        <div className={'flex flex-row'}>
            <div className={cell} >{label}</div>
            <input
                className={cell2}
                value={value}
                onChange={onChange}
                // id={name}
                type={'text'}
                name={name}
            />
        </div>
    );
};


export default TextField;