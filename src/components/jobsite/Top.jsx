import Image from 'next/image';
import Link from 'next/link';

export default function Top({ jobsiteName, colourTheme }) {
  return (
    <header className="flex items-center justify-between w-full md:p-5">
      <Link
        className={`flex items-center space-x-2 text-[${colourTheme.base}] font-bold`}
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
        <span>{`${jobsiteName} Job Site`}</span>
      </Link>
    </header>
  );
}
