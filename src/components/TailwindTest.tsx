export default function TailwindTest() {
  return (
    <div className="p-8">
      <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Tailwind CSS is working!</h1>
        <p className="mt-2">Green background indicates successful setup</p>
      </div>
      <div className="mt-4 p-4 border border-blue-300 rounded-lg bg-blue-50">
        <p className="text-blue-800">Secondary test element</p>
      </div>
    </div>
  );
}