import { useMemo } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { getErrorConnectMessage, injected, walletConnect } from 'connectors';

export const useConnectWallet = () => {
  const { activate, deactivate } = useWeb3React();
  const connect = useMemo(() => {
    return {
      connectInjected(metamaskNotFound?: any, callbackSuccess?: any, callbackError?: any): void {
        injected.isAuthorized().then(async (isAuthorized: boolean) => {
          callbackSuccess && callbackSuccess();
          console.log(isAuthorized, 'isAuthorized');
          await activate(injected, undefined, true).catch((error) => {
            callbackError && callbackError();
            getErrorConnectMessage(error, deactivate, metamaskNotFound);
          });
        });
      },

      connectWalletConnect(callback?: { failed: (err: any) => void }): void {
        walletConnect.walletConnectProvider = undefined;

        walletConnect &&
          activate(walletConnect, undefined, true).catch(async (error) => {
            getErrorConnectMessage(error, deactivate);
            if (error instanceof UnsupportedChainIdError) {
              await activate(walletConnect, undefined, true).catch((error) => console.log(error, 'error')); // a little janky...can't use setError because the connector isn't set
              callback && callback.failed(error);
            }
          });
      },
    };
  }, []);

  return connect;
};
