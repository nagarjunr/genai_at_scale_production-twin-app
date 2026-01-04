import Twin from '@/components/twin';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Subtle mesh texture background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft gradient orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-gray-200/20 via-gray-100/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-gray-200/20 via-gray-100/10 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto h-screen flex flex-col relative z-10 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
          {/* Full-bleed chat interface */}
          <div className="flex-1 min-h-0 mb-6">
            <div className="h-full relative">
              {/* Glass container */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_12px_56px_rgba(0,0,0,0.12)]" />
              <div className="relative h-full">
                <Twin />
              </div>
            </div>
          </div>

          {/* Minimal footer */}
          <footer className="text-center pb-4">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-lg rounded-full px-6 py-2.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <p className="text-xs md:text-sm text-gray-700 font-medium">
                © {new Date().getFullYear()} Nagarjun
                <span className="mx-2 text-gray-400">·</span>
                <span className="text-gray-600">AI-Powered Insights</span>
                <span className="mx-2 text-gray-400">·</span>
                <span className="text-gray-500 text-xs">Verify independently</span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}