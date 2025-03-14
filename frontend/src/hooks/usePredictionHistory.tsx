import { useState, useEffect } from "react"
import { Prediction } from '../utils/types'

export function usePredictionHistory() {
  const [history, setHistory] = useState<Prediction[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem("predictionHistory")
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  const addPrediction = (prediction: Prediction) => {
    const updatedHistory = [prediction, ...history].slice(0, 10) // Keep only the last 10 predictions
    setHistory(updatedHistory)
    localStorage.setItem("predictionHistory", JSON.stringify(updatedHistory))
  }

  return { history, addPrediction }
}
