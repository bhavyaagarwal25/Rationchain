interface Props {
  onTamper: () => void
  onVerify: () => void
}

export default function TamperControls({ onTamper, onVerify }: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onTamper}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Tamper Transaction #5
      </button>

      <button
        onClick={onVerify}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Verify Ledger
      </button>
    </div>
  )
}
