import * as React from 'react';

const AuthContext = React.createContext<{
    user: {} | null,
    setUser: () => void,
    logout: () => void
}>({
    user: null,
    setUser: async () => null,
    logout: async () => null
});

export default AuthContext;