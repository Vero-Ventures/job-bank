import JobLists from "@/components/JobLists";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <JobLists />
    </div>
  );
}
