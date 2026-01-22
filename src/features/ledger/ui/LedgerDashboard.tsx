import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'


import LedgerTable from './LedgerTable'
import LedgerStatus from './LedgerStatus'
import TamperControls from './TamperControls'

import { verifyLedgerChain } from '../ledger.sync'
import { tamperTransaction } from '../ledger.slice'

export default function LedgerDashboard() {
  const dispatch = useDispatch()
  const transactions = useSelector(
  (state: RootState) => state.ledger.transactions
)

  const verification = verifyLedgerChain(transactions)

  return (
    <div className="p-4 space-y-4">
      <LedgerStatus
        valid={verification.valid}
        breakIndex={verification.breakIndex}
      />

      <LedgerTable
        transactions={transactions}
        brokenAt={verification.breakIndex}
      />

      <TamperControls
        onTamper={() => dispatch(tamperTransaction())}
        onVerify={() => {}}
      />

    </div>
  )
}
