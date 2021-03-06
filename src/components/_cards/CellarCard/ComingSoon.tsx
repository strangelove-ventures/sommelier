import { Heading, Img, Flex } from "@chakra-ui/react"

const imageUrls = [
  "/assets/images/comingSoonB.png",
  "/assets/images/comingSoonA.png",
]

interface Props {
  index?: number
}

export const ComingSoon: React.FC<Props> = ({ index = 0 }) => {
  const imageUrl = imageUrls[index]

  return (
    <>
      <Img src={imageUrl} />
      <Flex
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
      >
        <Heading size="md">Coming Soon</Heading>
      </Flex>
    </>
  )
}
