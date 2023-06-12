"use client"
import {useEffect} from 'react';
import { useMessagesContext } from '@/context/Store';

export default function Messages() {
    const {messages, setMessages} = useMessagesContext();

    useEffect(() => {
        const timer = setTimeout(() =>{
            if (messages.length) {
                setMessages([])
            }
            console.log('message changing~~~~~~')
        }, 3000);
        return () => clearTimeout(timer);
    }, [messages]);
  return (
    <div className='messages'>
        {
            messages.map((m, index) => {
                return (
                    <div key={index} className={m.type === 'success'? 'success':m.type === 'error'?'error' : 'note'}>
                        {m.content}
                    </div>
                )
            })
        }
    </div>
  )
}
