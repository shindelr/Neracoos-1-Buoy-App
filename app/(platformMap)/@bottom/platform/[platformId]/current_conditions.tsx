"use client"
import { Row, Col } from "react-bootstrap"

import { UsePlatform } from "Features/ERDDAP/hooks"
import { PlatformFeature } from "Features/ERDDAP/types"
import { ErddapCurrentPlatformConditions } from "Features/ERDDAP/Platform/Observations/CurrentConditions"
import { ErddapObservationTable } from "Features/ERDDAP/Platform/Observations/Table/table"
import { UnitSelector, useUnitSystem } from "Features/Units"
import { aDayAgoRounded } from "Shared/time"

export function CurrentConditions({ platformId }: { platformId: string }) {
  const unitSystem = useUnitSystem()
  const aDayAgo = aDayAgoRounded()

  return (
    <UsePlatform platformId={platformId}>
      {({ platform }: { platform: PlatformFeature }) => {
        return (
          <Row>
            <Col xs={12} md={8}>
              <ErddapCurrentPlatformConditions platform={platform} />
            </Col>
            <Col xs={12} md={4}>
              <ErddapObservationTable
                platform={platform}
                unitSelector={<UnitSelector />}
                unitSystem={unitSystem}
                laterThan={aDayAgo}
              />
            </Col>
          </Row>
        )
      }}
    </UsePlatform>
  )
}
