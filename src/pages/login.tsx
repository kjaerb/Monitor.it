import Button from '@/components/ui/Button/Button';
import Loading from '@/components/ui/Loading/Loading';
import FacebookIcon from '@mui/icons-material/Facebook';
import GithubIcon from '@mui/icons-material/Github';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import { SvgIcon } from 'material-ui';
import { signIn, SignInResponse, signOut, useSession } from 'next-auth/react';
import { ReactElement } from 'react';

interface loginOptionProps {
  name: string;
  onClick: () => Promise<SignInResponse | undefined>;
  icon: ReactElement<SvgIcon>;
}

const callbackUrl = '/dashboard';

const loginOptions: loginOptionProps[] = [
  {
    name: 'Google',
    onClick: () => signIn('google', { callbackUrl }),
    icon: <GoogleIcon />,
  },
  {
    name: 'Github',
    onClick: () => signIn('github', { callbackUrl }),
    icon: <GithubIcon />,
  },
  {
    name: 'Facebook',
    onClick: () => signIn('facebook', { callbackUrl }),
    icon: <FacebookIcon />,
  },
  {
    name: 'Instagram',
    onClick: () => signIn('instagram', { callbackUrl }),
    icon: <InstagramIcon />,
  },
];

function Login() {
  const { data: session, status } = useSession();

  return (
    <div className='w-screen flex h-screen md:h-screen flex-col md:flex-row'>
      <section className='w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center '>
        <div className='shadow-lg border-md p-10 mt-10'>
          <h1 className='font-bold mb-4'>Welcome</h1>
          {status === 'loading' && <Loading />}
          {status === 'authenticated' && (
            <Button onClick={() => signOut()}>Sign out</Button>
          )}
          {status === 'unauthenticated' && (
            <div className='grid grid-cols-1 gap-4'>
              {loginOptions.map((option, index: number) => {
                return (
                  <Button
                    variant='white'
                    className='font-bold py-2 border px-6 border-gray-300 rounded-md w-full flex  items-center focus:outline-none transition-colors duration-200'
                    onClick={option.onClick}
                    key={index}
                  >
                    {option.icon}
                    <span className='ml-4'>Sign in with {option.name}</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className='w-full md:w-1/2 h-1/2 md:h-full text-white bg-gradient-to-b md:bg-gradient-to-r from-blue-700 to-blue-500 flex md:justify-center md:items-center'>
        <div className='lg:mx-32 mx-8 p-10 flex flex-col'>
          <h1 className='font-bold  text-2xl pb-4'>Monitor.it</h1>
          <span className='font-bold text-3xl lg:text-5xl'>
            Explore your trainings with the worlds easiest monitoring tool
          </span>
          <span className='text-xl pt-10'>
            Start by signing in to create an account.
          </span>
        </div>
      </section>
    </div>
  );
}

export default Login;
