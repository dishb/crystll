export default interface EditFormProps {
  id: string;
  title: string;
  type: "receipt" | "invoice";
  merchant: string;
  total: string;
  tax: string;
  time: string;
  date: string;
  onSuccess: () => void;
}
