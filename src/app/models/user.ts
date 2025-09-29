export interface User {
  id: number,
  name: string,
  email: string,
  createdAt: Date | string,
  todayMood: number | null,
}
