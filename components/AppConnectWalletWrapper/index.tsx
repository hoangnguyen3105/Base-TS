import { FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { walletConnect } from 'connectors';
import ModalWrongNetwork from '../Modal/ModalWrongNetwork';
import ModalConnectWallet from '../Modal/ModalConnectWallet';
import { METAMASK, SUPPORTED_CHAIN_IDS, WALLET_CONNECT } from 'connectors/constants';
import { handleSetConnectedWalletType, handleSetWrongNetwork } from 'redux/connection/slice';
import selectedAddress from 'redux/address/selector';
import selectAuthentication from 'redux/authentication/selector';
import selectedConnection from 'redux/connection/selector';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { useConnectWallet } from 'hooks/useConnectWallet';

const AppConnectWalletWrapper: FC<{
  children: any;
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const { chainId, account, active } = useWeb3React();

  const { authenticationToken } = useAppSelector(selectAuthentication.getAuthenticationToken);
  const { address } = useAppSelector(selectedAddress.getAddress);
  const connectedWalletType = useAppSelector(selectedConnection.getConnectedWalletType);

  useEffect(() => {
    if (authenticationToken && connectedWalletType && !active) {
      if (connectedWalletType === METAMASK) {
        setTimeout(() => {
          connectInjected();
          dispatch(handleSetConnectedWalletType(METAMASK));
        }, 700);
      }

      if (connectedWalletType === WALLET_CONNECT) {
        setTimeout(() => {
          connectWalletConnect();
          dispatch(handleSetConnectedWalletType(WALLET_CONNECT));
        }, 700);
      }
    }
    if (authenticationToken && !connectedWalletType) {
      // dispatch(logout());
    }
  }, [authenticationToken, connectedWalletType, active]);

  useEffect(() => {
    if (address !== account?.toLowerCase() && !!active && !!account && !!chainId) {
      // dispatch(loginStart({ address: account, chainId }));
    }
  }, [active, account, chainId, address]);

  useEffect((): any => {
    walletConnect.on('Web3ReactDeactivate', () => {
      // dispatch(logout());
    });

    return () => walletConnect.removeListener('Web3ReactDeactivate', () => console.log('Web3ReactDeactivate'));
  }, []);

  useEffect(() => {
    if (chainId && !SUPPORTED_CHAIN_IDS.includes(chainId)) {
      dispatch(handleSetWrongNetwork(true));
    } else {
      dispatch(handleSetWrongNetwork(false));
    }
  }, [chainId]);

  return (
    <>
      {children}
      <ModalWrongNetwork />
      <ModalConnectWallet />
    </>
  );
};

export default AppConnectWalletWrapper;
