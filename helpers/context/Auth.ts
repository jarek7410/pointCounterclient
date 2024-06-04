import {createContext} from "react";
import {authDataDto} from "../dto/authData.dto";

export const AuthContext = createContext<authDataDto>({Update(): void {}, username:null,token:null})