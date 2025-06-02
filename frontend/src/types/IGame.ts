import { CamelCasedPropertiesDeep } from "type-fest";
import { IStory } from "./IStory";

interface IMessage {
    role: string;
    content: string;
}

interface IGameRaw {
    _id: string;
    session_id: string;
    messages: IMessage[];
    guessed_key_points: boolean[];
    hints_used: number;
    progress_percent: number;
    story: IStory;
}

export type IGame = CamelCasedPropertiesDeep<IGameRaw>;