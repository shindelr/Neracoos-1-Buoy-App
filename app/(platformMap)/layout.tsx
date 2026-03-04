"use client"
import { useParams, usePathname } from "next/navigation"
import * as React from "react"
import { useEffect, useState } from "react"
import { useMeasure } from "react-use"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { ErddapMap } from "../../src/Features/ERDDAP/Map"

export default function Layout({
  children,
  sidebar,
  belowMap,
  bottom,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  bottom: React.ReactNode
  belowMap: React.ReactNode
}) {
  const path = usePathname()
  const isPlatformView = path.startsWith("/platform")
  const params: { regionId?: string; platformId?: string } = useParams()
  let [ref, { height }] = useMeasure<HTMLDivElement>()
  const platformId = params.platformId
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // // Quick update for landing page, but this will need dynamicism(sp?)
  // if (height < 520) {
  //   height = 520
  // }

  //Removing warning in console re:Highcharts library defaultProps. Not an active warning for us--until this issues is solved on Highcharts' end, keep this to remove huge console error
  const error = console.error
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return
    error(...args)
  }

  return (
    <React.Fragment>
      <Row className="align-items-stretch mx-5 mx-md-10">
        <Col xs={12} md={6} className="ps-0 pe-0 pe-md-5">
          <ErddapMap
            // height={params.regionId ? "80vh" : height}
            {...(isPlatformView && { platformId })}
          />
        </Col>
        <Col xs={12} md={6} className="ps-0 pe-0 ps-md-5 mt-5 mt-md-0">
          {sidebar}
          {belowMap ?? <React.Fragment>{belowMap}</React.Fragment>}
        </Col>
      </Row>

      {(isPlatformView && isClient && bottom) ?? <Row>{bottom}</Row>}
    </React.Fragment>
  )
}
