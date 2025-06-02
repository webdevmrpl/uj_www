import { useFetch } from "@/hooks/useFetch";
import { IStory } from "@/types/IStory";
import { Loader } from "@/components/ui/loader";
import { checkAndGetSessionId } from "@/utility/checkSessionCookie";
import { useNavigate } from "react-router-dom";

const Games = () => {
    const { data, loading, error } = useFetch<IStory[]>('http://localhost:8001/stories/');
    const navigate = useNavigate();

    const handleStoryClick = async (story: IStory) => {
        await checkAndGetSessionId(story);
        await navigate(`/games/${story.id}`);
    }

    return (
        <div className="w-full px-12">
            <h1 className="text-2xl font-bold mx-auto my-6 text-center">Games</h1>
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
                {data?.map((story) => (
                    <div
                        className="relative w-72 bg-white border-2 border-gray-200 rounded-2xl px-10 py-5 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-green-50 hover:shadow-xl cursor-pointer overflow-hidden"
                        key={story.id}
                    onClick={async () => await handleStoryClick(story)}
                    >
                        <div className="absolute top-5 left-5 w-2 h-[80%] bg-green-500 rounded-lg"></div>
                        <h2 className="text-xl font-bold mb-2 font-sans transition-colors">{story.title}</h2>
                        <p className="text-base text-gray-600 mb-4 font-sans leading-relaxed transition-colors">{story.situation}</p>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Games;