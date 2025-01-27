export interface FlowerData {
  sepalLength: number
  sepalWidth: number
  petalLength: number
  petalWidth: number
}

export interface Prediction {
  id: string
  data: FlowerData
  result: string
}
