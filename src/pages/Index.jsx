import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Mountain,
    MapPin,
    Calendar,
    Star,
    Users,
    Shield,
    Award,
    Heart,
    ArrowRight,
    Search,
} from "lucide-react";

const Index = () => {
    const featuredTreks = [
        {
            id: 1,
            name: "Kedarkantha Trek",
            location: "Uttarakhand",
            duration: "6 days",
            price: "₹8,999",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            difficulty: "Moderate",
        },
        {
            id: 2,
            name: "Valley of Flowers",
            location: "Uttarakhand",
            duration: "8 days",
            price: "₹12,999",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            difficulty: "Moderate",
        },
        {
            id: 3,
            name: "Hampta Pass",
            location: "Himachal Pradesh",
            duration: "5 days",
            price: "₹7,499",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            difficulty: "Easy",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
                                    <span className="text-black font-bold text-lg">
                                        A
                                    </span>
                                </div>
                                <span className="text-xl font-bold">
                                    Aorbo Treks
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/treks">
                                <Button variant="ghost">Explore Treks</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-aorbo-teal hover:bg-aorbo-teal/90">
                                    Join Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-900 to-gray-600 text-white">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Mountain Trek"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Discover Your Next
                            <span className="text-aorbo-yellow block">
                                Adventure
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Explore breathtaking treks across the Himalayas with
                            expert guides, guaranteed safety, and unforgettable
                            experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/treks">
                                <Button
                                    size="lg"
                                    className="bg-aorbo-teal hover:bg-aorbo-teal/90 text-lg px-8"
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Explore Treks
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-gray-900"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Aorbo Treks?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We provide safe, exciting, and memorable trekking
                            experiences with professional guides and top-notch
                            equipment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-aorbo-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Safety First</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Professional guides, safety equipment, and
                                    emergency support for all treks.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-aorbo-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Expert Guides</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Experienced local guides with deep knowledge
                                    of trails and culture.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-aorbo-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Small Groups</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Intimate group sizes for personalized
                                    attention and better experiences.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-aorbo-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Sustainable</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Eco-friendly practices that preserve nature
                                    for future generations.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Featured Treks */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Featured Treks
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our most popular trekking destinations
                            handpicked for amazing experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredTreks.map((trek) => (
                            <Card
                                key={trek.id}
                                className="overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative">
                                    <img
                                        src={trek.image}
                                        alt={trek.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white px-2 py-1 rounded text-sm font-medium">
                                            {trek.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">
                                        {trek.name}
                                    </h3>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span className="text-sm">
                                            {trek.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span className="text-sm">
                                                {trek.duration}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm">
                                                {trek.rating}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-900">
                                            {trek.price}
                                        </span>
                                        <Link to={`/trek/${trek.id}`}>
                                            <Button className="bg-aorbo-teal hover:bg-aorbo-teal/90">
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/treks">
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-8"
                            >
                                View All Treks
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-aorbo-teal text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready for Your Next Adventure?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of happy trekkers who have experienced
                        the magic of the mountains with us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/treks">
                            <Button
                                size="lg"
                                className="bg-white text-aorbo-teal hover:bg-gray-100 px-8"
                            >
                                Book Your Trek
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-aorbo-teal px-8"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
                                    <span className="text-black font-bold text-lg">
                                        A
                                    </span>
                                </div>
                                <span className="text-xl font-bold">
                                    Aorbo Treks
                                </span>
                            </div>
                            <p className="text-gray-400">
                                Your trusted partner for amazing trekking
                                adventures across India.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/treks"
                                        className="hover:text-white"
                                    >
                                        All Treks
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about"
                                        className="hover:text-white"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="hover:text-white"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/safety"
                                        className="hover:text-white"
                                    >
                                        Safety Guidelines
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">
                                Popular Destinations
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Uttarakhand
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Himachal Pradesh
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Kashmir
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Nepal
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Contact Info</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>📧 info@aorbotreks.com</li>
                                <li>📞 +91-9876543210</li>
                                <li>📍 Delhi, India</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Aorbo Treks. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
