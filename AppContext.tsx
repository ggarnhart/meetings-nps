import React, { createContext, useState, useContext } from "react";
import { SupabaseTeamMember } from "./supabase";

interface AppContextInterface {
  children: any;
}

// add misc. things here that don't really need to be queried regularly.
// all should be optional, I guess.
type AppMetadata = {
  teamName?: string;
};

export const initialAppContextValues = {
  teamMember: {} as SupabaseTeamMember,
  setTeamMember: (_: SupabaseTeamMember) => {},
  appMetadata: {} as AppMetadata,
  setAppMetadata: (_: AppMetadata) => {},
};

export const AppContext = createContext(initialAppContextValues);

export default function AuthWrapper({ children }: AppContextInterface) {
  const [teamMember, setTeamMember] = useState({} as SupabaseTeamMember);
  const [appMetadata, setAppMetadata] = useState({} as AppMetadata);

  return (
    <AppContext.Provider
      value={{ teamMember, setTeamMember, appMetadata, setAppMetadata }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAuth = () => {
  const { teamMember, setTeamMember } = useContext(AppContext);
  return {
    teamMember,
    setTeamMember,
  };
};

export const useMetadata = () => {
  const { appMetadata, setAppMetadata } = useContext(AppContext);
  return {
    appMetadata,
    setAppMetadata,
  };
};
