import { createContext, useContext } from "react";


export const RadioContext = createContext({
    radioFields: [],
    setRadioFields: () => { }
})

export const RadioProvider = RadioContext.Provider

const useRadio = ()=> useContext(RadioContext)

export default useRadio