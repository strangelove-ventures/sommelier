import {
  BoxProps,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import { CardStat } from "components/CardStat"
import { CardStatRow } from "components/CardStatRow"
import { VFC } from "react"
import { DepositButton } from "components/_buttons/DepositButton"
import { BondButton } from "components/_buttons/BondButton"
import { WithdrawButton } from "components/_buttons/WithdrawButton"
import { ClaimButton } from "components/_buttons/ClaimButton"
import { tokenConfig } from "data/tokenConfig"
import { InlineImage } from "components/InlineImage"
import TransparentCard from "./TransparentCard"
import { TokenAssets } from "components/TokenAssets"
import { useAaveV2Cellar } from "context/aaveV2StablecoinCellar"
import { useAaveStaker } from "context/aaveStakerContext"
import { toEther } from "./../../utils/formatCurrency"
import { ethers } from "ethers"

export const PortfolioCard: VFC<BoxProps> = () => {
  const { userData, fetchUserData } = useAaveV2Cellar()
  const { userStakeData } = useAaveStaker()
  console.log({ userStakeData })
  const totalRewards = userStakeData?.totalRewards?.toFixed()
  console.log("total Rewards ", totalRewards)
  console.log(
    "Bonded Tokens ",
    userStakeData?.totalBondedAmount?.toFixed()
  )
  // const totalBondedAmtInWei = ethers.utils.parseUnits(
  //   userStakeData?.totalBondedAmount?.toFixed() || "",
  //   18
  // )

  return (
    <TransparentCard px={10} py={6}>
      <CardStatRow
        spacing={14}
        align="flex-start"
        justify="flex-start"
      >
        <SimpleGrid
          templateColumns="repeat(2, max-content)"
          templateRows="repeat(2, 1fr)"
          spacing={4}
          alignItems="flex-end"
        >
          <CardStat
            label="net value"
            tooltip="Current value of your assets in Cellar"
          >
            $0.00
          </CardStat>
          <CardStat
            label="deposit assets"
            tooltip="Accepted deposit assets"
          >
            <TokenAssets tokens={tokenConfig} displaySymbol />
          </CardStat>
          <CardStat
            label="apy"
            tooltip="APY earned on your Principal since initial investment from Strategy"
          >
            0.00%
          </CardStat>
          <HStack spacing={3}>
            <DepositButton />
            <WithdrawButton />
          </HStack>
        </SimpleGrid>
        <SimpleGrid
          templateColumns="repeat(2, max-content)"
          templateRows="repeat(2, 1fr)"
          spacing={4}
          alignItems="flex-end"
        >
          <VStack align="flex-start">
            <CardStat
              label="available tokens"
              tooltip="Unbonded LP tokens earn interest from strategy but do not earn Liquidity Mining rewards"
            >
              <InlineImage
                src="/assets/icons/aave.svg"
                alt="aave logo"
              />
              {toEther(userData?.balances?.aaveClr, 18, false)}
            </CardStat>
          </VStack>
          <VStack align="flex-start">
            <CardStat
              label="bonded tokens"
              tooltip="Unbonded LP tokens earn interest from strategy but do not earn Liquidity Mining rewards"
            >
              <InlineImage
                src="/assets/icons/aave.svg"
                alt="aave logo"
              />
              {toEther(
                ethers.utils.parseUnits(
                  userStakeData?.totalBondedAmount?.toFixed() || "0",
                  0
                )
              )}
              {/* {toEther("11420000000000000000")} */}
            </CardStat>
          </VStack>
          <BondButton />
        </SimpleGrid>
        <SimpleGrid
          templateColumns="max-content"
          templateRows="repeat(2, 1fr)"
          spacing={4}
          alignItems="flex-end"
        >
          <VStack align="flex-start">
            <CardStat
              label="rewards"
              tooltip="Amount of SOMM earned and available to be claimed"
            >
              <InlineImage
                src="/assets/icons/somm.svg"
                alt="aave logo"
              />
              {userStakeData?.totalRewards?.toFixed()}
            </CardStat>
          </VStack>
          <ClaimButton />
        </SimpleGrid>
      </CardStatRow>
    </TransparentCard>
  )
}
