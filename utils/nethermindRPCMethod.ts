import {
  RpcProvider,
  BlockIdentifier,
  AccountInvocationItem,
  SimulateTransactionResponse,
  SimulatedTransaction,
  CallData,
} from "starknet";
import dotenv from "dotenv";
dotenv.config();

export interface SimulateTransactionArgs {
  blockId: BlockIdentifier;
  transaction: AccountInvocationItem;
  skipExecute?: boolean;
  skipFeeCharge?: boolean;
  skipValidate?: boolean;
}

const rpcProvider = new RpcProvider({
  nodeUrl: process.env.STARKNET_RPC_URL,
  headers: {
    "x-apikey": process.env.STARKNET_RPC_KEY,
  },
});


export const simulateTransaction = async ({
  blockId,
  transaction,
  skipExecute,
  skipFeeCharge,
  skipValidate,
}: SimulateTransactionArgs): Promise<{
  tx?: SimulatedTransaction;
  isSuccess: boolean;
  error?: Error;
}> => {
  try {
    const response = await rpcProvider.simulateTransaction([transaction], {
      blockIdentifier: blockId,
      skipExecute,
      skipFeeCharge,
      skipValidate,
    });
    return {
      tx: response[0],
      isSuccess: true,
    };
  } catch (e) {
    const error = e as Error;
    return { error, isSuccess: false };
  }
};


export const getTransactionTrace = async (transactionHash: string) => {
  const response = await rpcProvider.getTransactionTrace(transactionHash);
  return response;
};
