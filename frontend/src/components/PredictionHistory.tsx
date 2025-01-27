import { FlowerData } from './FlowerDataForm'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

interface Prediction {
  id: string
  data: FlowerData
  result: string
}

interface PredictionHistoryProps {
  history: Prediction[]
}

export function PredictionHistory({ history }: PredictionHistoryProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Prediction History</h2>
      <div>
        {history.map((prediction) => (
          <Card key={prediction.id} className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Result: {prediction.result}</CardTitle>
              <p className="text-xs text-gray-500">ID: {prediction.id}</p>
            </CardHeader>
            <CardContent>
              <details>
                <summary className="cursor-pointer text-sm text-gray-500">View Input Data</summary>
                <pre className="mt-2 text-xs">{JSON.stringify(prediction.data, null, 2)}</pre>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
