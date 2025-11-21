import {User} from "@/app/interfaces/user";
import jsonData from '../../../../users.json'
import {NextResponse} from "next/server";

const users: User[] = jsonData;

export async function PUT(request: Request, ctx: RouteContext<'/api/users/[id]'>) {
    const {id} = await ctx.params
    const userIndex = users.findIndex(u => u.id === parseInt(id))

    if(userIndex === -1) {
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    const updatedUser : User = await request.json()
    users[userIndex] = { ...users[userIndex], ...updatedUser}

    return NextResponse.json(users[userIndex]);
}

export async function DELETE(request: Request, ctx: RouteContext<'/api/users/[id]'>) {
    const {id} = await ctx.params
    console.log(id)
    const userIndex = users.findIndex(u => u.id === parseInt(id))
    if(userIndex === -1) {
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    return NextResponse.json(deletedUser);
}

