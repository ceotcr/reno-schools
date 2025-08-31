import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseForm, removeFile } from '@/lib/utils/fileUpload';

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const school = await prisma.school.findUnique({
            where: { id },
        });

        if (!school) {
            return NextResponse.json(
                { error: 'School not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(school);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch school' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const { fields, files } = await parseForm(req as any);
        const imageFile = files.image?.[0];

        const existingSchool = await prisma.school.findUnique({
            where: { id },
        });

        if (!existingSchool) {
            return NextResponse.json(
                { error: 'School not found' },
                { status: 404 }
            );
        }

        const updateData: any = {
            name: fields.name?.[0],
            address: fields.address?.[0],
            city: fields.city?.[0],
            state: fields.state?.[0],
            contact: fields.contact?.[0],
            email_id: fields.email_id?.[0],
        };

        if (imageFile) {
            // Remove old image if it exists
            if (existingSchool.image) {
                await removeFile(existingSchool.image);
            }
            updateData.image = `/schoolImages/${imageFile.newFilename}`;
        }

        const school = await prisma.school.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(school);
    } catch (error) {
        console.error('Error updating school:', error);
        return NextResponse.json(
            { error: 'Failed to update school' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const school = await prisma.school.findUnique({
            where: { id },
        });

        if (!school) {
            return NextResponse.json(
                { error: 'School not found' },
                { status: 404 }
            );
        }

        // Remove the image file
        if (school.image) {
            await removeFile(school.image);
        }

        await prisma.school.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'School deleted successfully' });
    } catch (error) {
        console.error('Error deleting school:', error);
        return NextResponse.json(
            { error: 'Failed to delete school' },
            { status: 500 }
        );
    }
}
