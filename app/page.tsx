import { app } from "@/lib/firebase";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Firebase Connected 🚀</h1>

      <pre className="mt-4">{JSON.stringify(app.options, null, 2)}</pre>
    </main>
  );
}
