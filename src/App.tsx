import { useEffect, useState } from 'react'
import LedgerDashboard from './features/ledger/ui/LedgerDashboard'

type RationData = {
  beneficiaryId: string
  shopId: string
  quantity: number
  available: boolean
}

export default function App() {
  // const dispatch = useDispatch()
  const [ration, setRation] = useState<RationData | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3333/api/ration/BPL123')
      .then(res => res.json())
      .then(data => setRation(data))
  }, [])

  const collectRation = async () => {
    await fetch('http://localhost:3333/api/collect', { method: 'POST' })
    alert('📢 Ration successfully collected!')
    setRation({ ...ration!, available: false })
  }

  if (!ration) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Smart Ration Dashboard</h1>

      <p><b>Beneficiary ID:</b> {ration.beneficiaryId}</p>
      <p><b>Shop:</b> {ration.shopId}</p>
      <p>
        <b>Status:</b>{' '}
        {ration.available ? 'Ration Available ✅' : 'Already Collected ❌'}
      </p>
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
