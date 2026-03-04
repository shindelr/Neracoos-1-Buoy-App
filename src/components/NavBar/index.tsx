"use client"
/**
 * Navbar component
 */
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import { paths } from "Shared/constants"

import { RegionDropdown } from "./regionDropdown"

import neracoosLogo from "./neracoos_logo.png"

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()

  let isActive = false

  if (href === "/" && pathname === "/") {
    isActive = true
  } else if (href !== "/") {
    isActive = pathname.startsWith(href)
  }

  return (
    <Link href={href} className={"nav-link" + (isActive ? " active" : "")}>
      {children}
    </Link>
  )
}

/**
 * Navbar component
 */
const NeracoosNavBar = () => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" expand="md" className="mb-2 mb-md-5">
        <Navbar.Brand href={paths.home} className="d-flex flex-column align-items-start flex-md-row align-items-md-center ms-5 ms-md-10">
          <Image src={neracoosLogo} alt="NERACOOS" height={30} width={209} className="pe-3" />
          <span className="align-middle pt-1">Mariner's Dashboard</span>
        </Navbar.Brand>

        {/* No need for media breakpoint, doesn't appear till md anyways */}
        <Navbar.Toggle className="me-3" />

        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-5 me-md-10">
            <RegionDropdown closeParent={close} />
            <Nav.Item>
              <NavLink href={paths.waterLevel.root}>Water Level</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink href={paths.about}>About</NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NeracoosNavBar
