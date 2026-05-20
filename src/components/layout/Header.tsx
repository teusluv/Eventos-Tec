'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/10 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-lg py-md max-w-container-max mx-auto left-0 right-0">
      <div className="flex-1 flex justify-start">
        <Link href="/" className="text-headline-md font-headline-md font-bold tracking-tight text-primary-fixed-dim">
          Event Tecs
        </Link>
      </div>
      <nav className="hidden md:flex flex-1 justify-center items-center gap-lg">
        <Link 
          href="/explore" 
          className={`${
            pathname === '/explore' 
              ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' 
              : 'text-on-surface-variant hover:text-primary-fixed border-b-2 border-transparent pb-1'
          } font-label-sm text-label-sm transition-all duration-300`}
        >
          Explorar
        </Link>
        <Link 
          href="/#about" 
          className="text-on-surface-variant border-b-2 border-transparent pb-1 font-label-sm text-label-sm transition-all duration-300 hover:text-primary-fixed"
        >
          Sobre
        </Link>
      </nav>
      <div className="flex-1 flex justify-end items-center gap-md">
      </div>
    </header>
  );
}
