import * as React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from "../../utils/queries";
import { currentUserQuery } from "../../utils/types/currentUserQuery";
import AuthContext from './AuthContext';

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const { loading, data, refetch } = useQuery<currentUserQuery>(CURRENT_USER_QUERY);

    const setUser = async () => {
        refetch();
    }

    const logout = () => {}

    if (loading) {
        return <p>Loading</p>
    }

    return (
        <AuthContext.Provider value={{user: data, setUser, logout}} >
            {children}
        </AuthContext.Provider>)
}