import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Modal from '@/components/Modal/Modal';

import Button from '../Button/Button';

export function OAuthErrorModal() {
  const router = useRouter();

  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    router.query.error === 'OAuthAccountNotLinked' && setErrorModal(true);
  }, [router.isReady, router.query.error]);

  return (
    <Modal isOpen={errorModal} variant={'inverted'} setIsOpen={setErrorModal}>
      <div className='flex flex-col'>
        <h1 className='font-bold text-2xl'>Error</h1>
        <div>
          <p className='text-lg'>
            There appears to be an account already linked with this email. Try
            another provider
          </p>
        </div>
        <div className='self-end'>
          <Button
            className='w-content mr-2'
            variant='light'
            onClick={() => setErrorModal(false)}
          >
            Close
          </Button>
          <Button className='w-content' onClick={() => router.push('/login')}>
            Sign in again
          </Button>
        </div>
      </div>
    </Modal>
  );
}
