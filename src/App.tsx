import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { calculateHash } from './features/ledger/hashLedger'
import { saveTx } from './features/ledger/ledger.db'
import { addTransaction } from './features/ledger/ledger.slice'

export default function App() {
  const dispatch = useDispatch()
  const lastHash = useSelector((state: { ledger: { lastHash: string } }) => state.ledger.lastHash)


  const createTx = async () => {
    const transactionTime = new Date().toISOString()

    const txBase = {
      beneficiaryId: 'BPL123',
      shopId: 'SHOP01',
      quantity: 5,


      
      period: '2026-01',
      transactionTime,
      previousHash: lastHash,
      deviceId: 'WEB_DEVICE'
    }

    const currentHash = calculateHash(txBase)

    const tx = {
      id: uuid(),
      ...txBase,
      currentHash,
      isSynced: false
    }

    await saveTx(tx)
    dispatch(addTransaction(tx))
  }

  return (
    <div>
      <h1>Smart Ration Ledger</h1>
      <button onClick={createTx}>Collect Ration</button>
    </div>
  )
}
