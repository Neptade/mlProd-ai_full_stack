import { useState } from "react"
import { MedicalData, MedicalDataForm } from "./components/MedicalDataForm"
import { PredictionResult } from "./components/PredictionResult"
import { PredictionHistory } from "./components/PredictionHistory"
import { usePredictionHistory } from "./hooks/usePredictionHistory"

export default function App() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const { history, addPrediction } = usePredictionHistory()

  const handleSubmit = async (data: MedicalData) => {
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Prediction request failed")
      }

      const result = await response.json()
      setPrediction(result.prediction)

      addPrediction({
        id: Date.now().toString(),
        data,
        result: result.prediction,
      })
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while making the prediction. Please try again.")
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Medical Prediction App</h1>
      <MedicalDataForm onSubmit={handleSubmit} />
      <PredictionResult prediction={prediction} />
      <PredictionHistory history={history} />
    </main>
  )
}
