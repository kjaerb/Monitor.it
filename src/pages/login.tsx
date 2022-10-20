import FacebookIcon from '@mui/icons-material/Facebook';
import GithubIcon from '@mui/icons-material/Github';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import { SvgIcon } from 'material-ui';
import { signIn, SignInResponse } from 'next-auth/react';
import { ReactElement } from 'react';

interface loginOptionProps {
  name: string;
  onClick: () => Promise<SignInResponse | undefined>;
  icon: ReactElement<SvgIcon>;
}

const loginOptions: loginOptionProps[] = [
  {
    name: 'Google',
    onClick: () => signIn('google'),
    icon: <GoogleIcon />,
  },
  {
    name: 'Github',
    onClick: () => signIn('github'),
    icon: <GithubIcon />,
  },
  {
    name: 'Facebook',
    onClick: () => signIn('facebook'),
    icon: <FacebookIcon />,
  },
  {
    name: 'Instagram',
    onClick: () => signIn('instagram'),
    icon: <InstagramIcon />,
  },
];

function Login() {
  return (
    <div className='w-screen flex h-screen md:h-screen flex-col md:flex-row'>
      <section className='w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center my-10'>
        <div className='shadow-lg border-md p-10'>
          <h1 className='font-bold mb-4'>Welcome</h1>
          <div className='grid grid-cols-1 gap-4'>
            {loginOptions.map((option, index: number) => {
              return (
                <button
                  className='font-bold py-2 border px-6 border-gray-300 rounded-md w-full flex  items-center focus:outline-none hover:bg-gray-100 transition-colors duration-200'
                  onClick={option.onClick}
                  key={index}
                >
                  {option.icon}
                  <span className='ml-4'>Sign in with {option.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className='w-full md:w-1/2 h-1/2 md:h-full text-white bg-gradient-to-b md:bg-gradient-to-r from-blue-700 to-blue-500 flex md:justify-center md:items-center'>
        <div className='lg:mx-32 mx-8 p-10'>
          <h1 className='font-bold  text-2xl pb-4'>Monitor.it</h1>
          <span className='font-bold text-3xl lg:text-5xl'>
            Explore your trainings with the worlds easiest monitoring tool
          </span>
        </div>
      </section>
    </div>
  );
}

export default Login;
