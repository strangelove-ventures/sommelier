import { linearGradientDef } from "@nivo/core"
import { LineSvgProps } from "@nivo/line"
import { VFC } from "react"
import LineChart from "./LineChart"

const LineChartArea: VFC<LineSvgProps> = ({ data, ...rest }) => {
  return (
    <LineChart
      data={data}
      defs={[
        linearGradientDef("gradient", [
          { offset: 70, color: "inherit" },
          { offset: 100, color: "inherit", opacity: 0 },
        ]),
      ]}
      fill={[{ match: "*", id: "gradient" }]}
      enableArea
      {...rest}
    />
  )
}

export default LineChartArea
