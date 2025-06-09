import { useParams, useNavigate, Link } from "react-router-dom";
import { getSessionCookie } from "@/utility/checkSessionCookie";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { IGame } from "@/types/IGame";
import { Loader } from "@/components/ui/loader";
import confetti from 'canvas-confetti';


const Play = () => {
    const { storyId } = useParams();
    const sessionId = getSessionCookie(storyId ?? "");
    const navigate = useNavigate();
    const [story, setStory] = useState<IGame['story'] | null>(null);
    const [hintUsed, setHintUsed] = useState<IGame['hintsUsed'] | null>(null);
    const [guessedKeyPoints, setGuessedKeyPoints] = useState<IGame['guessedKeyPoints'] | null>(null);
    const [messages, setMessages] = useState<IGame['messages'] | null>(null);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initialMessages = [{ role: 'system', content: `You are now playing the puzzle: ${story?.title}.` },
    { role: 'system', content: story?.situation ?? '' }]

    const { data, loading, error } = useFetch<IGame>(`http://localhost:8001/conversation/get_chat_by_session/${sessionId}`);
    const sendMessageMutation = useMutation<IGame, Error, any>(`http://localhost:8001/conversation/send_user_message`, {
        method: "POST",
        onSuccess: (data) => {
            if (!messages) return;
            setMessages([...initialMessages, ...data.messages.filter((_: any, index: number) => index !== 0)]);
            setGuessedKeyPoints(data.guessedKeyPoints);
            setHintUsed(data.hintsUsed);
            setIsTyping(false);
        },
        onError: (error) => {
            console.error('There was an error sending the message!', error);
            setIsTyping(false);
        }
    });

    const restartMutation = useMutation<IGame, Error, any>(`http://localhost:8001/conversation/delete_chat_by_session/${sessionId}`, {
        method: "POST",
        onSuccess: (data) => {
            setMessages([...initialMessages, ...data.messages.filter((_: any, index: number) => index !== 0)]);
            setGuessedKeyPoints(data.guessedKeyPoints);
            setHintUsed(data.hintsUsed);
            setIsCompleted(false);
            setUserInput('');
        },
        onError: (error) => {
            console.error('There was an error restarting the game!', error);
        }
    });

    const handleRestart = () => {
        restartMutation.mutate({});
    };

    useEffect(() => {
        if (!sessionId) {
            navigate("/");
        }
    }, [sessionId, navigate]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (data) {
            setStory(data.story);
            setGuessedKeyPoints(data.guessedKeyPoints);
            setHintUsed(data.hintsUsed);
            const messages = data.messages
                .filter((_, index) => index !== 0)
                .map(msg => {
                    return {
                        role: msg.role,
                        content: msg.content
                    };
                });
            setMessages([
                ...initialMessages,
                ...messages
            ]);
        }
    }, [data]);

    useEffect(() => {
        if (story && guessedKeyPoints?.every(Boolean)) {
            setIsCompleted(true);
            triggerConfetti();
        }
    }, [guessedKeyPoints, story]);

    const triggerConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.6 }
        });
    };

    const handleSend = (message: string) => {
        if (message.trim() === '') return;

        const newMessages = [
            ...messages ?? [],
            { role: 'user', content: message }
        ];

        setMessages(newMessages);
        setUserInput('');
        setIsTyping(true);

        sendMessageMutation.mutate({
            sessionId: sessionId ?? '',
            message: message
        });
    };

    if (isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-20 text-green-800 font-serif text-center">
                <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
                <p className="text-2xl mb-8">{story?.solution}</p>
                <div className="flex gap-6 flex-wrap justify-center">
                    <Link to="/games" className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-bold transition-transform duration-200 hover:scale-105 cursor-pointer">Back to Stories</Link>
                    <button onClick={handleRestart} className="bg-red-400 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-transform duration-200 hover:scale-105 cursor-pointer">Restart Game</button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-8 md:px-12">
            <h1 className="text-xl sm:text-2xl font-bold mx-auto my-4 sm:my-6 text-center">{story?.title}</h1>
            <div>
                {error && <div className="text-red-500">{error.message}</div>}
            </div>
            <div>
                {loading && (
                    <div className="flex justify-center items-center my-12 sm:my-24 w-full">
                        <Loader size="lg" />
                    </div>
                )}
            </div>
            {data && (
                <div className="flex flex-1 flex-col lg:flex-row gap-4 p-4 overflow-hidden">
                    <aside className="w-full lg:w-80 bg-green-50 border-r border-gray-200 rounded-xl p-4 mb-4 lg:mb-0 overflow-y-auto">
                        <h2 className="text-base sm:text-lg font-bold text-green-700 mb-2">Hint Used: <span className="font-normal">{hintUsed}</span></h2>
                        <h2 className="text-base sm:text-lg font-bold text-green-700 mb-4">Guessed Key Points: <span className="font-normal">{guessedKeyPoints?.filter(Boolean).length}/{story?.keyPoints.length}</span></h2>
                        <ul className="space-y-2">
                            {story?.keyPoints?.map((keyPoint, index) => (
                                guessedKeyPoints?.[index] && (
                                    <li key={index} className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-gray-700 text-sm sm:text-base">
                                        {keyPoint.keyPoint}
                                    </li>
                                )
                            ))}
                        </ul>
                    </aside>

                    <section className="flex-1 flex flex-col bg-white rounded-xl h-[calc(100vh-15rem)] shadow-lg overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-100 h-full flex flex-col gap-3">
                            {messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base ${
                                        msg.role === 'user'
                                            ? 'self-end bg-green-100 border-green-200 text-green-900'
                                            : 'self-start bg-teal-100 border-teal-200 text-teal-900'
                                    }`}
                                >
                                    <strong>{msg.role === 'user' ? 'You:' : 'Game:'}</strong> {msg?.content}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="self-start bg-teal-100 border border-teal-200 text-teal-900 max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 rounded-lg">
                                    <strong>Game:</strong> <em>typing...</em>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-4 bg-gray-100 border-t border-gray-200">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSend(userInput);
                                }}
                                placeholder="Ask a question..."
                                className="flex-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm sm:text-base"
                            />
                            <div className="flex flex-row gap-2 sm:gap-3">
                                <button 
                                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-bold transition-transform duration-200 hover:scale-105 cursor-pointer text-sm sm:text-base"
                                    onClick={() => handleSend(userInput)}>
                                    Send
                                </button>
                                <button 
                                    className="flex-1 sm:flex-none bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-lg font-bold transition-transform duration-200 hover:scale-105 cursor-pointer text-sm sm:text-base"
                                    onClick={() => handleSend('give me a hint')}>
                                    Hint
                                </button>
                                <button 
                                    className="flex-1 sm:flex-none bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-transform duration-200 hover:scale-105 cursor-pointer text-sm sm:text-base"
                                    onClick={handleRestart}>
                                    Restart
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default Play;