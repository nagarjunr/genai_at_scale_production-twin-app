import Twin from '@/components/twin';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden">
      {/* Premium glossy background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-slate-200/20 via-gray-200/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-200/20 via-slate-200/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Premium glossy shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 h-screen flex flex-col relative z-10">
        <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
          {/* Chat interface with premium glass frame */}
          <div className="flex-1 min-h-0 mb-6 group">
            <div className="h-full relative transition-all duration-300">
              {/* Premium glass morphism container */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/3 via-transparent to-gray-500/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-2">
                <Twin />
              </div>
            </div>
          </div>

          {/* Premium footer with hover effect */}
          <footer className="text-center pb-2">
            <div className="inline-block bg-white/70 backdrop-blur-lg rounded-full px-8 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-105">
              <p className="text-xs md:text-sm text-slate-700 font-medium">
                &copy; {new Date().getFullYear()} Nagarjun
                <span className="mx-2 text-slate-400 opacity-50">·</span>
                <span className="text-slate-600">AI-Powered Insights</span>
                <span className="mx-2 text-slate-400 opacity-50">·</span>
                <span className="text-slate-500 text-xs">Verify independently</span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}