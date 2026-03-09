# Zythe CRE Workflow

This folder contains the Chainlink Runtime Environment (CRE) workflow for automated market resolution.

## Workflow Purpose
- Automates resolution of prediction markets using Chainlink price feeds.
- Runs on a schedule (cron) or EVM log trigger.
- Written in TypeScript, compiled to WASM for CRE.

## Files
- `workflow.ts`: Main workflow logic.
- `workflow.test.ts`: Unit tests for workflow.
- `config.production.json`, `config.staging.json`: Workflow configuration files.
- `workflow.yaml`: CRE workflow manifest.

## Usage
- Simulate locally: `cre workflow simulate my-workflow --target staging-settings`
- Deploy: `cre workflow deploy my-workflow --output ./my-workflow.wasm.br.b64`

## Integration
- Resolves markets on-chain using the ZythePredictionMarket contract.
- Reads market data from contract and price feeds.

## License
MIT.