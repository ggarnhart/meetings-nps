import { addTeam } from "../../supabase/teams";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  console.log(
    await addTeam({ name: "Test Team", token: "234567", gid: uuidv4() })
  );
};
