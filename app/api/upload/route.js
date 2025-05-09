import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const { image } = await req.json();
        if (!image) {
            return NextResponse.json({ message: 'No image provided' }, { status: 400 });
        }
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'ecommerce_products',
        });
        return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
    } catch (err) {
        console.error('Cloudinary upload error:', err);
        return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
    }
}