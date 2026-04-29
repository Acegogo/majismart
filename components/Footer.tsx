export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,229,255,0.18)] mt-6 relative">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)",
        }}
      />
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[11px] text-white/55">
        <div className="flex items-center gap-3">
          <span>
            &copy; {new Date().getFullYear()} MAJISMART · Republic of Kenya
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            Ministry of Water, Sanitation &amp; Irrigation
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono uppercase tracking-widest">
          <span>Build {process.env.NEXT_PUBLIC_BUILD_ID || "0429.01"}</span>
          <span>·</span>
          <span>Powered by Caledonia Heights</span>
        </div>
      </div>
    </footer>
  );
}
