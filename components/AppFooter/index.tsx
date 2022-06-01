import { useTranslation } from 'next-i18next';

type FooterProps = Record<string, never>;

const Footer: React.FC<FooterProps> = ({}) => {
  const { t } = useTranslation('common');

  return <footer id='footer'></footer>;
};

export default Footer;
