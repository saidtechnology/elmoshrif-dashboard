import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Auth0Provider
      domain="dev-m2puvljphbfugmii.us.auth0.com"
      clientId="ic5HdgR1mCtUzcmBvAdSg3q4s34uLTL2"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://quran-teaching-api/',
        scope: 'openid profile email',
      }}
    >
      {children}
    </Auth0Provider>
  );
}
