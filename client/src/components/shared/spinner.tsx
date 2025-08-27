import { LoaderCircle } from "lucide-react";

export default function Spinner({ loading = false }: { loading: boolean }) {
  return loading ? <LoaderCircle className="animate-spin w-4 ml-2" /> : <></>;
}
