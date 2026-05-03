import { getHealth } from "@/lib/api";

export default async function Page() {
  const data = await getHealth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-danger">OnPar</h1>
      <em>{JSON.stringify(data)}</em>
    </div>
  );
}
