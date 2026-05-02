export async function getHealth() {
  const res = await fetch("http://localhost:4000/health", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to reach API");
  }

  return res.json();
}
