import React, { createContext, ReactElement, useContext, useReducer } from 'react'
import firebase from 'firebase/index'
interface Props {
    reducer:any,
    initialState:any,
    children:any
}

export const StateContext = createContext<any>(undefined)

export default function StateProvider({reducer,initialState,children}: Props): ReactElement {
    return (
        <StateContext.Provider value={
            useReducer(reducer,initialState)
        }>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)