import { VFC } from 'react'
import { linearGradientDef } from '@nivo/core'
import { ResponsiveLine, LineSvgProps } from '@nivo/line'
import { useTheme } from '@chakra-ui/react'

const LineChart: VFC<LineSvgProps> = ({ data, ...rest }) => {
  const { colors } = useTheme()

  return (
    <ResponsiveLine
      data={data}
      defs={[
        linearGradientDef('gradient', [
          { offset: 70, color: 'inherit' },
          { offset: 100, color: 'inherit', opacity: 0 }
        ])
      ]}
      fill={[{ match: '*', id: 'gradient' }]}
      enableArea
      enablePoints={false}
      colors={[colors.cyan[400]]}
      curve='natural'
      {...rest}
    />
  )
}

export default LineChart
