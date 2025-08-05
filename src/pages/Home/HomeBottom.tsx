function HomeBottom() {
  return (
    <div className="mt-5 text-white ">
      <span className="text-center">
        <h1 className="font-bold">Want to learn more?</h1>
      </span>
      <span className="mt-5 grid grid-flow-row md:grid-flow-col w-75 m-auto gap-3">
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-1 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition">
          Buy $Dragon
        </button>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-1 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition">
          How does it work?
        </button>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-1 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition">
          Documentation
        </button>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-1 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition">
          Contracts
        </button>
      </span>
    </div>
  );
}

export default HomeBottom;
