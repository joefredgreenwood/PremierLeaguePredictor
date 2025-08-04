import {
  respondToRequestToJoinLeague,
  respondToLeagueInvite,
} from "@/services/leagueStandings/manageLeagueMembership";

import { fetchUserRequests } from "@/services/leagueStandings/fetchUsersLeagueStatus";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: unknown) {
  const decodedEmail = decodeURI(
    (context as { params: { encodedEmail: string } }).params.encodedEmail
  );
  console.log("Getting requests via api ################################");
  const userRequests = await fetchUserRequests(decodedEmail);
  return NextResponse.json(userRequests);
}

export async function POST(request: NextRequest, context: unknown) {
  const decodedEmail = decodeURI(
    (context as { params: { encodedEmail: string } }).params.encodedEmail
  );
  const body = (await request.json()) as {
    leagueName: string;
    userRespondingToRequest: string;
    decision: boolean;
    emailToAccept?: string;
  };

  // TODO: Verify the body is in the correct shape
  console.log(
    "hitting API to accept -------------------------------------------"
  );

  try {
    if (body.emailToAccept) {
      await respondToRequestToJoinLeague(
        body.emailToAccept,
        body.leagueName,
        decodedEmail,
        body.decision
      );
    } else {
      await respondToLeagueInvite(decodedEmail, body.leagueName, body.decision);
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Issues to responding to invite" },
      { status: 400 }
    );
  }
  return NextResponse.json({ success: true });
}
