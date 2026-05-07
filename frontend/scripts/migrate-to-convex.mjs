import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
    console.error("NEXT_PUBLIC_CONVEX_URL not found in .env.local");
    process.exit(1);
}

const folders = [
    { id: 'FILDA 2025', title: 'FILDA 2025 - Feira Internacional de Luanda', date: '2025-07-22', location: 'Luanda', type: 'Event', dir: 'eventos', description: 'Participação da Namtech Pro na Feira Internacional de Luanda.' },
    { id: 'FEIRA DA CIDADE de MOÇAMEDES 2025', title: 'Feira da Cidade de Moçâmedes 2025', date: '2025-03-21', location: 'Namibe', type: 'Event', dir: 'eventos', description: 'Exposição de equipamentos marítimos na Feira da Cidade de Moçâmedes.' },
    { id: 'FEIRA DO TOMATE 2025 MOÇAMEDES', title: 'Feira do Tomate 2025', date: '2025-06-12', location: 'Namibe', type: 'Event', dir: 'eventos', description: 'Apoio tecnológico e exposição na Feira do Tomate.' },
    { id: 'FEIRA DO TURISMO 2024 cidade MOÇAMEDES', title: 'Feira do Turismo 2024', date: '2024-10-15', location: 'Namibe', type: 'Event', dir: 'eventos', description: 'Apresentação de soluções de navegação para o setor de turismo.' },
    { id: 'SEMI RIGIDO AFRICAN PARKS', title: 'Projeto African Parks - Manutenção Semi-Rígidos', date: '2025-04-08', location: 'Parque Nacional de Iona', type: 'Project', dir: 'trabalhos', description: 'Manutenção técnica e instalação de sistemas em embarcações semi-rígidas.' },
];

async function uploadFile(filePath) {
    const fileName = path.basename(filePath);
    console.log(`Uploading ${fileName}...`);
    
    // Get upload URL from Convex
    const uploadUrlResponse = execSync(`npx convex run events:generateUploadUrl`, { encoding: 'utf8' }).trim();
    // npx might output some info, so we need to be careful. 
    // Usually it outputs just the result if run via convex CLI.
    // If it has multiple lines, we take the last one or try to parse it.
    const uploadUrl = uploadUrlResponse.split('\n').pop().trim().replace(/'/g, '');

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = fileName.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg';

    const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body: fileBuffer
    });

    if (!response.ok) {
        throw new Error(`Failed to upload ${fileName}: ${response.statusText}`);
    }

    const { storageId } = await response.json();
    return storageId;
}

async function migrate() {
    for (const folder of folders) {
        console.log(`\n--- Migrating ${folder.title} ---`);
        const folderPath = path.join(process.cwd(), 'public/images', folder.dir, folder.id);
        
        if (!fs.existsSync(folderPath)) {
            console.warn(`Folder not found: ${folderPath}`);
            continue;
        }

        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp'));
        const videoFiles = files.filter(f => f.toLowerCase().endsWith('.mp4'));
        
        const allFiles = [...imageFiles, ...videoFiles];
        const storageIds = [];

        for (const file of allFiles) {
            try {
                const sid = await uploadFile(path.join(folderPath, file));
                storageIds.push(sid);
            } catch (e) {
                console.error(e.message);
            }
        }

        if (storageIds.length > 0) {
            const mainStorageId = storageIds[0];
            const galleryStorageIds = storageIds;

            console.log(`Saving event to Convex: ${folder.title}`);
            const args = JSON.stringify({
                title: folder.title,
                description: folder.description,
                date: folder.date,
                location: folder.location,
                type: folder.type,
                mainStorageId,
                galleryStorageIds
            });

            // Use npx convex run to execute the internal mutation
            // We escape the JSON for the shell
            const escapedArgs = args.replace(/"/g, '\\"');
            execSync(`npx convex run migrations:uploadFromLocal "${escapedArgs}"`, { stdio: 'inherit' });
        }
    }

    console.log('\nMigration complete!');
}

migrate().catch(console.error);
