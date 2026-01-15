import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface Message {
    role: "user" | "iris";
    content: string;
}

export const ChatbotButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "iris", content: "Hi I'm IRIS. How can I help you?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("https://iris-chatbot-ro1e.onrender.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userMessage }),
            });

            if (!response.ok) throw new Error("API call failed");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "iris", content: data.reply || "I'm sorry, I couldn't process that." }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, { role: "iris", content: "I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] sm:w-[400px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg"
                    >
                        {/* Header */}
                        <div className="p-4 bg-blue-600 text-white flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                                    I
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-base leading-tight">Iris</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <p className="text-[10px] text-blue-100 font-medium">OptaNex AI Assistant • Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/5 dark:bg-white/5">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1`}
                                >
                                    <div
                                        className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-background text-foreground rounded-tl-none border border-border"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground px-1 uppercase tracking-wider font-semibold opacity-70">
                                        {msg.role === "iris" ? "Iris" : "You"}
                                    </span>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex flex-col items-start gap-1">
                                    <div className="bg-background border border-border p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                        <span className="text-sm italic text-muted-foreground">Iris is thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-muted rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="rounded-full bg-blue-600 hover:bg-blue-700 h-10 w-10 shrink-0 shadow-md transition-all active:scale-95"
                                    disabled={isLoading || !inputValue.trim()}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-none transition-all duration-300 ${isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                        } text-white`}
                    title={isOpen ? "Close Chat" : "Chat with Iris"}
                >
                    {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
                </Button>
            </motion.div>
        </div>
    );
};
