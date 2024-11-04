import type { SessionSigs } from "@lit-protocol/types";
import { litNodeClient } from "./instances";
import { getSessionSigsViaAuthSig } from "./lit-authsig";


// Inline-code for Lit.
const litActionCode = `(
  async () => {
    if (magicNumber >= 42) {
      LitActions.setResponse({ response:"The number is greater than or equal to 42!" });
    } else {
      LitActions.setResponse({ response: "The number is less than 42!" });
    }
  }
)();`;

export const execute = async (input: number, sessionSigs: SessionSigs | undefined) => {
  if (!sessionSigs) return;

  const response = await litNodeClient.executeJs({
    sessionSigs,
    code: litActionCode,
    jsParams: {
      magicNumber: input,
    }
  });

  return response;
}