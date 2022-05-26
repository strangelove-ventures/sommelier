import { useContext, createContext, ReactNode } from "react"
import {
  useContract,
  useAccount,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi"
import { config } from "utils/config"
import { useEffect, useState, useCallback } from "react"
import { BigNumber as BigNumberE } from "ethers"

type CellarState = {
  loading: boolean
  name: string
}

type Balances = {
  dai?: string
  aaveClr?: string
}

type UserState = {
  loading: boolean
  balances?: Balances
  maxDeposit?: BigNumberE
  netValue?: BigNumberE
}

const initialUserData: UserState = {
  loading: false,
}

type SharedState = {
  cellarData: CellarState
  userData: UserState
  aaveCellarSigner?: any
  cellarRouterSigner?: any
  fetchUserData?: any
}

const initialCellarData: CellarState = {
  loading: false,
  name: "",
}
const AaveV2CellarContext = createContext<SharedState>({
  cellarData: initialCellarData,
  userData: initialUserData,
})

export const AaveV2CellarProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [{ data: signer }] = useSigner()
  const provider = useProvider()
  const [{ data: account }] = useAccount()
  const { CONTRACT } = config
  const [cellarData, setCellarData] = useState(initialCellarData)
  const [userData, setUserData] = useState(initialUserData)

  const [
    { data: daiBalance, error, loading: daiLoading },
    getBalance,
  ] = useBalance({
    addressOrName: account?.address,
    token: CONTRACT.DAI.ADDRESS,
    formatUnits: "wei",
  })

  const [
    {
      data: aaveClrBalance,
      error: aaveClrError,
      loading: aaveClrLoading,
    },
    refetch,
  ] = useBalance({
    addressOrName: account?.address,
    token: CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
    formatUnits: "wei",
  })

  const aaveCellarSigner = useContract({
    addressOrName: CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
    contractInterface: CONTRACT.AAVE_V2_STABLE_CELLAR.ABI,
    signerOrProvider: signer,
  })

  const cellarRouterSigner = useContract({
    addressOrName: CONTRACT.CELLAR_ROUTER.ADDRESS,
    contractInterface: CONTRACT.CELLAR_ROUTER.ABI,
    signerOrProvider: signer,
  })

  const aaveV2CellarContract = useContract({
    addressOrName: CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
    contractInterface: CONTRACT.AAVE_V2_STABLE_CELLAR.ABI,
    signerOrProvider: provider,
  })

  // cellar data
  useEffect(() => {
    if (!aaveV2CellarContract) return
    const fn = async () => {
      setCellarData((state) => ({ ...state, loading: true }))
      try {
        const name = await aaveV2CellarContract.name()
        setCellarData((state) => ({
          ...state,
          name: name,
          loading: false,
        }))
      } catch (e) {
        console.warn("Cannot read cellar data", e)
        setCellarData((state) => ({ ...state, loading: false }))
      }
    }

    void fn()
  }, [aaveV2CellarContract])

  const fetchUserData = useCallback(async () => {
    setUserData((state) => ({ ...state, loading: true }))
    try {
      const { userActiveAssets, userInactiveAssets } =
        await aaveV2CellarContract.getUserBalances(account?.address)
      const aaveClrBalance = await refetch()
      const netValue = userInactiveAssets.toString()

      const maxDeposit = await aaveV2CellarContract.maxDeposit(
        account?.address
      )
      setUserData((state) => ({
        ...state,
        balances: {
          ...state.balances,
          dai: daiBalance?.formatted,
          aaveClr: aaveClrBalance?.data?.formatted,
        },
        maxDeposit: maxDeposit,
        netValue: netValue,
        loading: false,
      }))
    } catch (e) {
      console.warn("Cannot read user data", e)
      setUserData((state) => ({ ...state, loading: false }))
    }
  }, [
    aaveV2CellarContract,
    account?.address,
    daiBalance?.formatted,
    refetch,
  ])

  // user data
  useEffect(() => {
    if (!aaveV2CellarContract || !daiBalance || !account?.address)
      return
    fetchUserData()
  }, [
    aaveV2CellarContract,
    account?.address,
    daiBalance,
    fetchUserData,
  ])

  return (
    <AaveV2CellarContext.Provider
      value={{
        cellarData,
        userData,
        aaveCellarSigner,
        cellarRouterSigner,
        fetchUserData,
      }}
    >
      {children}
    </AaveV2CellarContext.Provider>
  )
}

export const useAaveV2Cellar = () => {
  return useContext(AaveV2CellarContext)
}
