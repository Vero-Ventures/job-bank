import Image from 'next/image';

export default function Index() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>admin panel for managing your job listings</p>
      <Image src="/logo.png" alt="logo" width={200} height={200} />
    </div>
  );
}
