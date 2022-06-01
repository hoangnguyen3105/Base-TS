import { appWithTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Web3ReactProvider } from '@web3-react/core';
import { SWRConfig } from 'swr';

import AppConnectWalletWrapper from '@components//AppConnectWalletWrapper';

import { wrapper } from 'redux/configStore';
import { LIBRARY_CONSTANTS } from 'constants/library';

import 'antd/dist/antd.css';
import '../styles/_app.scss';

const onBeforeLift = (store: any) => () => {};

const MyApp = ({ Component, pageProps }: any) => {
  const store = useStore();
  const isClient = typeof window !== 'undefined';

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <SWRConfig>
      <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
        {isClient ? (
          <PersistGate persistor={(store as any).__persistor} loading={null} onBeforeLift={onBeforeLift(store)}>
            <AppConnectWalletWrapper>{getLayout(<Component {...pageProps} />)}</AppConnectWalletWrapper>
          </PersistGate>
        ) : (
          <AppConnectWalletWrapper>
            <Component {...pageProps} />
          </AppConnectWalletWrapper>
        )}
      </Web3ReactProvider>
    </SWRConfig>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));
