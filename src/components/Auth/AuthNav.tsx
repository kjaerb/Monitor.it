import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../ui/Button/Button";
import ButtonMenu from "../ui/Button/ButtonMenu";
import AvatarImage from "../ui/Image/AvatarImage";

function AuthNav() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <Button href={"/dashboard"} className='mx-2'>
            Dashboard
          </Button>
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
        <Button variant='ternary' onClick={() => signIn("google")}>
          Sign in
        </Button>
      )}
    </div>
  );
}

export default AuthNav;
