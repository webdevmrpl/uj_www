import { IStory } from '../types/IStory';

export const getSessionCookie = (storyId: string): string | null => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(`session_id_${storyId}=`))
        ?.split('=')[1] || null;
};

export const setSessionCookie = (storyId: string, sessionId: string): void => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `session_id_${storyId}=${sessionId}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const checkAndGetSessionId = async (story: IStory): Promise<string> => {
    const sessionId = getSessionCookie(story.id);

    if (!sessionId) {
        try {
            const response = await fetch(`http://localhost:8001/conversation/get_session_id?story_id=${story.id}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to generate session ID');
            }

            const data = await response.json();
            setSessionCookie(story.id, data.session_id);
            return data.session_id;
        } catch (error) {
            console.error('There was an error generating the session ID!', error);
            throw error;
        }
    }

    return sessionId;
}; 