import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Chatbox = () => {
    const [data, setData] = useState([])

    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        // return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('message', (data) => {
                console.log('Received message:', data);
            });
        }
    }, [socket]);

    const sendMessage = () => {
        console.log('message',socket)
        if (socket) {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    useEffect(() => {
        const data = JSON.parse(JSON.parse(localStorage.getItem('dataKey')))
        // console.log(data['picture'])
        setData(data)
    }, [])

    return (
        <div className='flex items-center justify-center h-screen bg-indigo-700'>
            <div>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send Message</button>
            </div>
            <div className=' w-auto h-96  flex flex-col justify-center'>
                <div className='w-96 h-16 mt-4 rounded-2xl bg-white'>
                    {
                        data ?
                            <img class="w-10 h-10 rounded-full ml-2 mt-3 border" src={`${data.picture}`} alt="Rounded avatar" />
                            : ''
                    }
                </div>
                <div className='flex justify-center'>

                    <div className='flex justify-center w-72 h-auto mt-8 rounded-2xl bg-slate-900'>
                        <div className='flex flex-col justify-center '>
                            <div className='flex justify-center'>
                                <img class="rounded-full w-32 h-32 mt-4" src="
                        https://i.pinimg.com/originals/8b/6e/c6/8b6ec60427f9b17c1d9aaf4c415babe3.png
                        " alt="Extra large avatar" />
                            </div>
                            <div className='flex flex-col w-40 h-auto bg-white rounded-2xl mt-4 mb-4 '>
                                <div className='flex justify-center mt-5 text-slate-400'>
                                    <h2>User1</h2>
                                </div>
                                <div className='flex justify-center text-slate-400 '>
                                    <p>user@mail.com</p>
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