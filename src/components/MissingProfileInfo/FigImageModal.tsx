import Modal from '../Modal/Modal';
import Button from '../ui/Button/Button';

interface FigImageModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  handleInnerSubmit: (arg: boolean) => void;
}

export function FigImageModal({
  isOpen,
  setIsOpen,
  handleInnerSubmit,
}: FigImageModalProps) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-center'>
          We see you have a FIG profile picture. Do you want to use your FIG
          image as your profile image or the default image?
        </h1>
        <div>
          <Button
            onClick={() => handleInnerSubmit(false)}
            variant='white'
            className='mx-2 mt-4'
          >
            Use Standard image
          </Button>
          <Button onClick={() => handleInnerSubmit(true)} className='mx-2 mt-4'>
            Use FIG image
          </Button>
        </div>
      </div>
    </Modal>
  );
}
