/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_GOOGLE_SEARCH_CONSOLE_META_TAG: string;
  readonly VITE_FACEBOOK_APP_ID: string;
  readonly VITE_TWITTER_CREATOR: string;
  readonly VITE_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}