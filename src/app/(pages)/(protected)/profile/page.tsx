import { auth } from "@/auth";

export default async function Profile() {
  
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}
