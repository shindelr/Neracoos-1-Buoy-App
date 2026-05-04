/**
 * Types related to unit managent
 */

export enum UnitSystem {
  metric = "Metric",
  english = "US / Imperial",
}

export interface UnitStoreState {
  system: UnitSystem
}

export const initialState = { system: UnitSystem.english } as UnitStoreState
