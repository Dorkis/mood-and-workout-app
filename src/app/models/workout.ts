import { User } from "./user"

export interface Workout {
  id: number,
  userId: number,
  category: string,
  duration: number,
  distance: number | null,
  createdAt: Date | string
}
