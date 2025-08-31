import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseForm } from '@/lib/utils/fileUpload';
import type { File } from 'formidable';

export async function GET() {
    try {
        const schools = await prisma.school.findMany();
        return NextResponse.json({ schools });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch schools' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { fields, files } = await parseForm(req as any);
        const imageFile = files.image?.[0] as File;

        if (!imageFile) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        const imageUrl = `/schoolImages/${imageFile.newFilename}`;

        const school = await prisma.school.create({
            data: {
                name: fields.name?.[0] as string,
                address: fields.address?.[0] as string,
                city: fields.city?.[0] as string,
                state: fields.state?.[0] as string,
                contact: fields.contact?.[0] as string,
                email_id: fields.email_id?.[0] as string,
                image: imageUrl,
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
