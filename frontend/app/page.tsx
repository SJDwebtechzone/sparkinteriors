import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section
        id="home"
        className="flex h-screen items-center justify-center bg-black"
      >
        <h1 className="text-5xl font-bold text-white">
          Spark Interiors
        </h1>
      </section>
    </main>
  );
}