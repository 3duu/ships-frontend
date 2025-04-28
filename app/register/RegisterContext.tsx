import React, { createContext, useReducer, useContext } from 'react';

interface RegisterState {
    name: string;
    email: string;
    password: string;
}

const initialState: RegisterState = {
    name: '',
    email: '',
    password: '',
};

const RegisterContext = createContext<any>(null);

function registerReducer(state: RegisterState, action: { type: string; payload?: any }) {
    switch (action.type) {
        case 'SET_ACCOUNT_INFO':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(registerReducer, initialState);

    return (
        <RegisterContext.Provider value={{ state, dispatch }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => useContext(RegisterContext);