import {createContext} from "react";
import {authDataDto} from "../dto/authData.dto";

export const AuthContext = createContext<authDataDto>({
    SetNewestRoom(name: string, ID: number, user_id: number): void {
    }, room: undefined, bearer: "", Uid: -1, Update(): void {}, username:null,token:null})