const Rules = () => {
    return (
        <div className="bg-white mx-auto p-6 border rounded-xl shadow-xl max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Sample Gameplay</h2>
            <p className="font-semibold">Situation Puzzle: Employee of the Month</p>
            <p className="font-semibold">Story Prompt: <span className="font-normal">Francis dies of a heart attack at work. His colleagues are present when it happens, but they don’t call for help until after he dies.</span></p>
            <p className="font-semibold mt-2">Gameplay Example:</p>
            <div className="text-left text-sm mt-2 space-y-1">
                <p><span className="font-bold">User:</span> "Was Francis in danger before he died?"</p>
                <p><span className="font-bold">Game:</span> "Yes."</p>
                <p><span className="font-bold">User:</span> "Did his colleagues know he was in danger?"</p>
                <p><span className="font-bold">Game:</span> "No."</p>
                <p><span className="font-bold">User:</span> "Did they think he was acting?"</p>
                <p><span className="font-bold">Game:</span> "Yes."</p>
                <p>(Progress: 20% guessed — key point matched: "They thought he was acting.")</p>
                <p><span className="font-bold">User:</span> "Was Francis performing in front of an audience?"</p>
                <p><span className="font-bold">Game:</span> "Yes."</p>
                <p>(Progress: 40% guessed — key point matched: "Francis was performing in front of an audience.")</p>
                <p><span className="font-bold">User:</span> "Was Francis an actor?"</p>
                <p><span className="font-bold">Game:</span> "Yes."</p>
                <p>(Progress: 60% guessed — key point matched: "Francis was an actor.")</p>
                <p><span className="font-bold">User:</span> "Was the heart attack part of his role?"</p>
                <p><span className="font-bold">Game:</span> "Yes."</p>
                <p>(Progress: 80% guessed — key point matched: "The heart attack was part of his role.")</p>
                <p><span className="font-bold">User:</span> "Did they think his heart attack was just a realistic performance?"</p>
                <p><span className="font-bold">Game:</span> "Yes."</p>
                <p>(Progress: 100% guessed — key point matched: "They thought his heart attack was just a realistic performance.")</p>
                <p><span className="font-bold">Game:</span> Congratulations! You've uncovered the full story: "Francis was a theater actor and suffered a heart attack in the middle of a performance. However, he was playing a character experiencing a heart attack, so both his colleagues and the audience assumed he was giving a convincing performance."</p>
                <p><span className="font-bold">Game:</span> Game Over!</p>
            </div>
        </div>
    )
}

export default Rules;