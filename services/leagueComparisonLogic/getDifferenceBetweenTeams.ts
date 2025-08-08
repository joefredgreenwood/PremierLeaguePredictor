export function getDifferenceBetweenLeagueTable(
  leagueTable1: string[],
  leagueTable2: string[]
): number {
  verifyLeagueContainsSameTeams(leagueTable1, leagueTable2);

  return leagueTable1.reduce((totalDifference, teamName, teamIndex) => {
    return (
      totalDifference +
      Math.abs(getDifferenceBetweenTeam(teamName, teamIndex, leagueTable2))
    );
  }, 0);
}

export function getDifferenceBetweenTeam(
  teamName: string,
  index: number,
  comparisonTeams: string[]
) {
  const comparisonIndex = comparisonTeams.indexOf(teamName);
  return comparisonIndex - index;
}

function verifyLeagueContainsSameTeams(
  leagueTable1: string[],
  leagueTable2: string[]
) {
  if (
    leagueTable1.length !== leagueTable2.length &&
    leagueTable1.every((team) => leagueTable2.includes(team))
  ) {
    throw new Error("Provided Teams are different");
  }
}
