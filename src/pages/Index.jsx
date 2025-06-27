import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Award, CheckCircle, ChevronRight, Calendar, BarChart } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Index = () => {
  const {
    user
  } = useAuth();
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex flex-col",
    children: [/*#__PURE__*/_jsx("header", {
      className: "bg-aorbo-teal py-4",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto px-4 flex justify-between items-center",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center",
            children: /*#__PURE__*/_jsx("span", {
              className: "text-black font-bold text-lg",
              children: "A"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "text-white text-xl font-bold",
            children: "Aorbo Treks"
          })]
        }), /*#__PURE__*/_jsx("nav", {
          children: user ? /*#__PURE__*/_jsx(Link, {
            to: user.role === "admin" ? "/admin" : "/vendor",
            className: "bg-white text-aorbo-teal px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors",
            children: "Dashboard"
          }) : /*#__PURE__*/_jsxs("div", {
            className: "space-x-4",
            children: [/*#__PURE__*/_jsx(Link, {
              to: "/login",
              className: "text-white hover:text-gray-200 transition-colors",
              children: "Login"
            }), /*#__PURE__*/_jsx(Link, {
              to: "/register",
              className: "bg-white text-aorbo-teal px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors",
              children: "Register"
            })]
          })
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "bg-aorbo-teal text-white py-16 md:py-24",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "space-y-6 animate-fade-in",
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-4xl md:text-5xl font-bold leading-tight",
            children: "Ignite travel dreams and bring adventure to life for countless explorers!"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-lg md:text-xl opacity-90",
            children: "Join Aorbo, The India's Trek Ticket Booking Platform, and unlock exclusive benefits, tools, and growth opportunities."
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsxs(Link, {
              to: "/register",
              className: "inline-flex items-center bg-aorbo-yellow text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors",
              children: ["Become a Partner ", /*#__PURE__*/_jsx(ChevronRight, {
                className: "ml-2 h-5 w-5"
              })]
            })
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "hidden md:block",
          children: /*#__PURE__*/_jsxs("div", {
            className: "rounded-lg overflow-hidden shadow-xl transform translate-y-4 relative bg-white p-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "absolute -right-12 -top-12 w-24 h-24 rounded-full bg-aorbo-yellow opacity-50"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative z-10",
              children: [/*#__PURE__*/_jsx("img", {
                src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&q=80",
                alt: "Trekking adventure",
                className: "rounded-md mb-4"
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-4 mb-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-8 h-8 rounded-full bg-aorbo-teal flex items-center justify-center",
                  children: /*#__PURE__*/_jsx(CheckCircle, {
                    className: "h-5 w-5 text-white"
                  })
                }), /*#__PURE__*/_jsx("span", {
                  className: "font-medium",
                  children: "Verified Partner Program"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-4 mb-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-8 h-8 rounded-full bg-aorbo-teal flex items-center justify-center",
                  children: /*#__PURE__*/_jsx(CheckCircle, {
                    className: "h-5 w-5 text-white"
                  })
                }), /*#__PURE__*/_jsx("span", {
                  className: "font-medium",
                  children: "Simplified Booking Management"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-8 h-8 rounded-full bg-aorbo-teal flex items-center justify-center",
                  children: /*#__PURE__*/_jsx(CheckCircle, {
                    className: "h-5 w-5 text-white"
                  })
                }), /*#__PURE__*/_jsx("span", {
                  className: "font-medium",
                  children: "Increased Visibility"
                })]
              })]
            })]
          })
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "py-16 bg-gray-50",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto px-4",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "text-3xl font-bold mb-12 text-center",
          children: "Increase your trek's visibility with Aorbo's wide reach"
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 bg-aorbo-lightBlue rounded-lg flex items-center justify-center mb-4",
              children: /*#__PURE__*/_jsx(Calendar, {
                className: "h-6 w-6 text-aorbo-teal"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-xl font-semibold mb-2",
              children: "Expedite slot reservations"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-gray-600",
              children: "Expedite slot reservations to increase booking volume and optimize availability."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 bg-aorbo-lightBlue rounded-lg flex items-center justify-center mb-4",
              children: /*#__PURE__*/_jsx(BarChart, {
                className: "h-6 w-6 text-aorbo-teal"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-xl font-semibold mb-2",
              children: "Business analytics"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-gray-600",
              children: "Utilize business analytics to gain valuable insights and enhance decision-making."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 bg-aorbo-lightBlue rounded-lg flex items-center justify-center mb-4",
              children: /*#__PURE__*/_jsx(Award, {
                className: "h-6 w-6 text-aorbo-teal"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-xl font-semibold mb-2",
              children: "Reliability"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-gray-600",
              children: "Experience unmatched reliability with Aorbo's seamless operations and support."
            })]
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "py-16 bg-white",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto px-4",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "text-3xl font-bold mb-12 text-center",
          children: "Frequently Asked Questions"
        }), /*#__PURE__*/_jsxs("div", {
          className: "max-w-3xl mx-auto space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "border border-gray-200 rounded-lg p-6",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-xl font-semibold mb-3",
              children: "What are the key benefits of partnering with Aorbo?"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-gray-600",
              children: "Partnering with Aorbo elevates your trekking business by increasing visibility, streamlining bookings, and ensuring secure payments. Benefit from verified listings, customer reviews, and data insights to optimize your services. Expand globally, scale cost-effectively, and focus on delivering exceptional experiences while Aorbo manages the digital side."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "border border-gray-200 rounded-lg p-6",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-xl font-semibold mb-3",
              children: "What are the steps for trek organizers to join Aorbo?"
            }), /*#__PURE__*/_jsxs("ol", {
              className: "text-gray-600 space-y-2 list-decimal pl-5",
              children: [/*#__PURE__*/_jsxs("li", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Application:"
                }), " Submit your application with the required documents."]
              }), /*#__PURE__*/_jsxs("li", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Vetting process:"
                }), " Trek organizers will hear from our team shortly."]
              }), /*#__PURE__*/_jsxs("li", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Validation:"
                }), " Internal departments will check the application for approval."]
              }), /*#__PURE__*/_jsxs("li", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Account activation:"
                }), " The tech team ensures API integration and organizer login setup."]
              }), /*#__PURE__*/_jsxs("li", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "T&C Approval:"
                }), " Agree to terms and conditions, get approved."]
              }), /*#__PURE__*/_jsxs("li", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Dashboard:"
                }), " Once T&C are approved, the dashboard goes live on Aorbo."]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "border border-gray-200 rounded-lg p-6",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-xl font-semibold mb-3",
              children: "Is there any registration fee for Aorbo partners?"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-gray-600",
              children: "There is no registration fee for Aorbo partners. We only charge a minimal commission on each ticket sold through the Aorbo platform."
            })]
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      className: "py-16 bg-aorbo-teal text-white",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "text-3xl font-bold mb-6",
          children: "Ready to grow your trekking business?"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xl max-w-2xl mx-auto mb-8",
          children: "Join Aorbo today and expand your reach to thousands of adventure enthusiasts across India."
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/register",
          className: "inline-flex items-center bg-aorbo-yellow text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors",
          children: ["Register Now ", /*#__PURE__*/_jsx(ChevronRight, {
            className: "ml-2 h-5 w-5"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("footer", {
      className: "bg-gray-900 text-white py-10",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto px-4",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col md:flex-row justify-between mb-8",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "mb-6 md:mb-0",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2 mb-4",
              children: [/*#__PURE__*/_jsx("div", {
                className: "w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center",
                children: /*#__PURE__*/_jsx("span", {
                  className: "text-black font-bold text-lg",
                  children: "A"
                })
              }), /*#__PURE__*/_jsx("span", {
                className: "text-xl font-bold",
                children: "Aorbo Treks"
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "max-w-xs text-gray-400",
              children: "India's premier platform for connecting trek enthusiasts with verified trek organizers."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-8",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Company"
              }), /*#__PURE__*/_jsxs("ul", {
                className: "space-y-2",
                children: [/*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "About Us"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Careers"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Blog"
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Support"
              }), /*#__PURE__*/_jsxs("ul", {
                className: "space-y-2",
                children: [/*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Help Center"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Contact Us"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Privacy Policy"
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "For Trekkers"
              }), /*#__PURE__*/_jsxs("ul", {
                className: "space-y-2",
                children: [/*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Find Treks"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Reviews"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Gift Cards"
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "For Vendors"
              }), /*#__PURE__*/_jsxs("ul", {
                className: "space-y-2",
                children: [/*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx(Link, {
                    to: "/register",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Join as Partner"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Resources"
                  })
                }), /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx("a", {
                    href: "#",
                    className: "text-gray-400 hover:text-white transition-colors",
                    children: "Community"
                  })
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "pt-8 border-t border-gray-800 text-center text-gray-400",
          children: /*#__PURE__*/_jsxs("p", {
            children: ["\xA9 ", new Date().getFullYear(), " Aorbo Treks. All rights reserved."]
          })
        })]
      })
    })]
  });
};
export default Index;