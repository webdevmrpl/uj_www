import { Link } from 'react-router-dom';
import { Brain, Target, Lightbulb, ArrowRight } from 'lucide-react';

const features = [
    {
        icon: Brain,
        title: "Train Your Mind",
        description: "Enhance your lateral thinking skills through engaging puzzles and riddles"
    },
    {
        icon: Target,
        title: "Progressive Difficulty",
        description: "Start with simpler puzzles and work your way up to more challenging ones"
    },
    {
        icon: Lightbulb,
        title: "Smart Hints",
        description: "Get intelligent hints when you're stuck, helping you learn and progress"
    }
];

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                    Welcome to Lateral Thinking
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Challenge your mind with our collection of intriguing puzzles. Ask questions, uncover clues, and solve mysteries using your lateral thinking skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/games"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                    >
                        Start Playing <ArrowRight className="ml-2 size-5" />
                    </Link>
                    <Link
                        to="/rules"
                        className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors duration-200"
                    >
                        Learn How to Play
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <feature.icon className="size-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-green-50 rounded-2xl p-8 mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            step: "1",
                            title: "Choose a Puzzle",
                            description: "Browse our collection of lateral thinking puzzles"
                        },
                        {
                            step: "2",
                            title: "Read the Situation",
                            description: "Understand the initial scenario presented"
                        },
                        {
                            step: "3",
                            title: "Ask Questions",
                            description: "Get answers to uncover the truth"
                        },
                        {
                            step: "4",
                            title: "Solve the Mystery",
                            description: "Piece together the clues to solve the puzzle"
                        }
                    ].map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="size-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                {step.step}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center bg-gradient-to-r from-green-800 to-green-700 rounded-2xl p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Challenge Your Mind?
                </h2>
                <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of players who are improving their lateral thinking skills while having fun.
                </p>
                <Link
                    to="/games"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-green-700 transition-colors duration-200"
                >
                    Start Your Journey
                </Link>
            </div>
        </div>
    );
}

export default Home;