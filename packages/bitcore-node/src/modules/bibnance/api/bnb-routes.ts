import { Router } from 'express';
import logger from '../../../logger';
import { BNB } from './csp';
export const BnbRoutes = Router();

BnbRoutes.get('/api/BNB/:network/address/:address/txs/count', async (req, res) => {
  let { address, network } = req.params;
  try {
    const nonce = await BNB.getAccountNonce(network, address);
    res.json({ nonce });
  } catch (err) {
    logger.error('Nonce Error::' + err);
    res.status(500).send(err);
  }
});

BnbRoutes.post('/api/BNB/:network/gas', async (req, res) => {
  const { from, to, value, data, gasPrice } = req.body;
  const { network } = req.params;
  try {
    const gasLimit = await BNB.estimateGas({ network, from, to, value, data, gasPrice });
    res.json(gasLimit);
  } catch (err) {
    res.status(500).send(err);
  }
});

BnbRoutes.get('/api/BNB/:network/token/:tokenAddress', async (req, res) => {
  const { network, tokenAddress } = req.params;
  try {
    const tokenInfo = await BNB.getERC20TokenInfo(network, tokenAddress);
    res.json(tokenInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});
