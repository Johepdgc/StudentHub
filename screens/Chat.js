import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ip = "192.168.1.29";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://${ip}:8000`);
        ws.onopen = () => console.log('connected');
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(previousMessages => GiftedChat.append(previousMessages, message));
        };
        ws.onerror = (error) => console.log(error);
        ws.onclose = () => console.log('disconnected');
        setWs(ws);
        return () => ws.close();
    }, []);

    const onSend = newMessages => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        if (ws) {
            ws.send(JSON.stringify(newMessages[0]));
        }
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={{
                _id: 1,
            }}
        />
    );
};

export default Chat;