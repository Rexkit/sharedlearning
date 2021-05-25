import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Logout } from "../../utils/types/Logout";
import { CURRENT_USER_QUERY, LOGOUT_QUERY } from "../../utils/queries";
import { currentUserQuery } from "../../utils/types/currentUserQuery";
import AuthContext from './AuthContext';

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const { loading, data, refetch } = useQuery<currentUserQuery>(CURRENT_USER_QUERY);
    const [ logoutMutation ] = useMutation<Logout>(LOGOUT_QUERY);

    const setUser = async () => {
        refetch();
    }

    const logout = async () => {
        await logoutMutation();
        refetch();
    }

    if (loading) {
        return <p>Loading</p>
    }

    return (
        <AuthContext.Provider value={{user: data, setUser, logout}} >
            {children}
        </AuthContext.Provider>)
}