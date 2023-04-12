import React, { useState, useEffect } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { MdSend } from 'react-icons/md'
import io from 'socket.io-client'

const Chatroom = () => {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState([])
    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [chat]);

    useEffect(() => {
        if (socket) {
            socket.on('message', (data) => {
                console.log('Received message:', data);
                let newarr = []
                newarr = chat
                newarr.push(data)
                setChat(...[newarr])
                console.log('chat', chat)
            });

        }
    }, [socket]);

    const sendMessage = () => {
        console.log('message', message)
        if (socket) {
            socket.emit('chat message', message);
            setMessage('');
            setMessage('')
        }
    };
    return (
        <div className='flex relative items-center justify-center h-screen bg-indigo-700'>
            <div className='flex flex-col  '>
                <div className=' overflow-auto h-128 w-128 border bg-slate-900 rounded-xl'>
                    <div className='flex justify-center'>
                        <img class="rounded-full w-32 h-32 mt-4" src={`https://lh3.googleusercontent.com/a/AGNmyxZ0A4czA-Nj-GII1xzqMFktzLrOFOYXZ4VahIJO=s96-c`} alt="Rounded avatar" />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-start'>
                            <div className="flex flex-col">
                                {
                                    chat.length ?
                                        chat.map((msg) => {
                                            return <div className='h-auto ml-2 w-64 mt-4 text-white bg-sender rounded'>
                                                <h1 className='font-bold py-1'>
                                                    {msg}
                                                </h1>
                                            </div>
                                        }) : ''
                                }
                            </div>
                        </div>
                        <div className='flex justify-end '>
                            <div className='h-auto mr-2 w-64 mt-4 rounded bg-reciver'>
                                <h1 className='font-bold py-1'>
                                    hello world
                                </h1>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex justify-center space-x-8  mt-3 '>
                    <div className='flex-none w-14 text-4xl ml-2 mt-1 '>
                        <HiPlusCircle className='fill-reciver  cursor-pointer hover:fill-orange-300' />
                    </div>
                    <div className=' flex-grow '>
                        <div class="relative w-full">
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className='flex-none w-14 text-4xl ml-2'>
                        <MdSend onClick={sendMessage} className='fill-yellow-400 cursor-pointer hover:fill-yellow-500' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatroom