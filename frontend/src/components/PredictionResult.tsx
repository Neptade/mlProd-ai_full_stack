interface PredictionResultProps {
  prediction: number | null
}

export function PredictionResult({ prediction }: PredictionResultProps) {
  if (prediction === null) return null

  return (
    <div className="mt-4 p-4 bg-green-100 rounded-md">
      <h2 className="text-lg font-semibold">Prediction Result</h2>
      <p>The predicted value is: {prediction.toFixed(2)}</p>
    </div>
  )
}
