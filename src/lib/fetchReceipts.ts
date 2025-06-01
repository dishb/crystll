export default async function fetchReceipts() {
  const res = await fetch("/api/get-receipts", { method: "GET" });
  const receipts = await res.json();
  return receipts;
}
