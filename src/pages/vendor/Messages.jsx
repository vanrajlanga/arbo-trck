import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Search,
    Send,
    Phone,
    Video,
    MoreHorizontal,
    PaperclipIcon,
    Image,
    Smile,
} from "lucide-react";

// Mock conversations data
const CONVERSATIONS = [
    {
        id: 1,
        name: "Rahul Sharma",
        avatar: "",
        lastMessage: "Hello, I have a question about the Dandeli trek",
        timestamp: "10:30 AM",
        unread: 2,
    },
    {
        id: 2,
        name: "Priya Patel",
        avatar: "",
        lastMessage: "Can you provide more details about the accommodation?",
        timestamp: "Yesterday",
        unread: 0,
    },
    {
        id: 3,
        name: "Amit Kumar",
        avatar: "",
        lastMessage: "Thank you for the information!",
        timestamp: "Yesterday",
        unread: 0,
    },
    {
        id: 4,
        name: "Sneha Verma",
        avatar: "",
        lastMessage: "Is it possible to reschedule our trek?",
        timestamp: "Mon",
        unread: 1,
    },
    {
        id: 5,
        name: "Kamal Nath",
        avatar: "",
        lastMessage: "What equipment should we bring for the trek?",
        timestamp: "Sun",
        unread: 0,
    },
];

// Mock messages for selected conversation
const MESSAGES = [
    {
        id: 1,
        senderId: 1,
        sender: "Rahul Sharma",
        content: "Hello, I have a question about the Dandeli trek",
        timestamp: "10:30 AM",
        isUser: false,
    },
    {
        id: 2,
        senderId: "me",
        sender: "Me",
        content: "Hi Rahul, how can I help you with the Dandeli trek?",
        timestamp: "10:32 AM",
        isUser: true,
    },
    {
        id: 3,
        senderId: 1,
        sender: "Rahul Sharma",
        content:
            "I wanted to know what's the difficulty level of this trek? Is it suitable for beginners?",
        timestamp: "10:33 AM",
        isUser: false,
    },
    {
        id: 4,
        senderId: "me",
        sender: "Me",
        content:
            "The Dandeli Adventure Trek is rated difficulty. It's suitable for beginners with reasonable fitness levels. There are some uphill sections, but the pace is comfortable and we take frequent breaks.",
        timestamp: "10:35 AM",
        isUser: true,
    },
    {
        id: 5,
        senderId: 1,
        sender: "Rahul Sharma",
        content:
            "That sounds good. How about the weather in June? I'm planning to book for June 15th.",
        timestamp: "10:38 AM",
        isUser: false,
    },
    {
        id: 6,
        senderId: "me",
        sender: "Me",
        content:
            "June is the beginning of monsoon season in Dandeli. You can expect occasional showers, but we provide rain gear. The forests are lush green during this time which makes for a beautiful experience.",
        timestamp: "10:40 AM",
        isUser: true,
    },
    {
        id: 7,
        senderId: 1,
        sender: "Rahul Sharma",
        content: "Great! One last question - what about food arrangements?",
        timestamp: "10:42 AM",
        isUser: false,
    },
];

const VendorMessages = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedConversation, setSelectedConversation] = useState(
        CONVERSATIONS[0]
    );
    const [newMessage, setNewMessage] = useState("");

    // Filter conversations based on search term
    const filteredConversations = CONVERSATIONS.filter((conversation) => {
        return conversation.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // In a real app, this would send the message to the API
            console.log(
                `Sending message to ${selectedConversation.name}: ${newMessage}`
            );
            setNewMessage("");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Messages</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
                {/* Conversations sidebar */}
                <Card className="md:col-span-1 overflow-hidden flex flex-col">
                    <div className="p-3 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search conversations"
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`p-3 border-b flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
                                    selectedConversation.id === conversation.id
                                        ? "bg-gray-50"
                                        : ""
                                }`}
                                onClick={() =>
                                    setSelectedConversation(conversation)
                                }
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={conversation.avatar} />
                                    <AvatarFallback>
                                        {conversation.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <div className="font-medium truncate">
                                            {conversation.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {conversation.timestamp}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                        {conversation.lastMessage}
                                    </div>
                                </div>
                                {conversation.unread > 0 && (
                                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                        {conversation.unread}
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Chat window */}
                <Card className="md:col-span-2 flex flex-col overflow-hidden">
                    {selectedConversation ? (
                        <>
                            {/* Chat header */}
                            <div className="p-3 border-b flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={selectedConversation.avatar}
                                        />
                                        <AvatarFallback>
                                            {selectedConversation.name.charAt(
                                                0
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">
                                            {selectedConversation.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Online
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Video className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Chat messages */}
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                                {MESSAGES.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${
                                            message.isUser
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] ${
                                                message.isUser
                                                    ? "bg-blue-500 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg"
                                                    : "bg-gray-100 text-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg"
                                            } px-4 py-2`}
                                        >
                                            <div className="text-sm">
                                                {message.content}
                                            </div>
                                            <div
                                                className={`text-xs mt-1 ${
                                                    message.isUser
                                                        ? "text-blue-100"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {message.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat input */}
                            <div className="p-3 border-t">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <PaperclipIcon className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Image className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Smile className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        className="bg-aorbo-teal hover:bg-aorbo-teal/90"
                                        size="icon"
                                        onClick={handleSendMessage}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-gray-400 mb-2">
                                    Select a conversation to start chatting
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default VendorMessages;
