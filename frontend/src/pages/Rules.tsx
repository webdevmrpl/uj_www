const Rules = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
            <div className="bg-white mx-auto p-8 border rounded-xl shadow-xl max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">How to Play</h1>
                
                <div className="space-y-8">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                        <h2 className="text-2xl font-bold mb-4 text-green-700">Sample Gameplay</h2>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-green-600 mb-2">Situation Puzzle</h3>
                            <p className="text-lg font-medium mb-4">"Employee of the Month"</p>
                            <div className="bg-white p-4 rounded-lg border border-green-100">
                                <p className="font-semibold text-gray-700">Story Prompt:</p>
                                <p className="text-gray-600 italic">Francis dies of a heart attack at work. His colleagues are present when it happens, but they don't call for help until after he dies.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-green-600 mb-3">Example Conversation</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <p><span className="font-bold text-green-800">User:</span> "Was Francis in danger before he died?"</p>
                                            <p><span className="font-bold text-green-800">Game:</span> "Yes."</p>
                                        </div>
                                        
                                        <div className="bg-white p-3 rounded-lg border border-green-100">
                                            <p><span className="font-bold text-green-800">User:</span> "Did his colleagues know he was in danger?"</p>
                                            <p><span className="font-bold text-green-800">Game:</span> "No."</p>
                                        </div>
                                        
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <p><span className="font-bold text-green-800">User:</span> "Did they think he was acting?"</p>
                                            <p><span className="font-bold text-green-800">Game:</span> "Yes."</p>
                                            <p className="text-green-600 text-sm mt-1 italic">Progress: 20% — Key point matched: "They thought he was acting."</p>
                                        </div>
                                        
                                        <div className="bg-white p-3 rounded-lg border border-green-100">
                                            <p><span className="font-bold text-green-800">User:</span> "Was Francis performing in front of an audience?"</p>
                                            <p><span className="font-bold text-green-800">Game:</span> "Yes."</p>
                                            <p className="text-green-600 text-sm mt-1 italic">Progress: 40% — Key point matched: "Francis was performing in front of an audience."</p>
                                        </div>
                                        
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <p><span className="font-bold text-green-800">User:</span> "Was Francis an actor?"</p>
                                            <p><span className="font-bold text-green-800">Game:</span> "Yes."</p>
                                            <p className="text-green-600 text-sm mt-1 italic">Progress: 60% — Key point matched: "Francis was an actor."</p>
                                        </div>
                                        
                                        <div className="bg-white p-3 rounded-lg border border-green-100">
                                            <p><span className="font-bold text-green-800">User:</span> "Was the heart attack part of his role?"</p>
                                            <p><span className="font-bold text-green-800">Game:</span> "Yes."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                        <h2 className="text-2xl font-bold mb-4 text-green-700">Game Rules</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Ask yes/no questions to uncover the full story</li>
                            <li>Each story has key points you need to discover</li>
                            <li>Your progress increases as you uncover key points</li>
                            <li>Use hints if you get stuck (but they affect your score)</li>
                            <li>The game ends when you've discovered all key points</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                        <h2 className="text-2xl font-bold mb-4 text-green-700">Tips for Success</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Start with broad questions to understand the context</li>
                            <li>Pay attention to the progress updates</li>
                            <li>Build upon the information you receive</li>
                            <li>Think creatively and consider unusual scenarios</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rules;