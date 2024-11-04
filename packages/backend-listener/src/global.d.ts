declare module "bun" {
  interface Env {
    SIGNER_PRIVATE_KEY: string;
    PUSH_CHANNEL_ADDRESS: string;
  }
}