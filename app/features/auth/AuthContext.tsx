import * as React from 'react';

const AuthContext = React.createContext<{
    user: { me: {}| null } | null,
    setUser: () => void,
    logout: () => void
}>({
    user: null,
    setUser: async () => null,
    logout: async () => null
});

export default AuthContext;