import React from 'react'
import { AiOutlineGoogle, AiFillApple } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';

function Login() {
    const onSuccess = (googleUser) => {
        console.log('Logged in as: ' + JSON.parse(JSON.stringify(googleUser.getBasicProfile().getName())));
    };

    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
    });

    const onFailure = (error) => {
        console.log(error, 'this is error');
    };

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        localStorage.setItem('dataKey', JSON.stringify(jsonPayload));
        return JSON.parse(jsonPayload);
    };

    const responseFacebook = (response) => {
        // console.log(response);
        localStorage.setItem('dataKey', JSON.stringify(response));
    }

    return (
        <div className='flex items-center justify-center h-screen bg-indigo-700'>
            <section className=" dark:bg-gray-900 w-80 rounded-md   px-8 py-4">
                <div className='flex flex-col space-y-4 my-3'>

                    <div className='bg-my_color py-2 float-right rounded-xl'>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(">>>>>>>>>>>>>", parseJwt(credentialResponse.credential));
                                // console.log(credentialResponse)

                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <div className='bg-my_color py-2 float-right rounded-xl'>
                        <FacebookLogin
                            appId="784170523224460"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="my-facebook-button-class"
                            className='bg-my_color py-2 float-right rounded-xl'
                            icon="fa-facebook"
                        /></div>

                    {/*<button className='bg-my_color py-2 float-right rounded-xl' > <span> <AiFillApple className='float-left mt-1 ml-6 text-xl' /></span> Signup with Apple</button>*/}

                    {/*<button className='bg-my_color py-2 float-right rounded-xl' > <span> <BsFacebook className='float-left mt-1 ml-6 text-xl' /></span> Signup with Facebook</button>*/}

                </div>
            </section >
        </div >
    )
}

export default Login