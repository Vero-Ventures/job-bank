/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HHxdFP9lbfv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function JobLists({ list }) {
  return (
    <div className="grid gap-6">
      {list.map((item) => (
        <div
          key={item}
          className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6"
        >
          <Link href="/jobposting" as={`/jobposting/${item}`}>
            <h3 className="text-xl font-bold mb-2">Software Engineer</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Acme Inc.</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              New York, NY
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              We are looking for an experienced software engineer to join our
              growing team. You will be responsible for developing and
              maintaining our web application.
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
