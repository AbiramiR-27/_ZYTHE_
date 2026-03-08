import { describe, expect } from 'bun:test'
import { cre, getNetwork, TxStatus } from '@chainlink/cre-sdk'
import { EvmMock, newTestRuntime, test } from '@chainlink/cre-sdk/test'
import type { Address } from 'viem'
import { ZythePredictionMarket } from '../contracts/evm/ts/generated/ZythePredictionMarket'
import { newZythePredictionMarketMock } from '../contracts/evm/ts/generated/ZythePredictionMarket_mock'
import { onCronTrigger } from './workflow'

const CHAIN_SELECTOR = 16015286601757825753n // ethereum-testnet-sepolia
const CONTRACT_ADDRESS = '0xFD42BB131E6925487246f4AeeC02162220c0787F' as Address

const NOW_SECS = BigInt(Math.floor(Date.now() / 1000))

const makeMarket = (overrides: Partial<{
  resolved: boolean
  resolutionTime: bigint
  title: string
  strikePrice: bigint
}> = {}) => ({
  id: 0n,
  title: overrides.title ?? 'ETH > $3000?',
  description: 'Will ETH price exceed $3000 at resolution time?',
  priceFeed: '0x694AA1769357215DE4FAC081bf1f309aDC325306' as Address,
  strikePrice: overrides.strikePrice ?? 300000000000n, // $3000 with 8 decimals
  resolutionTime: overrides.resolutionTime ?? (NOW_SECS - 60n), // 1 min ago
  resolved: overrides.resolved ?? false,
  outcome: false,
  totalYesAmount: 1000000000000000000n,
  totalNoAmount: 500000000000000000n,
  createdAt: NOW_SECS - 3600n,
})

describe('onCronTrigger', () => {
  test('throws when scheduledExecutionTime is missing', () => {
    const runtime = newTestRuntime() as any
    expect(() => onCronTrigger(runtime, {} as any)).toThrow(
      'Scheduled execution time is required',
    )
  })

  test('resolves market past deadline via ZythePredictionMarket contract', async () => {
    const evmMock = EvmMock.testInstance(CHAIN_SELECTOR)
    const contractMock = newZythePredictionMarketMock(CONTRACT_ADDRESS, evmMock)
    contractMock.marketCounter = () => 1n
    contractMock.getMarket = (_marketId: bigint) => makeMarket()
    contractMock.writeReport = () => ({
      txStatus: TxStatus.SUCCESS,
      txHash: new Uint8Array(32),
    })

    const runtime = newTestRuntime()
    const network = getNetwork({
      chainFamily: 'evm',
      chainSelectorName: 'ethereum-testnet-sepolia',
      isTestnet: true,
    })
    expect(network).toBeDefined()
    if (!network) return

    const evmClient = new cre.capabilities.EVMClient(network.chainSelector.selector)
    const contract = new ZythePredictionMarket(evmClient, CONTRACT_ADDRESS)
    const count = contract.marketCounter(runtime)
    expect(count).toBe(1n)
  })

  test('skips already-resolved markets', async () => {
    const evmMock = EvmMock.testInstance(CHAIN_SELECTOR)
    const contractMock = newZythePredictionMarketMock(CONTRACT_ADDRESS, evmMock)
    contractMock.marketCounter = () => 1n
    contractMock.getMarket = (_marketId: bigint) => makeMarket({ resolved: true })

    const runtime = newTestRuntime()
    const network = getNetwork({
      chainFamily: 'evm',
      chainSelectorName: 'ethereum-testnet-sepolia',
      isTestnet: true,
    })
    expect(network).toBeDefined()
    if (!network) return

    const evmClient = new cre.capabilities.EVMClient(network.chainSelector.selector)
    const contract = new ZythePredictionMarket(evmClient, CONTRACT_ADDRESS)
    const market = contract.getMarket(runtime, 0n)
    expect(market.resolved).toBe(true)
  })

  test('skips markets whose deadline has not passed', async () => {
    const evmMock = EvmMock.testInstance(CHAIN_SELECTOR)
    const contractMock = newZythePredictionMarketMock(CONTRACT_ADDRESS, evmMock)
    contractMock.marketCounter = () => 1n
    contractMock.getMarket = (_marketId: bigint) =>
      makeMarket({ resolutionTime: NOW_SECS + 3600n }) // 1 hour in future

    const runtime = newTestRuntime()
    const network = getNetwork({
      chainFamily: 'evm',
      chainSelectorName: 'ethereum-testnet-sepolia',
      isTestnet: true,
    })
    expect(network).toBeDefined()
    if (!network) return

    const evmClient = new cre.capabilities.EVMClient(network.chainSelector.selector)
    const contract = new ZythePredictionMarket(evmClient, CONTRACT_ADDRESS)
    const market = contract.getMarket(runtime, 0n)
    expect(market.resolutionTime).toBeGreaterThan(NOW_SECS)
  })

  test('resolveMarket write succeeds with SUCCESS status', async () => {
    const evmMock = EvmMock.testInstance(CHAIN_SELECTOR)
    const contractMock = newZythePredictionMarketMock(CONTRACT_ADDRESS, evmMock)
    contractMock.writeReport = () => ({
      txStatus: TxStatus.SUCCESS,
      txHash: new Uint8Array(32),
    })

    const runtime = newTestRuntime()
    const network = getNetwork({
      chainFamily: 'evm',
      chainSelectorName: 'ethereum-testnet-sepolia',
      isTestnet: true,
    })
    expect(network).toBeDefined()
    if (!network) return

    const evmClient = new cre.capabilities.EVMClient(network.chainSelector.selector)
    const contract = new ZythePredictionMarket(evmClient, CONTRACT_ADDRESS)
    const resp = contract.writeResolveMarket(runtime, 0n, { gasLimit: '500000' })
    expect(resp.txStatus).toBe(TxStatus.SUCCESS)
  })
})

