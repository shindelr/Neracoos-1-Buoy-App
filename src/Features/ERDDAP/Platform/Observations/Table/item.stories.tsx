import * as React from "react"

import { TableItemDisplay } from "./item"
import { UnitSystem } from "Features/Units/types"

import { platform } from "stories/platform"

export default {
  component: TableItemDisplay,
  title: "ERDDAP/ObservationTable/Item",
  parameters: {
    storyshots: {
      disable: true,
    },
  },
  argTypes: {
    later_then: {
      control: {
        type: "date",
      },
    },
  },
}

const windSpeed = platform.properties.readings.find((ts) => ts.data_type.standard_name === "wind_speed")

export const english = (args) => <TableItemDisplay {...args} />
english.args = {
  unitSystem: UnitSystem.english,
  platform,
  timeSeries: windSpeed,
}

export const metric = (args) => <TableItemDisplay {...args} />
metric.args = {
  unitSystem: UnitSystem.metric,
  platform,
  readings: platform.properties.readings,
  timeSeries: windSpeed,
}
