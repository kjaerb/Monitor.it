import { signIn, signOut, useSession } from "next-auth/react";
import { ButtonMenu } from "@/components/ui/Button/ButtonMenu";
import { AvatarImage } from "@/components/ui/Image/AvatarImage";
import Button from "../ui/Button/Button";

function AuthNav() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <Button href={"/dashboard"}>Dashboard</Button>

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
        <Button href={"/dashboard"} onClick={() => signIn("github")}>
          Sign in
        </Button>
      )}
    </div>
  );
}

export default AuthNav;
