import { WagtailBlock } from "Features/WagtailApi/WagtailBlock"
import { DehydratedPlatforms } from "Features/ERDDAP/hooks/DehydrateComponent"
import { HomeSuperlatives } from "../@belowMap/home"

export default function HomeSidebar() {
  return (
    <>
      <WagtailBlock pageId="20" />
      <WagtailBlock pageId="21" />
      <DehydratedPlatforms>
        <HomeSuperlatives />
      </DehydratedPlatforms>
    </>
  )
}
