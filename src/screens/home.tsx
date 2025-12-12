export const Home = () => {
  const DEFAULT_DATA = {
    imageUrl:
      "https://rukminim2.flixcart.com/image/480/640/k6wiefk0/poster/c/c/a/extra-large-doraemon-cartoon-painting-poster-waterproof-canvas-original-imafp9fjpcjdbnfb.jpeg?q=90",
    message: "Hey love, just wanted to remind you how much you mean to me. Your smile brightens my world and your laughter is my favorite melody. Thank you for being my everything. I’m so lucky to have you. 💖",
  };

  return (
    <div
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 sm:px-6 sm:py-12"
      style={{
        backgroundImage: `url(${DEFAULT_DATA.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/40 via-purple-900/50 to-rose-900/60" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Floating hearts - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className={`absolute text-lg sm:text-2xl md:text-4xl opacity-60 animate-pulse ${
              i > 7 ? "hidden sm:block" : ""
            }`}
            style={{
              left: `${5 + i * 8}%`,
              top: `${8 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          >
            {i % 3 === 0 ? "💖" : i % 3 === 1 ? "✨" : "💕"}
          </span>
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6 max-w-4xl w-full">
        {/* Crown emoji */}
        <span className="text-4xl sm:text-5xl md:text-7xl animate-bounce">👑</span>

        {/* Title with gradient */}
        <h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-center tracking-tight leading-tight px-2"
          style={{
            background:
              "linear-gradient(135deg, #fff 0%, #ffd1dc 25%, #ffb6c1 50%, #ff69b4 75%, #fff 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s ease-in-out infinite",
            textShadow: "0 0 40px rgba(255, 105, 180, 0.5)",
            filter: "drop-shadow(0 4px 20px rgba(255, 182, 193, 0.4))",
          }}
        >
          World's Best
          <br />
          Girlfriend
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-2 sm:gap-4 my-1 sm:my-2">
          <div className="h-px w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-xl sm:text-2xl">💝</span>
          <div className="h-px w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        {/* Message card */}
        <div className="relative group w-full max-w-xs sm:max-w-md md:max-w-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          <p className="relative text-base sm:text-lg md:text-2xl text-white font-medium text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/30 shadow-2xl">
            <span className="mr-1 sm:mr-2">💌</span>
            {DEFAULT_DATA.message}
            <span className="ml-1 sm:ml-2">💌</span>
          </p>
        </div>

        {/* Bottom hearts */}
        <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl flex-wrap justify-center">
          <span className="animate-pulse" style={{ animationDelay: "0s" }}>
            ❤️
          </span>
          <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
            🧡
          </span>
          <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
            💛
          </span>
          <span
            className="animate-pulse hidden sm:inline"
            style={{ animationDelay: "0.6s" }}
          >
            💚
          </span>
          <span
            className="animate-pulse hidden sm:inline"
            style={{ animationDelay: "0.8s" }}
          >
            💙
          </span>
          <span
            className="animate-pulse hidden sm:inline"
            style={{ animationDelay: "1s" }}
          >
            💜
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 text-center">
        <a
          href="#bid"
          className="text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors"
        >
          Bid now and make your gf feel special
        </a>
      </footer>

      {/* Shimmer animation keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};