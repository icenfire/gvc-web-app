// @ts-nocheck
// Remove the nocheck to see typescript errors

// Sort the notices chronologically

interface Item {
  createdAt: Date
}

let sorted = [
  { createdAt: new Date("2020/01/01") },
  { createdAt: new Date("2019/01/01") },
].sort((t1: Item, t2: Item) => {
  return t1.createdAt > t2.createdAt ? 1 : -1
})

// Arrow function type definition
let sum = (a: number, b: number): number => {
  return a + b
}

// Partial interface
interface Full {
  name: string
  age: number
}

let full: Full = { name: "Adam", age: 20 }

let partWrong: Full = { name: "Bob" }
let partRight: Partial<Full> = { name: "Bob" }
let partCheck: Partial<Full> = { name: "Bob", gender: "male" }

// key in & keyof
interface Rubric {
  a: number
  b: number
}

type WithRubricKeys = {
  [key in keyof Rubric]: any
}

let example: WithRubricKeys = {
  a: true,
  b: "hello",
  c: 12,
}
