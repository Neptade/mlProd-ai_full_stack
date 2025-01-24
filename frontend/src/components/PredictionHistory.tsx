import { MedicalData } from './MedicalDataForm'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

interface Prediction {
  id: string
  data: MedicalData
  result: number
}

interface PredictionHistoryProps {
  history: Prediction[]
}

export function PredictionHistory({ history }: PredictionHistoryProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Prediction History</h2>
      {history.map((prediction) => (
        <Card key={prediction.id} className="mb-4">
          <CardHeader>
            <CardTitle>Prediction ID: {prediction.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Result: {prediction.result.toFixed(2)}</p>
            <details>
              <summary className="cursor-pointer text-sm text-gray-500">View Input Data</summary>
              <pre className="mt-2 text-xs">{JSON.stringify(prediction.data, null, 2)}</pre>
            </details>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
