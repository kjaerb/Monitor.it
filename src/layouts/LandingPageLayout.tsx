import { LandingPageFooter } from '@/components/Layouts/Footer';
import { LandingPageHeader } from '@/components/Layouts/Header';

interface LandingPageLayoutProps {
  children?: React.ReactNode;
}

function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <>
      <LandingPageHeader />
      {children}
      <LandingPageFooter />
    </>
  );
}

export default LandingPageLayout;
