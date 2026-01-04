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
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            {/* Glassmorphism Header */}
            <div className="relative backdrop-blur-md bg-white/40 border-b border-white/20 p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">Nagarjun's Digital Twin</h2>
                        <p className="text-xs md:text-sm text-gray-600 font-medium mt-0.5">AI-Powered Assistant</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-gradient-to-b from-white/50 to-white/30">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <div className="relative mb-12 group">
                            <div className="relative w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl ring-1 ring-black/5 overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:scale-105">
                                <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Welcome</h3>
                        <p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
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
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md ring-1 ring-black/5 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                                    <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[75%] md:max-w-[80%] rounded-2xl p-4 md:p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
                                message.role === 'user'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white/95 backdrop-blur-sm text-gray-900 ring-1 ring-black/5'
                            }`}
                        >
                            <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                            <p
                                className={`text-xs mt-2 font-medium ${
                                    message.role === 'user' ? 'text-white/50' : 'text-gray-400'
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString()}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0">
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-md ring-1 ring-black/5 transition-all duration-300 hover:shadow-lg hover:scale-105">
                                    <User className="w-5 h-5 md:w-5.5 md:h-5.5 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start animate-fade-in">
                        <div className="flex-shrink-0">
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md ring-1 ring-black/5 overflow-hidden animate-pulse">
                                <img src="/avatar.jpeg" alt="Assistant" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="bg-white/95 backdrop-blur-sm ring-1 ring-black/5 rounded-2xl p-4 md:p-5 shadow-sm">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Modern Floating Input */}
            <div className="p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="relative flex items-center gap-2 bg-white rounded-full shadow-lg ring-1 ring-black/5 px-5 py-3 transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-blue-500/20">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask a question..."
                            className="flex-1 px-2 py-2 bg-transparent text-gray-900 placeholder-gray-400 text-sm md:text-base focus:outline-none"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className={`p-2.5 rounded-full transition-all duration-300 ${
                                input.trim() && !isLoading
                                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Send className="w-4.5 h-4.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}