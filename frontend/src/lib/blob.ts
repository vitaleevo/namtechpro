import { PutBlobResult } from "@vercel/blob";

export async function uploadToBlob(
  file: File
): Promise<{ url: string; blob: PutBlobResult }> {
  const response = await fetch(`/api/upload?filename=${file.name}`, {
    method: "POST",
    body: file,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const newBlob = await response.json();
  return { url: newBlob.url, blob: newBlob };
}

export function getImageUrl(pathname: string): string {
  if (!pathname) return "";
  
  if (pathname.startsWith("http")) {
    return pathname;
  }
  
  if (pathname.startsWith("/")) {
    return pathname;
  }
  
  return `/images/${pathname}`;
}