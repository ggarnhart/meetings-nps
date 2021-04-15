import React, { useState, useContext } from "react";
import { supabase, supabaseTables, SupabaseUser } from "../supabase";
import { AppContext } from "./State";

export default function Login() {
  const [email, setEmail] = useState("" as string);
  const [password, setPassword] = useState("" as string);
  const [showNewUserForm, setNewUserFrom] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  // const [user, setUser] = useContext(AppContext);

  const {
    user: [user, setUser],
    company: [company, setCompany],
  } = useContext(AppContext);

  const auth = async () => {
    if (showNewUserForm) {
      const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error === null) {
        console.log(user);
        console.log(session);
      }

      if (error === null) {
        setAuthSuccess(true);

        const { data, error } = await supabase
          .from(supabaseTables.users)
          .insert({
            gid: user.id,
            name: "",
            admin: false,
            team_gid: user.id,
            email: user.email,
          });
      }
    } else {
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error === null) {
        setAuthSuccess(true);

        let { data, error } = await supabase
          .from(supabaseTables.users)
          .select()
          .filter("gid", "eq", user.id);

        let foundUser = data[0];
        console.log("!!");
        console.log(foundUser);
      }
    }
  };
  return (
    <>
      <button
        className="w-48 px-2 py-2 my-2 border border-gray-800 border-solid"
        onClick={() => console.log(user)}
      >
        Log User
      </button>
      <button
        className="w-48 px-2 py-2 my-2 border border-gray-800 border-solid"
        onClick={() => console.log(company)}
      >
        Log Company
      </button>
      <button
        className="w-48 px-2 py-2 my-2 border border-gray-800 border-solid"
        onClick={() =>
          setUser({
            name: "greg",
            email: "greg.garnhart@gmail.com",
            gid: "132",
          })
        }
      >
        Update User
      </button>
      {!authSuccess && (
        <div className="flex flex-col justify-center px-6 py-4 bg-white shadow-sm dark:bg-gray-600 dark:text-white">
          <h2 className="mb-2 text-xl font-light text-left">Meetings NPS</h2>
          {!authSuccess && (
            <>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="px-2 py-1 my-1 bg-gray-200 dark:bg-gray-800 focus:ring-1 focus:ring-blue-200"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="px-2 py-1 my-1 bg-gray-200 dark:bg-gray-800 focus:ring-1 focus:ring-blue-200"
              />
              <span
                className="mb-2 text-gray-400 cursor-pointer dark:text-white hover:underline"
                onClick={() => setNewUserFrom(!showNewUserForm)}
              >
                {showNewUserForm && <span>Sign In</span>}
                {!showNewUserForm && <span>Sign Up</span>}
              </span>
              <button
                className="px-2 py-2 mt-2 border border-gray-800 border-solid"
                onClick={() => auth()}
              >
                {showNewUserForm && <span>Sign Up</span>}
                {!showNewUserForm && <span>Sign In</span>}
              </button>
            </>
          )}
          {authSuccess && <h2>Success!</h2>}
        </div>
      )}
    </>
  );
}
