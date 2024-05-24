import Image from 'next/image';
import Link from 'next/link';

export default function Top({ jobsiteInfo }) {
  return (
    <header className="flex items-center justify-between w-full md:p-5">
      <Link
        className={`flex items-center space-x-2 ${jobsiteInfo.colours.baseText} font-bold`}
        href={jobsiteInfo.endpoint}>
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
        <span>{`${jobsiteInfo.jobsiteName} Job Site`}</span>
      </Link>
    </header>
  );
}
