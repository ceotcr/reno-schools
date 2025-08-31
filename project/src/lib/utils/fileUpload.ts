import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import { NextRequest } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const parseForm = async (
    req: NextRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const formData = await req.formData();
    const form = formidable({
        uploadDir: path.join(process.cwd(), 'public/schoolImages'),
        filename: (name, ext, part) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            return `${uniqueSuffix}${ext}`;
        },
        maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    const fields: Record<string, string[]> = {};
    const files: Record<string, any[]> = {};

    // Process each entry in the FormData
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            // Handle file
            const buffer = Buffer.from(await value.arrayBuffer());
            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(value.name)}`;
            const filepath = path.join(process.cwd(), 'public/schoolImages', filename);

            await fs.writeFile(filepath, buffer);

            files[key] = [{
                filepath,
                newFilename: filename,
                originalFilename: value.name,
                mimetype: value.type,
                size: value.size
            }];
        } else {
            // Handle other form fields
            fields[key] = [value.toString()];
        }
    }

    return { fields, files };
};

export const removeFile = async (filePath: string) => {
    try {
        await fs.unlink(path.join(process.cwd(), 'public', filePath));
    } catch (error) {
        console.error('Error removing file:', error);
    }
};
