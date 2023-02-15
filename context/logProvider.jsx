import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/constants";
import { useAccount, useProvider } from "wagmi";

const LogContext = React.createContext(null)

export const LogProvider = ({ children }) => {
    const contractAddress = contractAddress //process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

    return (
        <LogContext.Provider value={{chiffre,contractAddress}}>
            {children}
        </LogContext.Provider>
    )
}

export default LogContext;