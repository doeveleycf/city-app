import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          🏙️ City App
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/places" className="hover:text-primary transition">
            Lugares
          </Link>
          <Link href="/events" className="hover:text-primary transition">
            Eventos
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
