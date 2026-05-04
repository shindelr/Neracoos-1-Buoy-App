"use client"
import * as React from "react"
import Link from "next/link"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import * as Sentry from "@sentry/react"
import { Card, Col } from "react-bootstrap"

import { paths } from "Shared/constants"
import { urlPartReplacer } from "Shared/urlParams"
import { UnitSystem } from "Features/Units/types"
import { LineChartIcon, LocationArrowIcon } from "Shared/icons/iconsMap"

import { PlatformFeature, PlatformTimeSeries } from "../../../types"
import { getGroupData, getNonGroupData } from "Features/ERDDAP/hooks/latestObs"

interface TableItemDisplayProps {
  platform: PlatformFeature
  timeSeries: PlatformTimeSeries | PlatformTimeSeries[]
  unitSystem: UnitSystem
}

export const TableItemDisplay = ({
  // groupName,
  unitSystem,
  timeSeries,
  platform,
}: TableItemDisplayProps) => {
  const isGrouped = Array.isArray(timeSeries)

  // Just take this first one for the link right now
  const firstTs = isGrouped ? timeSeries[0] : timeSeries
  const groupName = isGrouped
    ? firstTs.data_type.long_name.match("Wave")
      ? "Waves"
      : "Wind"
    : firstTs.data_type.long_name

  const cardData = Array.isArray(timeSeries)
    ? getGroupData(unitSystem, groupName, timeSeries).getWindOrWaveData()
    : getNonGroupData(unitSystem, timeSeries).getOtherData()

  if (!cardData) {
    return null
  }

  return (
    <Col className="d-flex g-1">
      <div className="d-flex flex-fill w-100">
        <Sentry.ErrorBoundary fallback={<b>Error displaying {firstTs.data_type.long_name}</b>} showDialog={false}>
          <Card className="flex-fill w-100 card-drop-shadow">
            <Card.Body className="d-flex flex-column">
              {/* Bucket name */}
              <p className="text-black-65 mb-0">{groupName}</p>

              {/* Primary value and unit */}
              <span className="d-flex flex-row align-items-end">
                <h1 className="mb-0">{cardData?.primary}</h1>
                <p className="text-black-65 ms-1 m-0">{cardData?.primaryUnit}</p>
              </span>

              {/* Secondary info -- gust/period */}
              <span>
                <strong>
                  {groupName === "Wind" && cardData?.secondary && "Gust: "}
                  {groupName === "Waves" && cardData.secondary && "Period: "}
                  {cardData?.secondary} {cardData?.secondaryUnit}
                </strong>
              </span>

              {/* Direction */}
              {cardData?.direction && (
                <span className="d-flex flex-row align-items-center">
                  <p className="pt-1 mb-0">
                    <strong>
                      {cardData?.direction}
                      {cardData?.directionUnit}
                    </strong>
                  </p>
                  <LocationArrowIcon className="fa-sm ms-1 text-info" />
                </span>
              )}

              {/* Line chart icon with link */}
              <Link
                href={urlPartReplacer(
                  urlPartReplacer(paths.platforms.observations, ":id", platform.id as string),
                  ":type",
                  firstTs.data_type.standard_name,
                )}
                className="d-flex text-decoration-none mt-auto ms-auto text-info"
              >
                <LineChartIcon className="fa-sm" />
              </Link>
            </Card.Body>
          </Card>
        </Sentry.ErrorBoundary>
      </div>
    </Col>
  )
}
