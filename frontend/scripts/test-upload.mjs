import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

async function testUpload() {
    const filePath = 'public/images/eventos/FILDA 2025/f1.jpg';
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`Uploading to ${CONVEX_URL}/api/storage/upload...`);
    
    const response = await fetch(`${CONVEX_URL}/api/storage/upload`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'image/jpeg'
        },
        body: fileBuffer
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log(`Response: ${text}`);
}

testUpload();
