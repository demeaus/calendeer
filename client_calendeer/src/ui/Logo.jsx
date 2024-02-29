function Logo() {
  return (
    <div className="flex items-center gap-5">
      <img
        src="/deer.png"
        alt="Deer logo"
        className="h-12 w-12 rounded-full border-2 border-stone-800 bg-yellow-400 p-1"
      />
      <h1 className="text-2xl font-bold">Calendeer</h1>
    </div>
  );
}

export default Logo;
