import { Age, Energy, Independence, Size } from './enums'

export type Pet = {
  id: string
  name: string
  about: string
  age: Age
  size: Size
  energy: Energy
  independence: Independence
  requirement: string
  isAdopted: boolean
  organization_id: string
}
