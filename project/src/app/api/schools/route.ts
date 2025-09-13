import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseForm } from '@/lib/utils/fileUpload';
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth/next';

export async function GET() {
    try {
        const schools = await prisma.school.findMany();
        return NextResponse.json({ schools });
    } catch (_) {
        return NextResponse.json(
            { error: 'Failed to fetch schools' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.id) {
            return new Response("Unauthorized", { status: 401 });
        }
        const { fields, files } = await parseForm(req);
        const imageFile = files.image?.[0];

        if (!imageFile) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        // Store the pathname in the image field
        const school = await prisma.school.create({
            data: {
                name: fields.name?.[0] as string,
                address: fields.address?.[0] as string,
                city: fields.city?.[0] as string,
                state: fields.state?.[0] as string,
                contact: fields.contact?.[0] as string,
                email_id: fields.email_id?.[0] as string,
                image: imageFile.url,
            },
        });

        return NextResponse.json(school);
    } catch (error) {
        console.error('Error creating school:', error);
        return NextResponse.json(
            { error: 'Failed to create school' },
            { status: 500 }
        );
    }
}
