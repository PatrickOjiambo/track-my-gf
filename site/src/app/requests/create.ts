import { EthereumPrivateKeySignatureProvider } from "@requestnetwork/epk-signature";
import { Types, Utils } from "@requestnetwork/request-client.js";
import { parseUnits } from "viem";

/**
 * function  to create a payment request by the sender
 * @param sender_address -Address of the party sending the payment request
 * @param receiver_address - Address of the party receiving the payment request
 */
export async function createRequest(
  sender_address: string,
  receiver_address: string,
  amount: string
) {
  const epkSignatureProvider = new EthereumPrivateKeySignatureProvider({
    method: Types.Signature.METHOD.ECDSA,
    privateKey: process.env.PAYEE_PRIVATE_KEY , // Must include 0x prefix
  });
  const { RequestNetwork } = require("@requestnetwork/request-client.js");
  //constructiong a RequestNetwork object
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: "https://sepolia.gateway.request.network/",
    },
    signatureProvider: epkSignatureProvider,
  });
  //Prepare the Request creation parameters:
  const payeeIdentity = sender_address;
  const payerIdentity = receiver_address;
  const paymentrecipient = payeeIdentity;
  const feeRecipient = payerIdentity;
  const requestCreateParameters = {
    requestInfo: {
      // The currency in which the request is denominated
      currency: {
        type: Types.RequestLogic.CURRENCY.ETH,
        value: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
        network: "sepolia",
      },

      // The expected amount as a string, in parsed units, respecting `decimals`
      // Consider using `parseUnits()` from ethers or viem
      expectedAmount: parseUnits(amount, 18).toString(),

      // The payee identity. Not necessarily the same as the payment recipient.
      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },

      // The payer identity. If omitted, any identity can pay the request.
      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payerIdentity,
      },

      // The request creation timestamp.
      timestamp: Utils.getCurrentTimestampInSecond(),
    },

    // The paymentNetwork is the method of payment and related details.
    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
      parameters: {
        paymentNetworkName: "sepolia",
        paymentAddress: payeeIdentity,
        feeAddress: feeRecipient,
        feeAmount: "0",
      },
    },

    // The contentData can contain anything.
    // Consider using rnf_invoice format from @requestnetwork/data-format
    contentData: {
      reason: "🍕",
      dueDate: "2023.06.16",
    },

    // The identity that signs the request, either payee or payer identity.
    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payeeIdentity,
    },
  };
  try {
    const request = await requestClient.createRequest(requestCreateParameters);
    const requestData = await request.waitForConfirmation();
    console.log(JSON.stringify(requestData));
    return requestData.request_id;
  } catch (error) {
    console.error("Error creating a request ", error);
    throw new Error("Could not create a request");
  }
}
