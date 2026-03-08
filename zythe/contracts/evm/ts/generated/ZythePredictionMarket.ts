import {
  decodeFunctionResult,
  encodeFunctionData,
  zeroAddress,
} from 'viem'
import type { Address } from 'viem'
import {
  bytesToHex,
  encodeCallMsg,
  EVMClient,
  LAST_FINALIZED_BLOCK_NUMBER,
  prepareReportRequest,
  type Runtime,
} from '@chainlink/cre-sdk'

export const ZythePredictionMarketABI = [
	{
		inputs: [],
		name: 'marketCounter',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
		name: 'getMarket',
		outputs: [
			{
				components: [
					{ internalType: 'uint256', name: 'id', type: 'uint256' },
					{ internalType: 'string', name: 'title', type: 'string' },
					{ internalType: 'string', name: 'description', type: 'string' },
					{ internalType: 'address', name: 'priceFeed', type: 'address' },
					{ internalType: 'uint256', name: 'strikePrice', type: 'uint256' },
					{ internalType: 'uint256', name: 'resolutionTime', type: 'uint256' },
					{ internalType: 'bool', name: 'resolved', type: 'bool' },
					{ internalType: 'bool', name: 'outcome', type: 'bool' },
					{ internalType: 'uint256', name: 'totalYesAmount', type: 'uint256' },
					{ internalType: 'uint256', name: 'totalNoAmount', type: 'uint256' },
					{ internalType: 'uint256', name: 'createdAt', type: 'uint256' },
				],
				internalType: 'struct ZythePredictionMarket.Market',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_marketId', type: 'uint256' }],
		name: 'resolveMarket',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ indexed: false, internalType: 'bool', name: 'outcome', type: 'bool' },
			{ indexed: false, internalType: 'uint256', name: 'totalYesAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'totalNoAmount', type: 'uint256' },
		],
		name: 'MarketResolved',
		type: 'event',
	},
] as const

export type MarketData = {
  id: bigint
  title: string
  description: string
  priceFeed: Address
  strikePrice: bigint
  resolutionTime: bigint
  resolved: boolean
  outcome: boolean
  totalYesAmount: bigint
  totalNoAmount: bigint
  createdAt: bigint
}

export class ZythePredictionMarket {
  constructor(
    private readonly client: EVMClient,
    public readonly address: Address,
  ) {}

  marketCounter(runtime: Runtime<unknown>): bigint {
    const callData = encodeFunctionData({
      abi: ZythePredictionMarketABI,
      functionName: 'marketCounter' as const,
    })

    const result = this.client
      .callContract(runtime, {
        call: encodeCallMsg({ from: zeroAddress, to: this.address, data: callData }),
        blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
      })
      .result()

    return decodeFunctionResult({
      abi: ZythePredictionMarketABI,
      functionName: 'marketCounter' as const,
      data: bytesToHex(result.data),
    }) as bigint
  }

  getMarket(runtime: Runtime<unknown>, marketId: bigint): MarketData {
    const callData = encodeFunctionData({
      abi: ZythePredictionMarketABI,
      functionName: 'getMarket' as const,
      args: [marketId],
    })

    const result = this.client
      .callContract(runtime, {
        call: encodeCallMsg({ from: zeroAddress, to: this.address, data: callData }),
        blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
      })
      .result()

    return decodeFunctionResult({
      abi: ZythePredictionMarketABI,
      functionName: 'getMarket' as const,
      data: bytesToHex(result.data),
    }) as MarketData
  }

  writeResolveMarket(
    runtime: Runtime<unknown>,
    marketId: bigint,
    gasConfig?: { gasLimit?: string },
  ) {
    const callData = encodeFunctionData({
      abi: ZythePredictionMarketABI,
      functionName: 'resolveMarket' as const,
      args: [marketId],
    })

    const reportResponse = runtime
      .report(prepareReportRequest(callData))
      .result()

    return this.client
      .writeReport(runtime, {
        receiver: this.address,
        report: reportResponse,
        gasConfig,
      })
      .result()
  }

  writeReport(
    runtime: Runtime<unknown>,
    callData: `0x${string}`,
    gasConfig?: { gasLimit?: string },
  ) {
    const reportResponse = runtime
      .report(prepareReportRequest(callData))
      .result()

    return this.client
      .writeReport(runtime, {
        receiver: this.address,
        report: reportResponse,
        gasConfig,
      })
      .result()
  }
}
