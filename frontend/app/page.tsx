import Twin from '@/components/twin';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 relative overflow-hidden">
      {/* Premium glossy background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/10 via-blue-400/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-400/10 via-cyan-400/5 to-transparent rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Grid overlay for modern tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Glossy shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 h-screen flex flex-col relative z-10">
        <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
          {/* Professional header */}
          <header className="mb-6 md:mb-8 text-center">
            <div className="inline-block">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Digital Twin Assistant
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 rounded-full" />
            </div>
          </header>

          {/* Chat interface with premium frame */}
          <div className="flex-1 min-h-0 mb-6">
            <div className="h-full relative">
              {/* Glossy container wrapper */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20" />
              <div className="relative h-full p-2">
                <Twin />
              </div>
            </div>
          </div>

          {/* Premium footer */}
          <footer className="text-center pb-2">
            <div className="inline-block bg-white/60 backdrop-blur-md rounded-full px-8 py-3 border border-white/40 shadow-lg">
              <p className="text-xs md:text-sm text-slate-600 font-medium">
                &copy; {new Date().getFullYear()} Nagarjun
                <span className="mx-2 text-cyan-400">·</span>
                <span className="text-slate-500">AI-Powered Insights</span>
                <span className="mx-2 text-cyan-400">·</span>
                <span className="text-slate-400 text-xs">Verify independently</span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}