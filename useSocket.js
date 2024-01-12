// socket hook => frontend

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
    const [id, setid] = useState(null)
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Connected to server.', socket.id);
            setid(socket.id)

        });

        socket.on('message', (message) => {
            console.log(message);
        });

        socket.on('error', (error) => {
            console.error('Socket connection error:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, [
        setSocket,
        
    ]);

    return socket;
};

export default useSocket;
