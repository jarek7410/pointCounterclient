import {createContext} from "react";
import {EnvDto} from "../dto/env.dto";

export const EnvContext = createContext<EnvDto>({ api: {port: "", url: ""}})