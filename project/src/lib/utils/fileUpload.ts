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

    const fields: formidable.Fields = Object.create(null);
    const files: formidable.Files = Object.create(null);

    // Process each entry in the FormData
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            // Handle file
            const buffer = Buffer.from(await value.arrayBuffer());
            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(value.name)}`;
            const filepath = path.join(process.cwd(), 'public/schoolImages', filename);

            await fs.writeFile(filepath, buffer);

            const stats = await fs.stat(filepath);

            const file = Object.assign(Object.create(null), {
                filepath,
                newFilename: filename,
                originalFilename: value.name,
                mimetype: value.type,
                size: value.size,
                lastModifiedDate: new Date(),
                hashAlgorithm: null,
                hash: "",
                toJSON() {
                    return {
                        filepath,
                        newFilename: filename,
                        originalFilename: value.name,
                        mimetype: value.type,
                        size: value.size,
                        length: value.size,
                        mtime: stats.mtime
                    };
                }
            }) as formidable.File;

            Object.assign(files, { [key]: [file] });
        } else {
            // Handle other form fields
            Object.assign(fields, { [key]: [value.toString()] });
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
