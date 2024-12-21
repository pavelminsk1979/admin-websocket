import React, {useEffect, useState} from 'react';
import './App.css';
import io, {Socket} from 'socket.io-client'
//import axios, {options} from 'axios'

const socketIoApi = {
    socket: null as null | Socket,

    createConnection() {
        const options = {
            extraHeaders: {
                token: '123',
                roomKey: 'test_room'
            }
        }
        //тут подключение к бэку
        this.socket = io('http://localhost:3010',options)

        this.socket.on('connect',()=>{
            console.log('connect')
        })

        this.socket.on('disconnect',(e)=>{
            console.log(e)
            console.log('disconnect')
        })
    }


}

function App() {

    const [text,setText]= useState('')
    const [error,setError]= useState('')
    const [eventPath,setEventPath]= useState('')

    const connectSocket = () => {

        socketIoApi.createConnection()

        socketIoApi.socket?.on('andmin-path',(data:any)=>{
            console.log('andmin-path',data)
            setEventPath(JSON.stringify(data))
        })

        socketIoApi.socket?.on('unautorized',(data:any)=>{
            console.log('error',data)
            setEventPath(JSON.stringify(data))
        })

    }

    const handleOnClick = () => {
        socketIoApi.socket?.emit('admin-path',{value:text,id:'1'})
    }

    useEffect(()=>{
        connectSocket()
    },[])

    return (
        <div className="App">
            <h1>ADMIN</h1>
            <div>
                <input
                    value={text}
                onChange={(e)=>{setText(e.currentTarget.value)}}/>
                <button
                onClick={handleOnClick}>ОТПРАВИТЬ</button>
            </div>
        </div>
    );
}

export default App;
