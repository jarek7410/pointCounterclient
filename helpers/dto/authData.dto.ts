import {RoomDto} from "./room/room.dto";

export interface authDataDto {
    username:string,
    token:string,
    Uid:number,
    bearer:string,
    room:RoomDto,
    SetNewestRoom: (room:RoomDto)=>void,
    Update: (name:string,token:string,Uid:number)=>void,
}
export interface userDataDto{
    ID:number,
    username:string
    email:string
}