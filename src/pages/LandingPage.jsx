import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ProfilePic from '../assets/heylth-icon.png';

export const LandingPage = () => {
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const features = [
        {
            title: 'Eat and Sleep Tracker',
            description: 'Pantau pola tidur dan makan Anda setiap hari dengan mudah',
        },
        {
            title: 'Daily Diary',
            description: 'Tulis catatan mood harian Anda dan track perubahan emosi',
        },
        {
            title: 'Screen-time Recommendation',
            description: 'Dapatkan rekomendasi waktu layar yang sehat untuk mata Anda',
        },
        {
            title: 'Personalized Suggestion',
            description: 'Terima saran kesehatan yang dipersonalisasi untuk gaya hidup Anda',
        },
        {
            title: 'Visual Data',
            description: 'Lihat statistik kesehatan Anda dalam visualisasi yang menarik',
        },
    ];

    return (
        <div className="bg-[#f3f3f3]">
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-2xl font-bold">
                            <span className="text-[#007DFC]">Heylth</span>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <button
                                onClick={() => scrollToSection(heroRef)}
                                className="text-gray-700 hover:text-[#007DFC] transition-colors"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection(aboutRef)}
                                className="text-gray-700 hover:text-[#007DFC] transition-colors"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection(featuresRef)}
                                className="text-gray-700 hover:text-[#007DFC] transition-colors"
                            >
                                Features
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <RouterLink
                                to="/register"
                                className="px-6 py-2 bg-white border-2 border-[#007DFC] text-[#007DFC] rounded-lg hover:bg-[#007DFC] hover:text-white transition-colors font-semibold"
                            >
                                Register
                            </RouterLink>
                            <RouterLink
                                to="/login"
                                className="px-6 py-2 bg-[#007DFC] text-white rounded-lg hover:bg-[#0066cc] transition-colors font-semibold"
                            >
                                Login
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </nav>

            <section
                ref={heroRef}
                className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                                Ayo hidup sehat!
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Pantau pola hidupmu dengan Heylth, aplikasi yang membantu kamu menjaga kesehatan,
                                mencatat aktivitas harian, dan memberikan rekomendasi gaya hidup yang lebih baik.
                            </p>
                            <RouterLink
                                to="/register"
                                className="inline-block px-8 py-4 bg-[#007DFC] text-white rounded-lg hover:bg-[#0066cc] transition-colors font-semibold text-lg"
                            >
                                Daftar Sekarang
                            </RouterLink>
                        </div>

                        <div className="flex justify-center">
                            <img src={ProfilePic}></img>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={aboutRef}
                className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        Tentang <span className="text-[#007DFC]">Heylth</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Heylth adalah aplikasi untuk memantau pola hidup anda mulai dari jam tidur, berapa kali makan dalam sehari, screen time dan mengirimkan saran kepada kalian berdasarkan pola hidup anda. Dengan fitur tracking yang lengkap dan rekomendasi yang dipersonalisasi, Heylth membantu Anda mencapai gaya hidup yang lebih sehat dan seimbang.
                    </p>
                </div>
            </section>

            <section
                ref={featuresRef}
                className="py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
                        Fitur <span className="text-[#007DFC]">Heylth</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="w-12 h-12 bg-[#007DFC] rounded-full flex items-center justify-center mb-6">
                                    <span className="text-white font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">
                                <span className="text-[#007DFC]">Heylth</span>
                            </h3>
                            <p className="text-gray-400">
                                Aplikasi untuk gaya hidup yang lebih sehat
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Menu</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <button
                                        onClick={() => scrollToSection(heroRef)}
                                        className="hover:text-[#007DFC] transition-colors"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection(aboutRef)}
                                        className="hover:text-[#007DFC] transition-colors"
                                    >
                                        About
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection(featuresRef)}
                                        className="hover:text-[#007DFC] transition-colors"
                                    >
                                        Features
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Email: info@heylth.com</li>
                                <li>Phone: +62 812-3456-7890</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8">
                        <p className="text-center text-gray-400">
                            &copy; 2024 Heylth. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
