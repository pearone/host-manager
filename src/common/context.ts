import { useMemo } from 'react';

export const useManagerContext = () => {
    return useMemo(() => {
        return {};
    }, []);
};

export type ManagerContextStore = ReturnType<typeof useManagerContext>;
