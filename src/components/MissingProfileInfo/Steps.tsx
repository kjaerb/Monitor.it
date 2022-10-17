import clsx from 'clsx';
import { steps } from 'stores/useStepStore';

interface StepsProps {
  currentStep: number;
}

export default function Steps({ currentStep }: StepsProps) {
  return (
    <nav aria-label='Progress'>
      <ol
        role='list'
        className='space-y-4 text-white md:flex md:space-y-0 md:space-x-8'
      >
        {steps.map((step) => (
          <li key={step.step} className='md:flex-1'>
            <div className={clsx('group  flex flex-col py-2 md:pt-4 md:pb-0 ')}>
              <div className={clsx('mb-2 h-1 bg-gray-200')}>
                <div
                  className={clsx('h-full', [
                    step.step <= currentStep && 'w-full bg-blue-500',
                  ])}
                ></div>
              </div>
              <span
                className={clsx(
                  [step.step === currentStep ? 'text-white' : 'text-gray-500'],
                  'text-xs  font-semibold uppercase tracking-wide '
                )}
              >
                {step.title}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
