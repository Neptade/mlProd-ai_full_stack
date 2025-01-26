import { useState } from "react"
import { FlowerData, FlowerDataForm } from "./components/FlowerDataForm"
import { PredictionResult } from "./components/PredictionResult"
import { PredictionHistory } from "./components/PredictionHistory"
import { usePredictionHistory } from "./hooks/usePredictionHistory"

export default function App() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const { history, addPrediction } = usePredictionHistory()

  const handleSubmit = async (data: FlowerData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({input: [[data.sepalLength, data.sepalWidth, data.petalLength, data.petalWidth]]}),
      })

      if (!response.ok) {
        throw new Error("Prediction request failed")
      }

      const result = await response.json()
      setPrediction(result.target_names[0])

      addPrediction({
        id: Date.now().toString(),
        data,
        result: result.target_names[0],
      })
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while making the prediction. Please try again.")
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Flower Prediction App</h1>
      <FlowerDataForm onSubmit={handleSubmit} />
      <PredictionResult prediction={prediction} />
      <PredictionHistory history={history} />
    </main>
  )
}
