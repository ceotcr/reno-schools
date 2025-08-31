import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import type { NextApiRequest } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const parseForm = async (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise((resolve, reject) => {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public/schoolImages'),
            filename: (name, ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                return `${uniqueSuffix}${ext}`;
            },
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

export const removeFile = async (filePath: string) => {
    try {
        await fs.unlink(path.join(process.cwd(), 'public', filePath));
    } catch (error) {
        console.error('Error removing file:', error);
    }
};
