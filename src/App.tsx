import MasonryContainer from "./components/MasonryContainer";

function App() {
  return (
    <>
      <header className="flex flex-row justify-center items-center">
        <h1 className="text-theme p-4 font-paperozi font-extrabold">
          Picsum Lorem
        </h1>
        <h2 className="mb-2">📷</h2>
      </header>

      <main className="w-full px-2 md:px-4 lg:px-12">
        <MasonryContainer />
      </main>
    </>
  );
}

export default App;
