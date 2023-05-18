import {
  IDENTITY_AUTH_URL,
  IDENTITY_CLIENT_ID,
  IDENTITY_CLIENT_SECRET,
  IDENTITY_GRANT_TYPE,
  IDENTITY_RESPONSE_TYPE,
  IDENTITY_SCOPE,
  PUBLIC_URL,
} from 'config'
import { pathNameLocalStorage } from 'constants/index'
import { Log, UserManager, WebStorageStateStore } from 'oidc-client'
//   import SecureLS from 'secure-ls';
//   import fetchApi from 'utils/fetch-api';
//   import { store } from 'store';
//   import { setSitemap } from 'store/slice/common';

export const IDENTITY_CONFIG = {
  authority: IDENTITY_AUTH_URL, // (string): The URL of the OIDC provider.
  client_id: IDENTITY_CLIENT_ID, // (string): Your client application's identifier as registered with the OIDC provider.
  redirect_uri: `${window.location.origin}/login`, // The URI of your client application to receive a response from the OIDC provider.
  automaticSilentRenew: false, // (boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  loadUserInfo: true, // (boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  // silent_redirect_uri: `${window.location.origin}/silent`, //(string): The URL for the page containing the code handling the silent renew.
  // post_logout_redirect_uri: `${window.location.origin}/log-off`, // (string): The OIDC post-logout redirect URI.
  response_type: IDENTITY_RESPONSE_TYPE, // (string, default: 'id_token'): The type of response desired from the OIDC provider.
  scope: IDENTITY_SCOPE, // (string, default: 'openid'): The scope being requested from the OIDC provider.
  client_secret: IDENTITY_CLIENT_SECRET,
  grant_type: IDENTITY_GRANT_TYPE,
}
console.log(IDENTITY_CONFIG)

export default class AuthService {
  UserManager
  expireCount = 0
  constructor() {
    this.UserManager = new UserManager({
      ...IDENTITY_CONFIG,
      userStore: new WebStorageStateStore({
        store: window.localStorage,
      }),
    })
    // Logger
    Log.logger = console
    Log.level = Log.DEBUG
    this.UserManager.events.addUserLoaded((user) => {
      console.log(user, 'userrrr')
      if (window.location.href.includes('signin-oidc')) {
        this.navigateToScreen()
      }
    })
    this.UserManager.events.addSilentRenewError((e) => {
      console.log('silent renew error', e.message)
    })

    this.UserManager.events.addAccessTokenExpired(() => {
      if (this.expireCount) return
      console.log('token expired')
      this.expireCount++
      // alert('Token expired');
      this.signoutRedirect()
    })
  }

  signinRedirectCallback = (): void => {
    const oldPathName = localStorage.getItem(pathNameLocalStorage) || '/'
    this.UserManager.signinRedirectCallback().then(() => {
      window.location.href = `${oldPathName}`
    })
  }

  getUser = async (): Promise<any> => {
    const user = await this.UserManager.getUser()
    if (!user) {
      const a = await this.UserManager.signinRedirectCallback()
      return a
    }
    return user
  }

  parseJwt = (token: string): JSON => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }

  signinRedirect = (): void => {
    localStorage.setItem('redirectUri', window.location.pathname)
    this.UserManager.signinRedirect()
  }

  navigateToScreen = (): void => {
    window.location.replace('/')
  }

  isAuthenticated = (): boolean => {
    const oidcAuth = localStorage.getItem(
      `oidc.user:${IDENTITY_AUTH_URL}:${IDENTITY_CLIENT_ID}`
    )

    if (!oidcAuth) return false

    const oidcStorage = JSON.parse(oidcAuth)

    //   this.getTenantSetting();
    //   this.getSitemaps();

    return !!oidcStorage?.access_token
  }

  signinSilent = (): void => {
    this.UserManager.signinSilent()
      .then((user) => {
        console.log('signed in', user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  signinSilentCallback = (): void => {
    this.UserManager.signinSilentCallback()
  }

  createSigninRequest = (): any => {
    return this.UserManager.createSigninRequest()
  }

  logout = (): void => {
    this.UserManager.signoutRedirect({
      id_token_hint: localStorage.getItem('id_token'),
    })
    this.UserManager.clearStaleState()
    localStorage.clear()
  }

  signoutRedirectCallback = (): void => {
    this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear()
      window.location.replace(PUBLIC_URL || '')
    })
    this.UserManager.clearStaleState()
  }

  signoutRedirect = (): void => {
    this.UserManager.signoutRedirect().then(() => {
      this.signinRedirect()
    })
  }

  // getTenantSetting = async () => {
  //   try {
  //     const url = `${TENENT.service}/${TENENT.model.settings}`;

  //     const res = await fetchApi({ url });

  //     if (res?.data) {
  //       const ls = new SecureLS({ isCompression: false });
  //       ls.set(TENENT_SETTINGS, JSON.stringify(res.data));
  //       const localeStorage = localStorage.getItem(LOCALE);
  //       localStorage.setItem(
  //         LOCALE,
  //         localeStorage ? localeStorage : res.data.languageCode,
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getSitemaps = async () => {
  //   try {
  //     const url = MENU.service;

  //     const res = await fetchApi({ url });

  //     if (res?.data) {
  //       store.dispatch(setSitemap(res.data));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
