export interface authDataDto {
    username:string,
    token:string,
    Update: (name:string,token:string)=>void,
}