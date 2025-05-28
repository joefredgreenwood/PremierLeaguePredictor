import LeagueTable from "@/components/LeagueTable";

const AboutPage: React.FC = () => {
  const teams = [
    "Man City",
    "Arsenal",
    "Liverpool",
    "Tottenham",
    "Aston Villa",
    "Man United",
    "Chelsea",
    "Newcastle",
    "West Ham",
    "Brighton",
    "Wolves",
    "Bournemouth",
    "Fulham",
    "Crystal Palace",
    "Brentford",
    "Everton",
    "Nottingham Forest",
    "Luton Town",
    "Burnley",
    "Sheffield United",
  ];

  return (
    <>
      <h1>Premier League Table</h1>
      <div className="flex mt-10 ml-10">
        <div className="w-1/3 ml-10">
          <h3>Selections</h3>
          <LeagueTable isEnabled={true} orderedTeams={teams} />
        </div>
        <div className="w-1/3 ml-10">
          <h3>Current Table</h3>
          <LeagueTable isEnabled={false} orderedTeams={[...teams].reverse()} />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
