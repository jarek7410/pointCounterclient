export interface authDataDto {
    username:string,
    token:string,
    Uid:number,
    bearer:string,
    Update: (name:string,token:string,Uid:number)=>void,
}
export interface userDataDto{
    ID:number,
    username:string
    email:string
}