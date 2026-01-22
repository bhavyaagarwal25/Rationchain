interface Props {
  valid: boolean
  breakIndex: number | null
}

export default function LedgerStatus({ valid, breakIndex }: Props) {
  if (valid) {
    return (
      <div className="p-3 rounded bg-green-100 text-green-700">
        Ledger is valid and untampered
      </div>
    )
  }

  return (
    <div className="p-3 rounded bg-red-100 text-red-700">
      Ledger chain broken at transaction #{breakIndex! + 1}
    </div>
  )
}
