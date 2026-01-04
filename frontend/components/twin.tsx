'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // const response = await fetch('http://localhost:8000/chat', {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300">
            {/* Premium Header */}
            <div className="relative bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white p-5 md:p-6 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
                <div className="relative flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-xl ring-2 ring-white/30 overflow-hidden transition-transform duration-300 hover:scale-105">
                        <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-bold tracking-tight">Chat with Nagarjun's Twin</h2>
                        <p className="text-xs md:text-sm text-white/90 font-medium mt-1">AI-Powered Digital Assistant</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-slate-50/50 via-gray-50/30 to-white/50">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                        <div className="relative mb-6 group">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl ring-2 ring-slate-200/60 overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:scale-105">
                                <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Welcome</h3>
                        <p className="text-sm md:text-base text-slate-600 max-w-md">
                            How can I help you today?
                        </p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0">
                                <div className="w-9 h-9 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-200/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                                    <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[75%] md:max-w-[80%] rounded-xl p-4 md:p-5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 ${
                                message.role === 'user'
                                    ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800'
                                    : 'bg-white/95 backdrop-blur-sm border border-slate-200/70 text-slate-800 hover:border-slate-300'
                            }`}
                        >
                            <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{message.content}</p>
                            <p
                                className={`text-xs mt-2 font-medium opacity-70 ${
                                    message.role === 'user' ? 'text-white' : 'text-slate-500'
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString()}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0">
                                <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-300/60 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                    <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start animate-fade-in">
                        <div className="flex-shrink-0">
                            <div className="w-9 h-9 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-200/40 overflow-hidden animate-pulse">
                                <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/70 rounded-xl p-4 md:p-5 shadow-lg">
                            <div className="flex space-x-2">
                                <div className="w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full animate-bounce" />
                                <div className="w-2.5 h-2.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                                <div className="w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Premium Input */}
            <div className="border-t border-slate-200/60 p-5 md:p-6 bg-white/70 backdrop-blur-lg shadow-inner">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask a question..."
                        className="flex-1 px-5 md:px-6 py-3 md:py-4 border border-slate-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:border-slate-400/60 text-slate-800 bg-white/95 placeholder-slate-400 text-sm md:text-base shadow-sm transition-all duration-300 hover:border-slate-400/60"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="px-5 md:px-7 py-3 md:py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}