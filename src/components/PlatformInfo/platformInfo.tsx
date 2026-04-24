"use client"
import React from "react"

import { PlatformAlerts } from "Features/ERDDAP/Platform/Alerts"
import { ErddapPlatformInfoPanel } from "Features/ERDDAP/Platform/Info"
import { UsePlatform } from "Features/ERDDAP/hooks/BuoyBarnComponents"

/**
 * Display our platform info panel for the select platform.
 */
export const PlatformInfo = ({ id }: { id: string }) => {
  return (
    <UsePlatform platformId={id}>
      {({ platform }) => (
        <React.Fragment>
          <PlatformAlerts platform={platform} />
          <ErddapPlatformInfoPanel platform={platform} />
        </React.Fragment>
      )}
    </UsePlatform>
  )
}
