import type { LedgerTransaction } from '../ledger.types'

interface Props {
  transactions: LedgerTransaction[]
  brokenAt: number | null
}

export default function LedgerTable({ transactions, brokenAt }: Props) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th>#</th>
          <th>Beneficiary</th>
          <th>Qty</th>
          <th>Prev Hash</th>
          <th>Curr Hash</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((tx, i) => (
          <tr key={tx.id} className="border-t">
            <td>{i + 1}</td>
            <td>{tx.beneficiaryId}</td>
            <td>{tx.quantity}</td>
            <td>{tx.previousHash.slice(0, 8)}…</td>
            <td>{tx.currentHash.slice(0, 8)}…</td>
            <td>
              {brokenAt !== null && i >= brokenAt ? (
                <span className="text-red-600">BROKEN</span>
              ) : (
                <span className="text-green-600">VALID</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
