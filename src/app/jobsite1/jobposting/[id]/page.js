import { Button } from '@/components/ui/button';

export default function JobPosting({ params }) {
  const postID = params.id;
  console.log(postID);
  //Todo: getting job post detail from database
  return (
    <main className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold">Senior Frontend Engineer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Acme Inc.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                Full-time
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                San Francisco, CA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                Monday - Friday, 9am - 5pm
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                Engineering
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                Software Development
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">Frontend</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About the Role</h2>
          <p className="text-gray-500 dark:text-gray-400">
            We are seeking a talented and experienced Senior Frontend Engineer
            to join our growing team. In this role, you will be responsible for
            designing, developing, and maintaining our web-based applications,
            ensuring they are visually appealing, user-friendly, and highly
            performant.
          </p>
          <h2 className="text-2xl font-bold">Responsibilities</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400 list-disc pl-6">
            <li>
              Develop and implement complex user interfaces using modern
              frontend technologies such as React, TypeScript, and CSS
              frameworks
            </li>
            <li>
              Collaborate with cross-functional teams, including designers and
              backend engineers, to deliver high-quality, scalable, and
              maintainable solutions
            </li>
            <li>
              Optimize web applications for performance, accessibility, and
              responsiveness
            </li>
            <li>
              Participate in code reviews, provide feedback, and mentor junior
              developers
            </li>
            <li>
              Stay up-to-date with the latest frontend development trends and
              best practices
            </li>
          </ul>
          <h2 className="text-2xl font-bold">Requirements</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400 list-disc pl-6">
            <li>
              s degree in Computer Science, Software Engineering, or a related
              field
            </li>
            <li>
              5+ years of experience in frontend development, with a strong
              understanding of JavaScript, HTML, and CSS
            </li>
            <li>
              Proficient in React and its ecosystem, including Redux, React
              Router, and Hooks
            </li>
            <li>
              Experience with TypeScript and its benefits in large-scale
              applications
            </li>
            <li>
              Familiarity with modern CSS-in-JS solutions, such as Styled
              Components or Emotion
            </li>
            <li>Excellent problem-solving and analytical skills</li>
            <li>Strong communication and collaboration skills</li>
          </ul>
          <div className="flex justify-end">
            <Button>Apply Now</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
