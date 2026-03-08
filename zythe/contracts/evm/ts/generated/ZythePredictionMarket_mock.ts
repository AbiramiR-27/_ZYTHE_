import type { Address } from 'viem'
import { addContractMock, type ContractMock, type EvmMock } from '@chainlink/cre-sdk/test'

import { ZythePredictionMarketABI, type MarketData } from './ZythePredictionMarket'

export type ZythePredictionMarketMock = {
  marketCounter?: () => bigint
  getMarket?: (marketId: bigint) => MarketData
} & Pick<ContractMock<typeof ZythePredictionMarketABI>, 'writeReport'>

export function newZythePredictionMarketMock(address: Address, evmMock: EvmMock): ZythePredictionMarketMock {
  return addContractMock(evmMock, { address, abi: ZythePredictionMarketABI }) as ZythePredictionMarketMock
}
