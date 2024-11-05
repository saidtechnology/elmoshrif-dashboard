import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { LoginForm } from './LoginForm';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Auth0Provider
      domain="dev-m2puvljphbfugmii.us.auth0.com"
      clientId="404356973257-5obh2jls3ccdr96ee224h33mvqtc1dj5.apps.googleusercontent.com"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://api.quran-teaching.com"
      }}
    >
      <LoginForm />
      {children}
    </Auth0Provider>
  );
}
