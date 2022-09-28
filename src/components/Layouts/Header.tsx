import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/ui/Button/button";
import { useRouter } from "next/router";

function LandingPageHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='border-b max-w-3xl mx-auto py-3'>
      <nav className='flex justify-between items-center'>
        <span className='font-bold text-3xl'>
          Monitor.
          <span className='text-blue-600 font-bold text-3xl'>it</span>
        </span>
        <div>
          {session ? (
            <div>
              <Button
                onClick={() => router.push("/dashboard")}
                variant='transparent'>
                Dashboard
              </Button>
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            <Button onClick={() => signIn("google")}>Login</Button>
          )}
        </div>
      </nav>
    </div>
  );
}

export { LandingPageHeader };
