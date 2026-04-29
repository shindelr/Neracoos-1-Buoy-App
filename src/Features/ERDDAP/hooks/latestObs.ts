import { round } from "Shared/math"
import { converter } from "Features/Units/Converter"
import { PlatformTimeSeries } from "../types"
import { UnitSystem } from "Features/Units/types"

type CardDispData = {
  primary: string | number | null
  secondary: string | number | null
  primaryUnit: string | null
  secondaryUnit: string | null
  direction: string | number | null
}

export const getGroupData = (unitSystem: UnitSystem, groupName: string, groupTs: PlatformTimeSeries[]) => {
  const getValue = (ts: PlatformTimeSeries) => {
    const unit_converter = converter(ts.data_type.standard_name)
    const value = unit_converter.convertTo(ts.value as number, unitSystem)
    return typeof value === "number" ? round(value as number, 1) : value
  }

  const getUnit = (ts: PlatformTimeSeries) => {
    const unit_converter = converter(ts.data_type.standard_name)
    return unit_converter.displayName(unitSystem)
  }

  const getVar = (variable: string) => {
    if (groupTs) {
      return groupTs.find((ts) => ts.variable === variable)
    }
  }

  const getWindOrWaveData = (): CardDispData | null => {
    if (groupName === "Waves") {
      const height = getVar("WVHT")
      const period = getVar("DPD")
      const direction = getVar("MWD")
      return {
        primary: height ? getValue(height) : null,
        secondary: period ? getValue(period) : null,
        primaryUnit: height ? getUnit(height) : null,
        secondaryUnit: period ? getUnit(period) : null,
        direction: direction ? getValue(direction) : null,
      }
    }
    if (groupName === "Wind") {
      const speed = getVar("WSPD")
      const gust = getVar("GST")
      const direction = getVar("WDIR")
      return {
        primary: speed ? getValue(speed) : null,
        secondary: gust ? getValue(gust) : null,
        primaryUnit: speed ? getUnit(speed) : null,
        secondaryUnit: gust ? getUnit(gust) : null,
        direction: direction ? getValue(direction) : null,
      }
    }
    return null
  }

  return { getWindOrWaveData }
}

export const getNonGroupData = (unitSystem: UnitSystem, ts: PlatformTimeSeries) => {
  const getValue = (ts: PlatformTimeSeries) => {
    const unit_converter = converter(ts.data_type.standard_name)
    const value = unit_converter.convertTo(ts.value as number, unitSystem)
    return typeof value === "number" ? round(value as number, 1) : value
  }

  const getUnit = (ts: PlatformTimeSeries) => {
    const unit_converter = converter(ts.data_type.standard_name)
    return unit_converter.displayName(unitSystem)
  }

  const getOtherData = (): CardDispData => {
    return {
      primary: getValue(ts),
      secondary: null,
      primaryUnit: getUnit(ts),
      secondaryUnit: null,
      direction: null,
    }
  }

  return { getOtherData }
}

export const getLatestObsGroups = (allTs: PlatformTimeSeries[]) => {
  const groups = {
    Waves: new Set(["WVHT", "DPD", "MWD"]),
    Wind: new Set(["WSPD", "WDIR", "GST"]),
  }

  const filterByVar = (vars: Set<string>) => {
    return allTs.filter((ts) => vars.has(ts.variable))
  }

  // Take the given sets, combine them and exclude all variables that do not
  // exist in it.
  const filterOut = (...sets: Set<string>[]) => {
    let excludeSet = new Set(sets.flatMap((set) => [...set]))
    return allTs.filter((ts) => !excludeSet.has(ts.variable))
  }

  const waveTs = filterByVar(groups.Waves)
  const windTs = filterByVar(groups.Wind)
  const otherTs = filterOut(groups.Waves, groups.Wind)

  return { waveTs, windTs, otherTs }
}
