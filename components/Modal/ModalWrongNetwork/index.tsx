import { useEffect, FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Spin } from 'antd';

import LoadingIcon from '@components//common/LoadingIcon';
import Modal from '..';

import selectedConnection from 'redux/connection/selector';

import { METAMASK } from 'connectors/constants';
import { setupNetwork } from 'utils/wallet';
import { useAppSelector } from 'hooks/useStore';

const { Paragraph } = Typography;

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = ({}) => {
  const { t } = useTranslation();

  const { isWrongNetwork } = useAppSelector(selectedConnection.getConnection);
  const connectedWalletType = useAppSelector(selectedConnection.getConnectedWalletType);

  //If website must connect to 1 specific chain, set this to that chain id
  const targetChainId = 97;

  useEffect(() => {
    if (isWrongNetwork) {
      const switchNetwork = async () => {
        try {
          if (connectedWalletType === METAMASK && targetChainId) {
            await setupNetwork(connectedWalletType, targetChainId);
          }
        } catch (error: any) {}
      };

      switchNetwork();
    }
  }, [connectedWalletType, isWrongNetwork]);

  return (
    <Modal visible={isWrongNetwork} maskClosable={false} showCloseIcon={false} destroyOnClose>
      <div className='network_notice'>
        <Spin indicator={<LoadingIcon />} />
        <Paragraph className='title'>{t('header.network_notice_title')}</Paragraph>
        <span
          dangerouslySetInnerHTML={{
            __html: t('header.network_notice_desc', { networkName: '' }),
          }}
          className='desc'
        />
      </div>
    </Modal>
  );
};

export default ModalWrongNetwork;
