import React, { createContext, useContext } from 'react';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

const WalletConnectContext = createContext();

export const WalletConnectProviderWrapper = ({ children }: any) => {
  const { open, isConnected, provider } = useWalletConnectModal();

  const onConnect = () => {
    if (!isConnected) {
      open();
    }
  };

  const onDisconnect = () => {
    if (isConnected && provider) {
      provider.disconnect();
    }
  };

  return (
    <WalletConnectContext.Provider value={{ isConnected, onConnect, onDisconnect }}>
      {children}
      <WalletConnectModal
        projectId="7172b675b365e98bfc4f23de085d752d"
        providerMetadata={{
          name: 'YOUR_PROJECT_NAME',
          description: 'YOUR_PROJECT_DESCRIPTION',
          url: 'https://your-project-website.com/',
          icons: ['https://your-project-logo.com/'],
          redirect: {
            native: 'YOUR_APP_SCHEME://',
            universal: 'YOUR_APP_UNIVERSAL_LINK.com',
          },
        }}
      />
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => useContext(WalletConnectContext);
