import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export const ChatbotButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] h-[450px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg"
                    >
                        {/* Header */}
                        <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                    I
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Iris</h3>
                                    <p className="text-[10px] text-blue-100 italic">OptaNex AI Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <div className="flex flex-col gap-1">
                                <div className="bg-muted p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm">
                                    Hi I'm IRIS. How can I help you?
                                </div>
                                <span className="text-[10px] text-muted-foreground ml-1">Iris</span>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    disabled
                                />
                                <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-9 w-9 shrink-0" disabled>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
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
