function Logo() {
  return (
    <div className="flex items-center gap-3  md:gap-5">
      <img
        src="/deer.png"
        alt="Deer logo"
        className="h-8 w-8 rounded-full border-2 border-stone-800 bg-yellow-400 p-1 md:h-12 md:w-12"
      />
      <h1 className="text-xl font-bold md:text-2xl">Calendeer</h1>
    </div>
  );
}

export default Logo;
