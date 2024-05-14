import Image from 'next/image';
import Link from 'next/link';

export default function Top() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link className="flex items-center" href="/jobsite1">
          <Image
            alt="Logo"
            className="h-12 w-12"
            height={32}
            src="/placeholder.svg"
            style={{
              aspectRatio: '32/32',
              objectFit: 'cover',
              marginRight: '20px',
            }}
            width={32}
          />
          <span className="text-lg font-bold">Indigenous Job Site</span>
        </Link>
      </div>
    </header>
  );
}
