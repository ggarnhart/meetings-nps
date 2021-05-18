import React, { createContext, useState, useContext } from "react";
import { SupabaseTeamMember } from "./supabase";

interface AppContextInterface {
  children: any;
}

export const initialAppContextValues = {
  teamMember: {} as SupabaseTeamMember,
  setTeamMember: (_: SupabaseTeamMember) => {},
};

export const AppContext = createContext(initialAppContextValues);

export default function AuthWrapper({ children }: AppContextInterface) {
  const [teamMember, setTeamMember] = useState({} as SupabaseTeamMember);

  return (
    <AppContext.Provider value={{ teamMember, setTeamMember }}>
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
