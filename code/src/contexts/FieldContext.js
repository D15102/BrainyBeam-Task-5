import { createContext, useContext } from "react";


export const FieldContext = createContext({
    fields: [
        {
            id: 1,
            fieldType: "",
            fieldQuestion: "",
            fieldAnswer: "",
            required : false
        }
    ],
    setFields: () => { }
})


export const FieldProvider = FieldContext.Provider

const useField = () => useContext(FieldContext)

export default useField