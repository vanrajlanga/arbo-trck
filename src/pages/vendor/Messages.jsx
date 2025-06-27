import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Video, MoreHorizontal, PaperclipIcon, Image, Smile } from "lucide-react";

// Mock conversations data
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const CONVERSATIONS = [{
  id: 1,
  name: "Rahul Sharma",
  avatar: "",
  lastMessage: "Hello, I have a question about the Dandeli trek",
  timestamp: "10:30 AM",
  unread: 2
}, {
  id: 2,
  name: "Priya Patel",
  avatar: "",
  lastMessage: "Can you provide more details about the accommodation?",
  timestamp: "Yesterday",
  unread: 0
}, {
  id: 3,
  name: "Amit Kumar",
  avatar: "",
  lastMessage: "Thank you for the information!",
  timestamp: "Yesterday",
  unread: 0
}, {
  id: 4,
  name: "Sneha Verma",
  avatar: "",
  lastMessage: "Is it possible to reschedule our trek?",
  timestamp: "Mon",
  unread: 1
}, {
  id: 5,
  name: "Kamal Nath",
  avatar: "",
  lastMessage: "What equipment should we bring for the trek?",
  timestamp: "Sun",
  unread: 0
}];

// Mock messages for selected conversation
const MESSAGES = [{
  id: 1,
  senderId: 1,
  sender: "Rahul Sharma",
  content: "Hello, I have a question about the Dandeli trek",
  timestamp: "10:30 AM",
  isUser: false
}, {
  id: 2,
  senderId: "me",
  sender: "Me",
  content: "Hi Rahul, how can I help you with the Dandeli trek?",
  timestamp: "10:32 AM",
  isUser: true
}, {
  id: 3,
  senderId: 1,
  sender: "Rahul Sharma",
  content: "I wanted to know what's the difficulty level of this trek? Is it suitable for beginners?",
  timestamp: "10:33 AM",
  isUser: false
}, {
  id: 4,
  senderId: "me",
  sender: "Me",
  content: "The Dandeli Adventure Trek is rated as moderate difficulty. It's suitable for beginners with reasonable fitness levels. There are some uphill sections, but the pace is comfortable and we take frequent breaks.",
  timestamp: "10:35 AM",
  isUser: true
}, {
  id: 5,
  senderId: 1,
  sender: "Rahul Sharma",
  content: "That sounds good. How about the weather in June? I'm planning to book for June 15th.",
  timestamp: "10:38 AM",
  isUser: false
}, {
  id: 6,
  senderId: "me",
  sender: "Me",
  content: "June is the beginning of monsoon season in Dandeli. You can expect occasional showers, but we provide rain gear. The forests are lush green during this time which makes for a beautiful experience.",
  timestamp: "10:40 AM",
  isUser: true
}, {
  id: 7,
  senderId: 1,
  sender: "Rahul Sharma",
  content: "Great! One last question - what about food arrangements?",
  timestamp: "10:42 AM",
  isUser: false
}];
const VendorMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0]);
  const [newMessage, setNewMessage] = useState("");

  // Filter conversations based on search term
  const filteredConversations = CONVERSATIONS.filter(conversation => {
    return conversation.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the API
      console.log(`Sending message to ${selectedConversation.name}: ${newMessage}`);
      setNewMessage("");
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("h1", {
      className: "text-2xl font-bold mb-6",
      children: "Messages"
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)] min-h-[500px]",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "md:col-span-1 overflow-hidden flex flex-col",
        children: [/*#__PURE__*/_jsx("div", {
          className: "p-3 border-b",
          children: /*#__PURE__*/_jsxs("div", {
            className: "relative",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search conversations",
              className: "pl-9",
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value)
            })]
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "flex-1 overflow-y-auto",
          children: filteredConversations.map(conversation => /*#__PURE__*/_jsxs("div", {
            className: `p-3 border-b flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${selectedConversation.id === conversation.id ? "bg-gray-50" : ""}`,
            onClick: () => setSelectedConversation(conversation),
            children: [/*#__PURE__*/_jsxs(Avatar, {
              className: "h-10 w-10",
              children: [/*#__PURE__*/_jsx(AvatarImage, {
                src: conversation.avatar
              }), /*#__PURE__*/_jsx(AvatarFallback, {
                children: conversation.name.charAt(0)
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-center",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "font-medium truncate",
                  children: conversation.name
                }), /*#__PURE__*/_jsx("div", {
                  className: "text-xs text-gray-500",
                  children: conversation.timestamp
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "text-sm text-gray-500 truncate",
                children: conversation.lastMessage
              })]
            }), conversation.unread > 0 && /*#__PURE__*/_jsx(Badge, {
              className: "ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full",
              children: conversation.unread
            })]
          }, conversation.id))
        })]
      }), /*#__PURE__*/_jsx(Card, {
        className: "md:col-span-2 flex flex-col overflow-hidden",
        children: selectedConversation ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsxs("div", {
            className: "p-3 border-b flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-3",
              children: [/*#__PURE__*/_jsxs(Avatar, {
                className: "h-8 w-8",
                children: [/*#__PURE__*/_jsx(AvatarImage, {
                  src: selectedConversation.avatar
                }), /*#__PURE__*/_jsx(AvatarFallback, {
                  children: selectedConversation.name.charAt(0)
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("div", {
                  className: "font-medium",
                  children: selectedConversation.name
                }), /*#__PURE__*/_jsx("div", {
                  className: "text-xs text-gray-500",
                  children: "Online"
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-3",
              children: [/*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-gray-500 hover:text-gray-700",
                children: /*#__PURE__*/_jsx(Phone, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-gray-500 hover:text-gray-700",
                children: /*#__PURE__*/_jsx(Video, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-gray-500 hover:text-gray-700",
                children: /*#__PURE__*/_jsx(MoreHorizontal, {
                  className: "h-4 w-4"
                })
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3",
            children: MESSAGES.map(message => /*#__PURE__*/_jsx("div", {
              className: `flex ${message.isUser ? 'justify-end' : 'justify-start'}`,
              children: /*#__PURE__*/_jsxs("div", {
                className: `max-w-[80%] ${message.isUser ? 'bg-blue-500 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg' : 'bg-gray-100 text-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg'} px-4 py-2`,
                children: [/*#__PURE__*/_jsx("div", {
                  className: "text-sm",
                  children: message.content
                }), /*#__PURE__*/_jsx("div", {
                  className: `text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`,
                  children: message.timestamp
                })]
              })
            }, message.id))
          }), /*#__PURE__*/_jsx("div", {
            className: "p-3 border-t",
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-gray-500 hover:text-gray-700",
                children: /*#__PURE__*/_jsx(PaperclipIcon, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-gray-500 hover:text-gray-700",
                children: /*#__PURE__*/_jsx(Image, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Input, {
                placeholder: "Type your message...",
                value: newMessage,
                onChange: e => setNewMessage(e.target.value),
                onKeyDown: e => e.key === 'Enter' && handleSendMessage(),
                className: "flex-1"
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-gray-500 hover:text-gray-700",
                children: /*#__PURE__*/_jsx(Smile, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                className: "bg-aorbo-teal hover:bg-aorbo-teal/90",
                size: "icon",
                onClick: handleSendMessage,
                children: /*#__PURE__*/_jsx(Send, {
                  className: "h-4 w-4"
                })
              })]
            })
          })]
        }) : /*#__PURE__*/_jsx("div", {
          className: "flex-1 flex items-center justify-center",
          children: /*#__PURE__*/_jsx("div", {
            className: "text-center",
            children: /*#__PURE__*/_jsx("div", {
              className: "text-gray-400 mb-2",
              children: "Select a conversation to start chatting"
            })
          })
        })
      })]
    })]
  });
};
export default VendorMessages;