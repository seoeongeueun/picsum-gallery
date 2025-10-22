import MasonryContainer from "./components/MasonryContainer";

function App() {
  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-center">
        <h1 className="text-theme p-4">Picsum List</h1>
        <MasonryContainer />
        <div className="w-full px-4 md:px-10 lg:px-0 lg:w-3/4"></div>
      </main>
    </>
  );
}

export default App;
