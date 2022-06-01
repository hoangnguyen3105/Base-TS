import { NETWORK_URLS } from 'connectors';
import { METAMASK, SupportedChainId, SUPPORTED_CHAIN_IDS } from 'connectors/constants';
import { APP_NETWORKS_SUPPORT } from 'connectors/constants';

declare let window: any;

export const setupNetwork = async (walletName: string, chainId?: number) => {
  const provider = walletName === METAMASK ? window.ethereum : null;
  if (provider) {
    try {
      const networkInfo = APP_NETWORKS_SUPPORT[Number(chainId)];
      if (walletName === METAMASK && networkInfo) {
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkInfo.details?.chainId }],
          });
        } catch (error: any) {
          //Reject metamask
          if (error.code === 4001) {
            return;
          }

          // This error code indicates that the chain has not been added to MetaMask.
          if (error.code === 4902) {
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    ...(networkInfo.details || {}),
                  },
                ],
              });
            } catch (addError) {
              return false;
            }
          } else {
            return false;
          }
        }
      } else return false;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};
