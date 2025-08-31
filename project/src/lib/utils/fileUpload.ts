import { put, del } from '@vercel/blob';
import { NextRequest } from 'next/server';

interface FileData {
    url: string;
    pathname: string;
}

interface FormResult {
    fields: Record<string, string[]>;
    files: Record<string, FileData[]>;
}

export const parseForm = async (
    req: NextRequest
): Promise<FormResult> => {
    const formData = await req.formData();
    const fields: Record<string, string[]> = {};
    const files: Record<string, FileData[]> = {};

    // Process each entry in the FormData
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            // Handle file upload to Vercel Blob
            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const blob = await put(filename, value, {
                access: 'public',
                addRandomSuffix: true,
            });

            files[key] = [{
                url: blob.url,
                pathname: blob.pathname
            }];
        } else {
            // Handle other form fields
            fields[key] = [value.toString()];
        }
    }

    return { fields, files };
};

export const removeFile = async (pathname: string) => {
    try {
        if (pathname) {
            await del(pathname);
        }
    } catch (error) {
        console.error('Error removing file:', error);
    }
};