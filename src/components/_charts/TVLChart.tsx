import { Circle } from "@chakra-ui/react"
import { linearGradientDef } from "@nivo/core"
import { PointTooltipProps, Point } from "@nivo/line"
import { usePerformanceChart } from "context/performanceChartContext"
import { useNivoThemes } from "hooks/nivo"
import dynamic from "next/dynamic"
import { FunctionComponent, VFC } from "react"
import { debounce } from "lodash"
const LineChart = dynamic(
  () => import("components/_charts/LineChart"),
  {
    ssr: false,
  }
)

const ToolTip: FunctionComponent<PointTooltipProps> = ({ point }) => {
  const { color } = point

  return (
    <Circle
      position="relative"
      top="20px"
      size="12px"
      bg={color}
      borderWidth={1}
      borderColor="neutral.100"
    />
  )
}

export const TVLChart: VFC = () => {
  const { data, setTvl } = usePerformanceChart()
  const { lineChartTheme, chartTheme } = useNivoThemes()
  const updateTvl = ({ data: point, index }: Point) => {
    setTvl({
      xFormatted: point.xFormatted,
      yFormatted: data?.series![0].data[index].y as string,
    })
  }
  const debouncedTvl = debounce(updateTvl, 100)

  return (
    <LineChart
      data={data.series!}
      colors={lineChartTheme}
      enableArea={true}
      animate={false}
      onMouseMove={debouncedTvl}
      crosshairType="x"
      defs={[
        linearGradientDef("gradientA", [
          { offset: 0, color: "inherit" },
          { offset: 100, color: "inherit", opacity: 0 },
        ]),
      ]}
      fill={[{ match: "*", id: "gradientA" }]}
      margin={{ bottom: 110, left: 6, right: 6, top: 20 }}
      axisLeft={null}
      theme={chartTheme}
      tooltip={ToolTip}
      {...data.chartProps}
    />
  )
}
