import Login from "../components/Login";
import Nav from "../components/Nav";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 dark:bg-gray-700 dark:text-white">
      <Nav />
      <Login />
    </div>
  );
}
