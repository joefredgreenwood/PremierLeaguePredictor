import Link from "next/link";

export default async function teamMember({
  params,
}: {
  params: Promise<{ member: string }>;
}) {
  const { member } = await params;
  return (
    <div>
      <h1>{member} </h1>
      <Link href={`/about/team/${member}/somethingToNest`}>Nestit</Link>
    </div>
  );
}
