import { CamelCasedPropertiesDeep } from "type-fest";

type IKeyPoint = {
    hint: string;
    key_point: string;
}

interface IStoryRaw {
    _id: string;
    title: string;
    situation: string;
    solution: string;
    key_points: IKeyPoint[];
    answer: string;
    difficulty: number;
}

export type IStory = CamelCasedPropertiesDeep<IStoryRaw>;
