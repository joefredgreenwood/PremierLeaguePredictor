export default async function nestee({
  params,
}: {
  // params will also include previous dynamic routes so member is also available here
  params: Promise<{ nestee: string; member: string }>;
}) {
  const { nestee } = await params;
  return <h1>{nestee}</h1>;
}
