/**
 * Current observations table component
 */
import React from "react"
import { Row } from "react-bootstrap"
import { UnitSystem } from "Features/Units/types"

import { UsePlatformRenderProps } from "../../../hooks/BuoyBarnComponents"
import { currentConditionsTimeseries } from "../../../utils/currentConditionsTimeseries"

import { itemStyle, TableItem } from "./item"
import { platformName } from "Features/ERDDAP/utils/platformName"

interface Props extends UsePlatformRenderProps {
  unitSelector?: React.ReactNode
  unitSystem: UnitSystem
  laterThan: Date
  children?: any
}

/**
 * Recent platform observation values
 * @param platform
 */
export const ErddapObservationTable: React.FC<Props> = ({
  platform,
  unitSelector,
  unitSystem,
  laterThan,
  children,
}: Props) => {
  const { allCurrentConditionsTimeseries } = currentConditionsTimeseries(platform, laterThan)
  const times = allCurrentConditionsTimeseries.filter((d) => d.time !== null).map((d) => new Date(d.time as string))
  times.sort((a, b) => a.valueOf() - b.valueOf())

  return (
    <div>
      {times.length > 0 ? (
        <>
          <b>Last updated at:</b>{" "}
          {times[times.length - 1].toLocaleString(undefined, {
            hour: "2-digit",
            hour12: true,
            minute: "2-digit",
            month: "short",
            day: "numeric",
          })}
        </>
      ) : (
        <>There is no recent data from {platformName(platform)}</>
      )}
      <Row xs={1} md={3}>
        {allCurrentConditionsTimeseries.map((timeSeries, index) => {
          return <TableItem key={index} timeSeries={timeSeries} platform={platform} unitSystem={unitSystem} />
        })}
      </Row>

      {unitSelector ? (
        <>
          <b>Unit system:</b> {unitSelector}
        </>
      ) : null}
      {children && <>{children}</>}
    </div>
  )
}
