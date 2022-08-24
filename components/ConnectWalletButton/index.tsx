import React from 'react';
import { useTranslation } from 'react-i18next';

import AppButton from '../AppButton';

import { handleSetConnectModal } from 'redux/connection/slice';
import { useAppDispatch } from 'hooks/useStore';

const ConnectWalletButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleShowConnectModal = () => dispatch(handleSetConnectModal(true));

  return <AppButton text={t('common.txt_connect_wallet')} onClick={handleShowConnectModal} />;
};

export default ConnectWalletButton;
