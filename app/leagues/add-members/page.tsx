"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { inviteUsersToLeague } from "./actions";

const LeaguesPage = () => {
  const leagueName = useSearchParams().get("leagueName") || "";

  if (!leagueName) {
    throw new Error("Missing Parameters");
  }

  const session = useSession();
  const user = session.data?.user?.email ?? "";

  const [emails, setEmails] = useState<string>("");
  const handleAddUsers = async () => {
    const emailList = emails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);
    // TODO: Call API to add users
    setEmails("");
    alert(`Adding users: ${emailList.join(", ")}`);
    await inviteUsersToLeague(emailList, leagueName, user);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Users to League</h2>
        <label className="block mb-2 text-gray-700">
          Enter emails (comma separated):
        </label>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={3}
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="user1@example.com, user2@example.com"
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddUsers}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaguesPage;
