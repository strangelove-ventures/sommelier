import { BoxProps, SimpleGrid, Stack, VStack } from "@chakra-ui/react"
import { CardStat } from "components/CardStat"
import { CardStatRow } from "components/CardStatRow"
import { VFC } from "react"
import { DepositButton } from "components/_buttons/DepositButton"
import { BondButton } from "components/_buttons/BondButton"
import { WithdrawButton } from "components/_buttons/WithdrawButton"
import { tokenConfig } from "data/tokenConfig"
import { InlineImage } from "components/InlineImage"
import { TransparentCard } from "./TransparentCard"
import { TokenAssets } from "components/TokenAssets"
import { useAaveV2Cellar } from "context/aaveV2StablecoinCellar"
import { useAaveStaker } from "context/aaveStakerContext"
import { toEther } from "utils/formatCurrency"
import { ethers } from "ethers"
import { BaseButton } from "components/_buttons/BaseButton"
import { useHandleTransaction } from "hooks/web3"
import BondingTableCard from "./BondingTableCard"
import { Apy } from "components/Apy"
import BigNumber from "bignumber.js"

interface PortfolioCardProps extends BoxProps {
  isConnected?: boolean
}

export const PortfolioCard: VFC<PortfolioCardProps> = ({
  isConnected,
  ...rest
}) => {
  const { userData, fetchUserData } = useAaveV2Cellar()
  const { aaveStakerSigner, fetchUserStakes } = useAaveStaker()
  const { doHandleTransaction } = useHandleTransaction()
  const { userStakeData } = useAaveStaker()
  const { userStakes, totalBondedAmount, totalRewards } =
    userStakeData
  const userRewards =
    userStakeData?.totalRewards &&
    new BigNumber(userStakeData?.totalRewards).toString()
  const claimAllDisabled =
    !isConnected || !userRewards || parseInt(userRewards) <= 0

  const handleClaimAll = async () => {
    const tx = await aaveStakerSigner.claimAll()
    await doHandleTransaction(tx)
    fetchUserStakes()
  }

  return (
    <TransparentCard px={6} py={6} {...rest}>
      <VStack align="stretch" spacing={8}>
        <CardStatRow
          px={{ md: 10 }}
          spacing={{ sm: 4, md: 8, lg: 14 }}
          align="flex-start"
          justify="flex-start"
          direction={{ sm: "column", md: "row" }}
          wrap="wrap"
        >
          <SimpleGrid
            templateColumns={{
              sm: "max-content",
              lg: "repeat(2, max-content)",
            }}
            templateRows="1fr 1fr"
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
              <Apy apy={`0.00`} />
            </CardStat>
            <Stack
              spacing={3}
              direction={{ sm: "row", md: "column", lg: "row" }}
            >
              <DepositButton disabled={!isConnected} />
              <WithdrawButton disabled={!isConnected} />
            </Stack>
          </SimpleGrid>
          <SimpleGrid
            templateColumns={{
              sm: "max-content",
              md: "repeat(2, max-content)",
            }}
            templateRows="repeat(2, 1fr)"
            spacing={4}
            alignItems="flex-end"
          >
            <VStack align="flex-start">
              <CardStat
                label="tokens"
                tooltip="Unbonded LP tokens earn interest from strategy but do not earn Liquidity Mining rewards"
              >
                {toEther(userData?.balances?.aaveClr, 18, false)}
              </CardStat>
            </VStack>
            <VStack align="flex-start">
              <CardStat
                label="bonded tokens"
                tooltip="Bonded LP tokens earn yield from strategy and accrue Liquidity Mining rewards based on bonding period length"
              >
                {toEther(
                  ethers.utils.parseUnits(
                    totalBondedAmount?.toFixed() || "0",
                    0
                  )
                )}
              </CardStat>
            </VStack>
            <BondButton disabled={!isConnected} />
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
                  src="/assets/icons/somm.png"
                  alt="aave logo"
                  boxSize={5}
                />
                {toEther(totalRewards?.toFixed())}
              </CardStat>
            </VStack>
            <BaseButton
              disabled={claimAllDisabled}
              onClick={handleClaimAll}
            >
              Claim All
            </BaseButton>
          </SimpleGrid>
        </CardStatRow>
        {isConnected && userStakes.length && <BondingTableCard />}
      </VStack>
    </TransparentCard>
  )
}
