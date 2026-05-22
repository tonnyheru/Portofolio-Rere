export default function Footer() {
  return (
    <footer className="border-t border-graphite-2/40 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-void/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neon/10 border border-neon/25 flex items-center justify-center">
            <span className="font-display font-bold text-neon text-xs">R</span>
          </div>
          <span className="font-body text-silver/60 text-sm">Renaray Dwi Indah Sari</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://mail.google.com/mail/?view=cm&to=renaraayan@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-silver/40 text-xs hover:text-neon/70 transition-colors">
            renaraayan@gmail.com
          </a>
          <a href="https://wa.me/6285159522095"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-silver/40 text-xs hover:text-neon/70 transition-colors">
            085159522095
          </a>
        </div>
        <p className="font-mono text-silver/30 text-xs">Copyright © 2026, M Tonny Heru Susanto. All rights reserved</p>
      </div>
    </footer>
  );
}