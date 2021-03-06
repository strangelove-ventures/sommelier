import { forwardRef, Icon, IconProps } from "@chakra-ui/react"
import { VFC } from "react"

export const ControlsIcon: VFC<IconProps> = forwardRef(
  (props, ref) => (
    <Icon ref={ref} viewBox="0 0 16 16" {...props}>
      <path
        d="M13.7143 10.2857C14.9766 10.2857 16 9.26237 16 8C16 6.73764 14.9766 5.71429 13.7143 5.71429C12.4519 5.71429 11.4286 6.73764 11.4286 8C11.4286 9.26237 12.4519 10.2857 13.7143 10.2857Z"
        fill="currentColor"
      />
      <path
        d="M8.00001 10.2857C9.26237 10.2857 10.2857 9.26237 10.2857 8C10.2857 6.73764 9.26237 5.71429 8.00001 5.71429C6.73764 5.71429 5.71429 6.73764 5.71429 8C5.71429 9.26237 6.73764 10.2857 8.00001 10.2857Z"
        fill="currentColor"
      />
      <path
        d="M2.28571 10.2857C3.54808 10.2857 4.57143 9.26237 4.57143 8C4.57143 6.73764 3.54808 5.71429 2.28571 5.71429C1.02335 5.71429 0 6.73764 0 8C0 9.26237 1.02335 10.2857 2.28571 10.2857Z"
        fill="currentColor"
      />
    </Icon>
  )
)
