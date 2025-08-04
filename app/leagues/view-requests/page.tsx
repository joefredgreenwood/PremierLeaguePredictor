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
    if (!user) {
      return;
    }
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
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const getRequests = async () => {
      const res = await fetch(`/api/leagues/view-requests/${encodeURI(user)}`);
      const data = await res.json();
      setRequests(data);
    };

    getRequests();
  }, [session.status, user]);

  if (!requests) {
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
        <div>
          Requests to join your league
          {requests.leagueRequests.map((request) => {
            return (
              <div
                className="flex flex-row"
                key={`${request.leagueName}${request.userRequesting}`}
              >
                <h3>
                  League Name - {request.leagueName} User -
                  {request.userRequesting}
                </h3>
                <button
                  onClick={() =>
                    handleSubmit(
                      request.leagueName,
                      true,
                      request.userRequesting
                    )
                  }
                  className="text-blue-600 mt-2 mb-4"
                >
                  Accept Request
                </button>
                <button
                  className="text-red-600 mt-2 mb-4"
                  onClick={() =>
                    handleSubmit(
                      request.leagueName,
                      false,
                      request.userRequesting
                    )
                  }
                >
                  Decline Request
                </button>
              </div>
            );
          })}
        </div>
      )}
      {!!requests.leagueUserInvitedTo.length && (
        <div>
          Requests to join a new league
          {requests.leagueUserInvitedTo.map((request) => {
            return (
              <div className="flex flex-row" key={request}>
                <h3>League Name - {request}</h3>
                <button
                  onClick={() => handleSubmit(request, true)}
                  className="text-blue-600 mt-2 mb-4"
                >
                  Accept Request
                </button>
                <button
                  className="text-red-600 mt-2 mb-4"
                  onClick={() => handleSubmit(request, false)}
                >
                  Decline Request
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RequestsPage;
