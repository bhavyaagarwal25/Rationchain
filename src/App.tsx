import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { calculateHash } from './features/ledger/hashLedger'
import { saveTx } from './features/ledger/ledger.db'
import { addTransaction } from './features/ledger/ledger.slice'
import LedgerDashboard from './features/ledger/ui/LedgerDashboard'
import { useEffect, useState } from 'react'

export default function App() {
  const dispatch = useDispatch()
  const lastHash = useSelector((state: { ledger: { lastHash: string } }) => state.ledger.lastHash)

  const [showAdmin, setShowAdmin] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ration, setRation] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:3333/api/ration-status')
      .then(res => res.json())
      .then(data => setRation(data))
  }, [])

  const collectRation = async () => {
    const transactionTime = new Date().toISOString()

    const txBase = {
      beneficiaryId: ration.beneficiaryId,
      shopId: ration.shopId,
      quantity: ration.quantity,
      period: ration.period,
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

    await fetch('http://localhost:3333/api/collect', { method: 'POST' })

    alert('📢 Ration successfully collected!')
    setRation({ ...ration, available: false })
  }

  if (!ration) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Smart Ration Dashboard</h1>

      <p><b>Beneficiary ID:</b> {ration.beneficiaryId}</p>
      <p><b>Shop:</b> {ration.shopId}</p>
      <p><b>Status:</b> {ration.available ? 'Ration Available ✅' : 'Already Collected ❌'}</p>
      <p><b>Quantity:</b> {ration.quantity} kg</p>

      {ration.available && (
        <button onClick={collectRation}>Collect Ration</button>
      )}

      <hr />

      <button onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? 'Hide System Ledger' : 'Show System Ledger'}
      </button>

      {showAdmin && <LedgerDashboard />}
    </div>
  )
}
