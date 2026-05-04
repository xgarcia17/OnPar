import { getHealth } from "@/lib/api";

export default async function Home() {
  const data = await getHealth();

  return (
    <div className="padding-responsive min-h-screen flex flex-col items-center" style={{ paddingTop: '20vh' }}>
      <h1 className="text-center h1-responsive font-bold text-danger padding-responsive">
        OnPar
      </h1>
      <p className="text-center p-responsive">
        <em>{JSON.stringify(data)}</em>
      </p>
    </div>
  );
}
