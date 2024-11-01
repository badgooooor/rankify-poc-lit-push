/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIT_SIGNER_PRIVATE_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
