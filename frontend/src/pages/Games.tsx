import { useFetch } from "@/hooks/useFetch";
import { IStory } from "@/types/IStory";
import { Loader } from "@/components/ui/loader";
import { checkAndGetSessionId } from "@/utility/checkSessionCookie";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const Games = () => {
    const { data, loading, error } = useFetch<IStory[]>('http://localhost:8001/stories/');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleStoryClick = async (story: IStory) => {
        await checkAndGetSessionId(story);
        await navigate(`/games/${story.id}`);
    }

    const filteredAndSortedStories = useMemo(() => {
        if (!data) return [];
        
        return data
            .filter(story => 
                story.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.difficulty - b.difficulty;
                } else {
                    return b.difficulty - a.difficulty;
                }
            });
    }, [data, searchQuery, sortOrder]);

    return (
        <div className="w-full px-12">
            <h1 className="text-2xl font-bold mx-auto my-6 text-center">Games</h1>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                >
                    <option value="asc">Difficulty: Easy to Hard</option>
                    <option value="desc">Difficulty: Hard to Easy</option>
                </select>
            </div>

            <div>
                {error && <div className="text-red-500">{error.message}</div>}
            </div>
            <div>
                {loading && (
                    <div className="flex justify-center items-center my-24 w-full">
                        <Loader size="lg" />
                    </div>
                )}
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-4">
                {filteredAndSortedStories.map((story) => (
                    <div
                        className="relative w-72 bg-white border-2 border-gray-200 rounded-2xl px-10 py-5 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-green-50 hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"
                        key={story.id}
                        onClick={async () => await handleStoryClick(story)}
                    >
                        <div className="absolute top-5 left-5 w-2 h-[80%] bg-green-500 rounded-lg"></div>
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold mb-2 font-sans transition-colors">{story.title}</h2>
                            <p className="text-base text-gray-600 mb-4 font-sans leading-relaxed transition-colors">{story.situation}</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-auto pt-2 border-t border-gray-100">
                            Difficulty: {story.difficulty}
                        </div>
                    </div>
                ))}
                {!loading && filteredAndSortedStories.length === 0 && (
                    <div className="text-center text-gray-500 my-8">
                        No stories found matching your search.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Games;