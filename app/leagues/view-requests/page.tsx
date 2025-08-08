"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

type LeagueRequests = {
  leagueRequests: {
    leagueName: string;
    userRequesting: string;
  }[];
  leagueUserInvitedTo: string[];
};

const RequestsPage = () => {
  const session = useSession();
  const user = session.data?.user?.email ?? null;
  const [requests, setRequests] = useState<LeagueRequests | undefined>(
    undefined
  );

  const handleSubmit = async (
    leagueName: string,
    decision: boolean,
    userToAccept?: string
  ) => {
    if (!user) return;

    await fetch(`/api/leagues/view-requests/${encodeURIComponent(user)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leagueName,
        user,
        decision,
        emailToAccept: userToAccept,
      }),
    });

    // Update the UI immediately after submission
    setRequests((prev) => {
      if (!prev) return prev;

      return {
        leagueRequests: userToAccept
          ? prev.leagueRequests.filter(
              (req) =>
                !(
                  req.leagueName === leagueName &&
                  req.userRequesting === userToAccept
                )
            )
          : prev.leagueRequests,
        leagueUserInvitedTo: !userToAccept
          ? prev.leagueUserInvitedTo.filter((name) => name !== leagueName)
          : prev.leagueUserInvitedTo,
      };
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const getRequests = async () => {
      const res = await fetch(
        `/api/leagues/view-requests/${encodeURIComponent(user)}`
      );
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      } else {
        console.error("This is an error", res.status, res.statusText);
      }
    };

    getRequests();
  }, [session.status, user]);

  if (
    !requests?.leagueRequests.length &&
    !requests?.leagueUserInvitedTo.length
  ) {
    return (
      <div>
        <h3>You have no current requests</h3>
      </div>
    );
  }
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!!requests.leagueRequests.length && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  League Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.leagueRequests.map((request) => (
                <tr key={`${request.leagueName}${request.userRequesting}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.leagueName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.userRequesting}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleSubmit(
                          request.leagueName,
                          true,
                          request.userRequesting
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleSubmit(
                          request.leagueName,
                          false,
                          request.userRequesting
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!!requests.leagueUserInvitedTo.length && (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">
            Requests to join a new league
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  League Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.leagueUserInvitedTo.map((request) => (
                <tr key={request}>
                  <td className="px-6 py-4 whitespace-nowrap">{request}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSubmit(request, true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleSubmit(request, false)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default RequestsPage;
