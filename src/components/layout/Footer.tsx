import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/10 flex flex-col md:flex-row justify-between items-center px-lg py-xl max-w-container-max mx-auto w-full mt-xxl relative z-10">
      <div className="mb-md md:mb-0">
        <span className="font-headline-md text-headline-md text-on-surface block mb-xs">EventosTec</span>
        <span className="font-body-md text-body-md text-on-surface-variant">© 2026 EventosTec. Todos os direitos reservados.</span>
      </div>
      <nav className="flex flex-wrap gap-lg justify-center">
        <Link href="/docs" className="font-label-sm text-label-sm text-on-surface-variant hover:text-white transition-colors">Documentação</Link>
        <Link href="/privacy" className="font-label-sm text-label-sm text-on-surface-variant hover:text-white transition-colors">Política de Privacidade</Link>
        <Link href="/support" className="font-label-sm text-label-sm text-on-surface-variant hover:text-white transition-colors">Suporte</Link>
        <Link href="/contact" className="font-label-sm text-label-sm text-on-surface-variant hover:text-white transition-colors">Fale Conosco</Link>
      </nav>
    </footer>
  );
}
