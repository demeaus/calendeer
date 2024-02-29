function Logo() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="../../public/deer.png"
        alt="Deer logo"
        className="h-14 w-14 rounded-full border-2 border-stone-800 bg-yellow-400 p-2"
      />
      <h1 className="text-xl font-bold">Calendeer</h1>
    </div>
  );
}

export default Logo;
