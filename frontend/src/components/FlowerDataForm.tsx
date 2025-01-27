import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { FlowerData } from '../utils/types'

interface FlowerDataFormProps {
  onSubmit: (data: FlowerData) => void
}

export function FlowerDataForm({ onSubmit }: FlowerDataFormProps) {
  const [formData, setFormData] = useState<FlowerData>({
    sepalLength: 0,
    sepalWidth: 0,
    petalLength: 0,
    petalWidth: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sepalLength">Sepal Length (cm)</Label>
          <Input
            type="number"
            id="sepalLength"
            name="sepalLength"
            value={formData.sepalLength}
            onChange={(e) => handleChange(e)}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="sepalWidth">Sepal Width (cm)</Label>
          <Input
            type="number"
            id="sepalWidth"
            name="sepalWidth"
            value={formData.sepalWidth}
            onChange={(e) => handleChange(e)}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="petalLength">Petal Length (cm)</Label>
          <Input
            type="number"
            id="petalLength"
            name="petalLength"
            value={formData.petalLength}
            onChange={(e) => handleChange(e)}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="petalWidth">Petal Width (cm)</Label>
          <Input
            type="number"
            id="petalWidth"
            name="petalWidth"
            value={formData.petalWidth}
            onChange={(e) => handleChange(e)}
            step="0.1"
            required
          />
        </div>
      </div>
      <Button type="submit" id="submit-flower" className="w-full">
        Submit
      </Button>
    </form>
  )
}
