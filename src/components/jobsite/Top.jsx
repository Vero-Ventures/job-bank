import Image from 'next/image';
import Link from 'next/link';

export default function Top() {
  return (
    <header className="flex items-center justify-between w-full md:p-5">
      <Link
        className="flex items-center space-x-2 text-[#0b5394] font-bold"
        href="/jobsite2">
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
        <span>NewComers Job Site</span>
      </Link>
    </header>
  );
}
