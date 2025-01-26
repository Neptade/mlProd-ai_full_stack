import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"

export interface MedicalData {
  age: number
  sex: string
  bmi: number
  bp: number
  s1: number
  s2: number
  s3: number
  s4: number
  s5: number
  s6: number
}

interface MedicalDataFormProps {
  onSubmit: (data: MedicalData) => void
}

export function MedicalDataForm({ onSubmit }: MedicalDataFormProps) {
  const [formData, setFormData] = useState<MedicalData>({
    age: 0,
    sex: "",
    bmi: 0,
    bp: 0,
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
    s5: 0,
    s6: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
    if (typeof e === "string") {
      setFormData((prev) => ({ ...prev, [name!]: e }))
    } else {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: name === "sex" ? value : Number(value) }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Age (years)</Label>
          <Input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={(e) => handleChange(e, "age")}
            required
          />
        </div>
        <div>
          <Label htmlFor="sex">Gender</Label>
          <Select name="sex" value={formData.sex} onValueChange={(value) => handleChange(value, "sex")}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bmi">BMI</Label>
          <Input
            type="number"
            id="bmi"
            name="bmi"
            value={formData.bmi}
            onChange={(e) => handleChange(e, "bmi")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="bp">Blood Pressure</Label>
          <Input
            type="number"
            id="bp"
            name="bp"
            value={formData.bp}
            onChange={(e) => handleChange(e, "bp")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="s1">Total Cholesterol</Label>
          <Input
            type="number"
            id="s1"
            name="s1"
            value={formData.s1}
            onChange={(e) => handleChange(e, "s1")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="s2">LDL</Label>
          <Input
            type="number"
            id="s2"
            name="s2"
            value={formData.s2}
            onChange={(e) => handleChange(e, "s2")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="s3">HDL</Label>
          <Input
            type="number"
            id="s3"
            name="s3"
            value={formData.s3}
            onChange={(e) => handleChange(e, "s3")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="s4">Total Cholesterol / HDL</Label>
          <Input
            type="number"
            id="s4"
            name="s4"
            value={formData.s4}
            onChange={(e) => handleChange(e, "s4")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="s5">Log of Triglycerides</Label>
          <Input
            type="number"
            id="s5"
            name="s5"
            value={formData.s5}
            onChange={(e) => handleChange(e, "s5")}
            step="0.1"
            required
          />
        </div>
        <div>
          <Label htmlFor="s6">Blood Sugar</Label>
          <Input
            type="number"
            id="s6"
            name="s6"
            value={formData.s6}
            onChange={(e) => handleChange(e, "s6")}
            step="0.1"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}
