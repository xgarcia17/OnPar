import { getHealth } from "@/lib/api";

export default async function Page() {
  const data = await getHealth();

  return (
    <div>
      <h1>OnPar</h1>
      <em>{JSON.stringify(data)}</em>
    </div>
  );
}
