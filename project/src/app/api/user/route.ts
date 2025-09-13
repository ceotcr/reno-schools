import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        return new Response("Unauthorized", { status: 401 });
    }
    const userId = session.user.id;
    const { name } = await req.json();
    if (!name.trim() || typeof name !== "string") {
        return new Response("Invalid name", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: { name: name.trim() },
        select: { id: true, name: true, email: true },
    });

    return NextResponse.json(updatedUser);
}