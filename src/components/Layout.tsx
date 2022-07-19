import { VFC } from "react"
import { Nav } from "./Nav"
import { Container, Flex, FlexProps } from "@chakra-ui/react"
import Footer from "./Footer"
import { BackgroundAssets } from "./BackgroundAssets"
import { useGeo } from "context/geoContext"

export const Layout: VFC<FlexProps> = ({ children, ...rest }) => {
  const { isRestricted } = useGeo() || {}

  return (
    <>
      <BackgroundAssets />
      <Flex minH="100vh" flexDir="column" {...rest}>
        <Nav />
        <Container as="main" flex={1} pt={40} maxW="container.lg">
          {isRestricted && <Flex>NO THX</Flex>}
          {children}
        </Container>
        <Footer />
      </Flex>
    </>
  )
}
