import {
  Avatar,
  Box,
  HStack,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react"
import { Token } from "data/tokenConfig"
import { VFC } from "react"
import { ControlsIcon } from "./_icons"

interface TokenAssetsProps extends StackProps {
  tokens: Token[]
  displaySymbol?: boolean
}

export const TokenAssets: VFC<TokenAssetsProps> = ({
  tokens,
  displaySymbol,
  ...rest
}) => {
  const tokensCropped = tokens.slice(0, 6)

  return tokens.length > 6 ? (
    <HStack>
      <HStack spacing={-1.5} {...rest}>
        {tokensCropped.map((token) => {
          const { src, alt, address } = token
          return (
            <Avatar
              key={address}
              size="xs"
              src={src}
              name={alt}
              borderWidth={2}
              borderColor="surface.bg"
              bg="surface.bg"
              _notFirst={{
                opacity: 0.65,
              }}
            />
          )
        })}
        <Tooltip
          hasArrow
          arrowShadowColor="purple.base"
          label={
            <VStack align="flex-start" minW={120}>
              {tokens.map((token) => {
                const { src, alt, address, symbol } = token
                return (
                  <HStack key={address}>
                    <Avatar
                      size="xs"
                      src={src}
                      name={alt}
                      borderWidth={2}
                      borderColor="surface.bg"
                      bg="surface.bg"
                      _notLast={{
                        opacity: 0.65,
                      }}
                    />
                    <Text>{symbol}</Text>
                  </HStack>
                )
              })}
            </VStack>
          }
          py={3}
          px={5}
          bg="surface.bg"
          borderWidth={1}
          borderRadius={8}
          borderColor="purple.base"
        >
          <Box
            as="span"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize="25px"
            borderRadius="full"
            borderWidth={2}
            borderColor="surface.bg"
            overflow="hidden"
            opacity={0.65}
          >
            <ControlsIcon p={1.5} boxSize="inherit" bg="#6C4ED9" />
          </Box>
        </Tooltip>
      </HStack>
      {displaySymbol && (
        <Text as="span">
          {tokensCropped[tokensCropped.length - 1].symbol}
        </Text>
      )}
    </HStack>
  ) : (
    <HStack>
      <HStack spacing={-1.5} {...rest}>
        {tokens.map((token) => {
          const { src, alt, address } = token
          return (
            <Avatar
              key={address}
              size="xs"
              src={src}
              name={alt}
              borderWidth={2}
              borderColor="surface.bg"
              bg="surface.bg"
              _notLast={{
                opacity: 0.65,
              }}
            />
          )
        })}
      </HStack>
      {displaySymbol && (
        <Text as="span">{tokens[tokens.length - 1].symbol}</Text>
      )}
    </HStack>
  )
}
