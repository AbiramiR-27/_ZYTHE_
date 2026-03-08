import {
	bytesToHex,
	type CronPayload,
	cre,
	getNetwork,
	type Runtime,
	TxStatus,
} from '@chainlink/cre-sdk'
import { type Address } from 'viem'
import { z } from 'zod'
import { ZythePredictionMarket } from '../contracts/evm/ts/generated/ZythePredictionMarket'

export const configSchema = z.object({
	schedule: z.string(),
	contractAddress: z.string(),
	chainSelectorName: z.string(),
	gasLimit: z.string(),
})

type Config = z.infer<typeof configSchema>

const getEvmClient = (config: Config) => {
	const network = getNetwork({
		chainFamily: 'evm',
		chainSelectorName: config.chainSelectorName,
		isTestnet: true,
	})

	if (!network) {
		throw new Error(`Network not found for chain selector name: ${config.chainSelectorName}`)
	}

	return new cre.capabilities.EVMClient(network.chainSelector.selector)
}

export const onCronTrigger = (runtime: Runtime<Config>, payload: CronPayload): string => {
	if (!payload.scheduledExecutionTime) {
		throw new Error('Scheduled execution time is required')
	}

	runtime.log('Checking markets for resolution...')

	const evmClient = getEvmClient(runtime.config)
	const contract = new ZythePredictionMarket(evmClient, runtime.config.contractAddress as Address)

	const count = contract.marketCounter(runtime)
	runtime.log(`Found ${count.toString()} total markets`)

	const now = BigInt(Math.floor(Date.now() / 1000))
	const resolved: string[] = []
	const skipped: string[] = []

	for (let i = 0n; i < count; i++) {
		const market = contract.getMarket(runtime, i)

		if (market.resolved) {
			runtime.log(`Market ${i}: already resolved, skipping`)
			skipped.push(i.toString())
			continue
		}

		if (market.resolutionTime > now) {
			runtime.log(
				`Market ${i}: "${market.title}" deadline not yet reached (${new Date(Number(market.resolutionTime) * 1000).toISOString()}), skipping`,
			)
			skipped.push(i.toString())
			continue
		}

		runtime.log(
			`Market ${i}: resolving "${market.title}" (strike: ${market.strikePrice.toString()}, deadline: ${new Date(Number(market.resolutionTime) * 1000).toISOString()})`,
		)

		const resp = contract.writeResolveMarket(runtime, i, { gasLimit: runtime.config.gasLimit })

		if (resp.txStatus !== TxStatus.SUCCESS) {
			throw new Error(`Failed to resolve market ${i}: ${resp.errorMessage || resp.txStatus}`)
		}

		const txHash = bytesToHex(resp.txHash || new Uint8Array(32))
		runtime.log(`Market ${i}: resolved successfully, tx: ${txHash}`)
		resolved.push(i.toString())
	}

	const summary = { resolved, skipped, total: Number(count) }
	runtime.log(`Resolution complete: ${JSON.stringify(summary)}`)
	return JSON.stringify(summary)
}

export function initWorkflow(config: Config) {
	const cronTrigger = new cre.capabilities.CronCapability()

	return [
		cre.handler(
			cronTrigger.trigger({ schedule: config.schedule }),
			onCronTrigger,
		),
	]
}

