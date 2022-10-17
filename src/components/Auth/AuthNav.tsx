import { signIn, signOut, useSession } from "next-auth/react";
import { ButtonMenu } from "@/components/ui/Button/ButtonMenu";
import { AvatarImage } from "@/components/ui/Image/AvatarImage";
import Link from "next/link";

function AuthNav() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <Link href={"/dashboard"}>
            <button>Dashboard</button>
          </Link>

          <ButtonMenu
            className='py-1'
            items={[
              {
                children: "Sign out",
                onClick: () => signOut(),
              },
            ]}>
            <span className='font-bold mr-2'>{session.user?.name} </span>
            <AvatarImage src={session.user?.image} width={30} height={30} />
          </ButtonMenu>
        </>
      ) : (
        // <Button href={"/login"}>Sign in</Button>
        <Link href={"/dashboard"}>
          <button onClick={() => signIn("google")}>Sign in</button>
        </Link>
      )}
    </div>
  );
}

export default AuthNav;
