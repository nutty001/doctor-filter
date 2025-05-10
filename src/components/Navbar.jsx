import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/doctors">DocFilter</Link>
      </div>
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search by name"
          className="w-full bg-gray-200 border px-20 py-2 rounded"
        />
      </div>
      <div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800 hover:cursor-pointer transition">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
