import React, { createContext, useState } from "react";

export type UserContextType = {
  name?: string;
  email?: string;
  gid?: string;
};

export type CompanyContextType = {
  gid?: string;
  name?: string;
  workspace?: string;
};

interface AppWrapperProps {
  children?: any;
}

export const AppContext = createContext({} as any);

export default function AppWrapper({ children }: AppWrapperProps) {
  const [user, setUser] = useState({} as UserContextType);
  const [company, setCompany] = useState({} as CompanyContextType);

  let store = {
    user: [user, setUser],
    company: [company, setCompany],
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}
