import React, { useState } from 'react';

function LoginSample() {
    const [getN, setN] = useState("Enter Data");
    return (
        <div>
            <form>
                <input type='text' value={getN} onChange={(data) => {
                    console.log(data.target.value);
                    setN(data.target.value);
                }} />
                <input type='submit' value='Submit' onClick={() => {
                    alert(getN);
                }} />
            </form>
        </div>
    );
}

export default LoginSample;