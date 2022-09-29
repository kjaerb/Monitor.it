import { signOut, useSession } from "next-auth/react";
import Button from "../ui/Button/Button";
import ButtonMenu from "../ui/Button/ButtonMenu";
import { AvatarImage } from "../ui/Image/AvatarImage";

function AuthNav() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <Button className='mx-2'>Dashboard</Button>
          <ButtonMenu
            items={[
              {
                children: "Sign out",
                onClick: () => signOut(),
              },
            ]}>
            <span className='font-bold mr-2'>{session.user?.name} </span>
            <AvatarImage src={session.user?.image!} />
          </ButtonMenu>
        </>
      ) : (
        <Button href={"/login"}>Sign in</Button>
      )}
    </div>
  );
}

export default AuthNav;
