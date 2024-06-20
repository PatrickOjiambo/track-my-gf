import { RequestNetwork, Types } from "@requestnetwork/request-client.js";
import { Wallet, providers } from "ethers";
import {
  hasSufficientFunds,
  approveErc20,
  hasErc20Approval,
} from "@requestnetwork/payment-processor";

interface Request {
  request_id: string;
  sender_address: string;
  receiver_address: string;
}
export async function MakePayment(requestFromDb: Request) {
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: "https://sepolia.gateway.request.network/",
    },
  });
  const request = await requestClient.fromRequestId(
    "019830e9ec0439e53ec41fc627fd1d0293ec4bc61c2a647673ec5aaaa0e6338855"
  );
  const requestData = request.getData();
  //Construct private key

  const provider = new providers.JsonRpcProvider(
    process.env.JSON_RPC_PROVIDER_URL
  );
  const payerWallet = new Wallet(
    process.env.PAYER_PRIVATE_KEY, // Must include 0x prefix
    provider
  );
  //Check that the payer has enough balance
  const _hasSufficientFunds = await hasSufficientFunds(
    requestData,
    payerAddress,
    {
      provider: provider,
    }
  );
  //Sufficient Approval
  const _hasErc20Approval = await hasErc20Approval(
    requestData,
    payerAddress,
    provider
  );
  if (!_hasErc20Approval) {
    const approvalTx = await approveErc20(requestData, signer);
    await approvalTx.wait(2);
  }
  //Finally we pay the request
  const { payRequest } = require("@requestnetwork/payment-processor");

  const paymentTx = await payRequest(requestData, signer);
  await paymentTx.wait(2);
  //Detect that the payment was succesful by polling
  const request = await requestClient.fromRequestId(requestData.requestId);
  let requestData = request.getData();

  while (requestData.balance?.balance < requestData.expectedAmount) {
    requestData = await request.refresh();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
