export interface CreatedRoomDto{
    message:string
    room:{
        CreatedAt: Date,
        UpdatedAt: Date,
        ID: number,
        user_id: number,
        name: string
    }
}