import React, {useEffect, useState} from 'react';
import './App.css';
import io, {Socket} from 'socket.io-client'
import axios from 'axios';

const socketApi = {
    socket: null as null | Socket,

    createConnection() {

        const option = {
            extraHeaders: {
                token: '123'
            }
        }

        this.socket = io('http://localhost:3010/admin', option)

        this.socket.on('connect', () => {
        })


        this.socket.on('disconnect', (e) => {
        })
    }


}

function App() {

    const [text, setText] = useState('')
    const [error, setError] = useState('no error')

    const handleOnClick = () => {
        socketApi.socket?.emit('server-path', {value: text})
    }
    const handleSendHttp = async () => {
        await axios.post('http://localhost:3010/event', {participantId: '111'})
    }


    const connectSocket = () => {

        socketApi.createConnection()

        socketApi.socket?.on('error-path', (data) => {
            setError(JSON.stringify(data))
        })

        socketApi.socket?.on('client-path', (data) => {
            console.log(JSON.stringify(data))
        })
    }

    useEffect(() => {
        connectSocket()
    }, [])

    return (
        <div className="App">
            <h1>ADMIN</h1>
            <div>
                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.currentTarget.value)
                    }}/>
                <button
                    onClick={handleOnClick}>ОТПРАВИТЬ
                </button>
                <div>{error}</div>
                <br/>
                <br/>
                <button
                    onClick={handleSendHttp}>КНОПКА отправки по https соеденению
                </button>
            </div>
        </div>
    );
}

export default App;

