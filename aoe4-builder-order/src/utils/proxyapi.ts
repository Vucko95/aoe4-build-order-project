export const fetchLeaderboard = async (leaderboardType: string) => {
    // const res = fetch('http://localhost:6969/leaderboards/qm_4v4');
    const res = await fetch(`http://localhost:6969/leaderboards/${leaderboardType}`);
    const data = await  res.json();
    console.log(data)
    console.log(data)
    return data

}