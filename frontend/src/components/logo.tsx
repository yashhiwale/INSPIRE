import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
      {/* Logo Image Container */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        <Image 
          src="/logo.png" 
          alt="INSPIRE Logo" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      
      {/* Text & Tagline Container */}
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-extrabold tracking-tight text-blue-900 dark:text-blue-400 leading-none">
          iNSPIRE
        </span>
        <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.12em] uppercase mt-1">
          From Potential to Opportunity
        </span>
      </div>
    </Link>
  );
}