import { DataTable } from "@/components/servicos/data-table";

import data from "../dashboard/data.json";

export default function Page() {
  return <DataTable data={data} />;
}
