/**
 * All current conditions table component
 */
import * as React from "react"
import { Row } from "react-bootstrap"

import { UnitSystem } from "Features/Units/types"

import { UsePlatformRenderProps } from "../../../hooks/BuoyBarnComponents"
import { TableItemDisplay } from "./item"
import { getLatestObsGroups } from "Features/ERDDAP/hooks/latestObs"
import { platformName } from "Features/ERDDAP/utils/platformName"

interface Props extends UsePlatformRenderProps {
  unitSystem: UnitSystem
}

/**
 * Display all current conditions
 */
export const ErddapAllObservationsTable: React.FunctionComponent<Props> = ({ platform, unitSystem }) => {
  const times = platform.properties.readings.filter((d) => d.time !== null).map((d) => new Date(d.time as string))
  times.sort((a, b) => a.valueOf() - b.valueOf())

  const datasets = platform.properties.readings

  datasets.sort((a, b) => (a.depth && b.depth ? a.depth - b.depth : 0))
  datasets.sort((a, b) => (a.data_type.long_name < b.data_type.long_name ? -1 : 1))

  const { waveTs, windTs, otherTs } = getLatestObsGroups(datasets)

  return (
    <>
      <h3>All Observations</h3>
      {times.length > 0 ? (
        <span className="d-flex flex-row">
          <p className="text-black-65 pe-1">Last updated</p>
          <b data-testid="all-last-updated-timestamp">{times[times.length - 1].toLocaleString()}</b>
        </span>
      ) : (
        <div>There is no recent data from {platformName(platform)}</div>
      )}

      <Row xs={1} lg={4} className="align-items-stretch">
        {waveTs.length > 0 && <TableItemDisplay timeSeries={waveTs} platform={platform} unitSystem={unitSystem} />}
        {windTs.length > 0 && <TableItemDisplay timeSeries={windTs} platform={platform} unitSystem={unitSystem} />}
        {otherTs.map((ts, index) => {
          return <TableItemDisplay key={index} timeSeries={ts} platform={platform} unitSystem={unitSystem} />
        })}
      </Row>
    </>
  )
}
