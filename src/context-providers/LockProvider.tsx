import { createContext } from "react";
import { useSandBox } from "../hooks/useSandbox";
import { useUserStats } from "../hooks/useUserStats";

export const LockContext = createContext({});

export function LockProvider({ children }: any) {
  const userStats: any = useUserStats();
  const { state, dispatch } = useSandBox();
  return (
    <LockContext.Provider
      value={{
        state,
        dispatch,
        userStats,
      }}
    >
      {children}
    </LockContext.Provider>
  );
}
