export const ZythePredictionMarket = [
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
