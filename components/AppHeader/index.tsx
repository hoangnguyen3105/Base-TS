import { useTranslation } from 'next-i18next';
import ConnectWalletButton from '../ConnectWalletButton';

type HeaderProps = Record<string, never>;

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <header id='header'>
        <ConnectWalletButton />
      </header>
    </>
  );
};

export default Header;
