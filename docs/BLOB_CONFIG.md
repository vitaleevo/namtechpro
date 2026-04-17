# Configuração do Vercel Blob para CDN de Imagens

## Passo 1: Instalar dependência

```bash
npm install @vercel/blob
```

## Passo 2: Configurar variável de ambiente

No dashboard do Vercel, adicionar:
- `BLOB_READ_WRITE_TOKEN` - Token do Vercel Blob (gerar em https://vercel.com/blob)

## Passo 3: Adicionar rota de upload

Já criada em `src/app/upload/route.ts`

## Passo 4: Usar no código

```typescript
import { uploadToBlob, getImageUrl } from "@/lib/blob";

const handleUpload = async (file: File) => {
  const { url } = await uploadToBlob(file);
  return url;
};
```

## Limites

- Plano gratuito: 5GB armazenamento, 100GB bandwidth/mês
- Precisa de token para escrita (Blob Read/Write Token)