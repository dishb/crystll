export default function validateFile(file: File): boolean {
  const validTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/tiff",
    "image/heic",
    "application/pdf",
  ];

  if (!file) {
    return false;
  }

  if (!validTypes.includes(file.type)) {
    return false;
  }

  return true;
}
