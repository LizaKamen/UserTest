import {User} from "@/app/interfaces/user";
import jsonData from '../../../users.json'
import {NextResponse} from "next/server";

const users: User[] = jsonData;

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(requset: Request) {
    const user: User = await requset.json()

    const newUser ={ ...user, id: Math.max(...users.map(u => u.id)) + 1 };
    users.push(newUser);
    return NextResponse.json(newUser, {status: 201});
}

