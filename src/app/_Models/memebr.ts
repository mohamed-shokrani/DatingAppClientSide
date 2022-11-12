import { Photo } from "./photo";

export interface Member {
    userName: string;
    id: number;
    photoUrl: string;
    age: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos:Photo[]
   
}
