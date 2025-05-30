export default async function uploadReceipt(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload-receipt", {
    method: "POST",
    body: formData,
  });

  return res;
}
