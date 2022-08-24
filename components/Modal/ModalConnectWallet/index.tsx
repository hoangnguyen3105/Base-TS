import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Typography, Spin } from 'antd';
import Link from 'next/link';

import Modal from 'components/Modal';
import LoadingIcon from '@components//common/LoadingIcon';
import AppButton from 'components/AppButton';

import {
  handleSetConnectedWalletType,
  handleSetConnectModal,
  handleSetLoadingMetamask,
  handleSetWrongNetwork,
} from 'redux/connection/slice';
import { getErrorConnectMessage } from 'connectors';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { METAMASK, METAMASK_DEEPLINK, WALLET_CONNECT } from 'connectors/constants';
import selectedConnection from 'redux/connection/selector';

import iconMetaMask from 'public/svg/logo_metamask.svg';
import iconWalletConnect from 'public/svg/icon_walletconnect.svg';
import { useConnectWallet } from 'hooks/useConnectWallet';

declare let window: any;

const { Paragraph } = Typography;

const ModalConnectWallet = () => {
  const { t } = useTranslation();
  const { active, deactivate, account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { isShowConnectModal } = useAppSelector(selectedConnection.getConnection);

  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));

  const [isShowMetaMask, setIsShowMetaMask] = useState(false);
  const [connectedWalletType, setConnectedWalletType] = useState('');

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  const handleConnectMetamask = () => {
    connectInjected(() => setIsShowMetaMask(true), setConnectedWalletType(METAMASK));

    if (window.ethereum) {
      handleHideModalConnectWallet();
    }
  };

  const handleConnectWallet = () => {
    handleHideModalConnectWallet();

    connectWalletConnect({
      failed: (err) => {
        dispatch(handleSetLoadingMetamask(false));
        getErrorConnectMessage(err, deactivate);
        dispatch(handleSetWrongNetwork(true));
      },
    });

    setConnectedWalletType(WALLET_CONNECT);
  };

  useEffect(() => {
    if (active && account) {
      dispatch(handleSetConnectedWalletType(connectedWalletType));
    }
  }, [connectedWalletType, active, account]);

  const renderConnectWallet = () => (
    <div className='wallet-modal'>
      <p className='wallet-modal__title'>{t('common.txt_connect_wallet_modal_title')}</p>
      <p className='wallet-modal__content'>{t('common.txt_connect_wallet_modal_content')}</p>
      <AppButton
        text={t('common.txt_walletconnect')}
        onClick={handleConnectMetamask}
        className='wallet-modal__button--first'
        variant='default'
      />
      <AppButton
        onClick={handleConnectWallet}
        className='wallet-modal__button--second'
        variant='default'
        text={t('common.txt_walletconnect')}
      />
    </div>
  );

  const renderNoMetamask = () => (
    <div className='popup_metamask'>
      {connectedWalletType === WALLET_CONNECT ? (
        <div className={'metamask_notfound'}>
          <Paragraph className='title'>{t('header.walletconnect_not_found_title')}</Paragraph>
          <Image layout='fill' src={iconWalletConnect} alt='' />
          <Link href=''>
            <a href='' className='link' onClick={handleConnectWallet} rel='noreferrer'>
              {t('header.walletconnect_reconnect')}
            </a>
          </Link>
        </div>
      ) : isEthereum ? (
        <div className={'connect_metamask'}>
          <Paragraph className='title'>{t('header.connecting_title')}</Paragraph>
          <Image layout='fill' src={iconMetaMask} alt='' />
          <Spin size={'large'} indicator={<LoadingIcon />} />
        </div>
      ) : (
        <div className={'metamask_notfound'}>
          <Paragraph className='title'>{t('header.metamask_not_found_title')}</Paragraph>
          <Image width={565} height={114} src={iconMetaMask} alt='' />
          <Link href=''>
            <a target='_blank' href={METAMASK_DEEPLINK} className='link' rel='noreferrer'>
              {t('common.txt_metamask_not_found_button')}
            </a>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      visible={isShowConnectModal}
      onClose={handleHideModalConnectWallet}
      showCloseIcon={isShowMetaMask && isEthereum}
    >
      {!isShowMetaMask ? renderConnectWallet() : renderNoMetamask()}
    </Modal>
  );
};

export default ModalConnectWallet;
