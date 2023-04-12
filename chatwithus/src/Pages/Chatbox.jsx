import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Chatbox = () => {
    const [data, setData] = useState([])
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('new user', { name: data.name, picture: data.picture , email:data.email })
            socket.on('message', (data) => {
                console.log('Received message:', data);
            });
            socket.on('user', (data) => {
                console.log(`new user ${data.name}`)
                if (localStorage.USERS !== 'undefined' && localStorage.USERS) {
                    console.log('if')
                    let arr = JSON.parse(localStorage.USERS)
                    let flag = false;
                    for (var ele in arr) {
                        if (JSON.stringify(arr[ele]) === JSON.stringify(data)) {
                            flag = true;
                        }
                    }
                    if (flag !== true) {
                        arr.push(data)
                        localStorage.USERS = JSON.stringify(arr);
                        let storedNames = JSON.parse(localStorage.USERS);

                        console.log(`stored names ${storedNames}`)
                    }
                    let storedNames = JSON.parse(localStorage.USERS);
                    setUser(storedNames)
                    user.map((e)=>{
                        console.log('e',e['picture'])
                    })
                } else {
                    const arr = [];
                    arr.push(data);
                    const jsonArray = JSON.stringify(arr);
                    localStorage.setItem('USERS', jsonArray);
                    console.log(localStorage.getItem('USERS'))
                }

            })
        }
    }, [socket]);

    const sendMessage = () => {
        console.log('message', socket)
        if (socket) {
            socket.emit('new user', message);
            setMessage('');

        }
    };

    useEffect(() => {
        const data = JSON.parse(JSON.parse(localStorage.getItem('dataKey')))
        console.log(data.picture)
        setData(data)
    }, [user])
    
    const chatroom = (user)=>{
        console.log(user)
        navigate('/Chatbox/chat-room')
    }

    return (
        <div className='flex items-center justify-center h-screen bg-indigo-700'>
            <div style={{ display: 'none' }}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send Message</button>
            </div>
            <div className=' w-auto h-96  flex flex-col justify-center'>
                <div className='w-96 h-16 mt-4 flex rounded-2xl bg-white'>

                    {
                        user ?
                            user.map((e) => {
                                return e['picture'] !== data.picture ? <>
                                    <div class="relative mt-2 mb-2 ml-2">
                                        <img onClick={()=>chatroom(e)} class="w-10 h-10 border cursor-pointer rounded-full" src={e['picture']} alt="" />
                                        <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                    </div>

                                </> : ''
                            })
                            : ''
                    }
                </div>
                <div className='flex justify-center'>

                    <div className='flex justify-center w-72 h-auto mt-8 rounded-2xl bg-slate-900'>
                        <div className='flex flex-col justify-center '>
                            <div className='flex justify-center'>
                                {
                                    data ?
                                        <img class="rounded-full w-32 h-32 mt-4" src={`${data.picture}`} alt="Rounded avatar" />
                                        : ''
                                }

                            </div>
                            <div className='flex flex-col w-auto h-auto bg-white rounded-2xl mt-4 mb-4 '>
                                <div className='flex justify-center mt-5 text-slate-400'>
                                    <h2>{data ? data.name : 'user'}</h2>
                                </div>
                                <div className='flex justify-center pl-2 pr-2 text-slate-400 '>
                                    <p>{data ? data.email : ''}</p>
                                </div>
                                <div className='flex justify-center mt-3 mb-3'>
                                    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbox