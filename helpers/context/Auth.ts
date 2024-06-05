import {createContext} from "react";
import {authDataDto} from "../dto/authData.dto";

export const AuthContext = createContext<authDataDto>({bearer: "", Uid: -1, Update(): void {}, username:null,token:null})