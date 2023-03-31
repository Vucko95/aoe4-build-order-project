
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

type PlayerInfo = {
    player_name : string;
    max_rating : number;
    current_rating : number;   
    profile_id : number;
}
type PlayerDetails = {
    small_avatar: string;
    rating: number;
    win_rate: number;
    rank_level: string;
}

type PlayerRM_Solo_Info = {
    civilization : string;
    win_rate : number;
}

const LeaderboardPage: NextPage = () => { 
    const [playerInfo, setPlayerinfo] = useState<PlayerInfo[]>([]);
    const [playerRM_Solo_Info, setPlayerRM_Solo_Info] = useState<PlayerRM_Solo_Info[]>([]);
    const [leaderboardType, setLeaderboardType] = useState("rm_solo");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const civilizationImages: {[key: string]: string} = {
        'holy_roman_empire': 'Holy Roman Empire.png',
        'english': 'english.png',
        'malians': 'malians.png',
        'rus': 'rus.png',
        'mongols': 'mongols.png',
        'abbasid_dynasty': 'abbasid dynasty.png',
        'delhi_sultanate': 'delhi sultanate.png',
        'chinese': 'chinese.png',
        'ottomans': 'ottomans.png'
      };
    const [playerDetails, setPlayerDetails] = useState<PlayerDetails[]>([]);

            const fetchLeaderboard = async () => {
            // const res = fetch('http://localhost:6969/leaderboards/qm_4v4');
            // setIsLoading(true);
            const res = await fetch(`http://localhost:6969/leaderboards/${leaderboardType}`);
            const data = await (await res).json();
            console.log(data)
            // setIsLoading(false);
            setPlayerinfo(data);
        }

            const getPlayerBaseInfo = async (profileId: number) => {
                try {
                    const response = await fetch('http://localhost:6969/player/info', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ "profile_id": profileId })

                      
                    });
                    const data = await response.json();
                    // console.log(data.player_info); 
                    // console.log(data.rm_solo_civs_player_info); 
                    setPlayerDetails(data.player_info);
                    setPlayerRM_Solo_Info(data.rm_solo_civs_player_info)

                  } catch (error) {
                    console.error(error);
                  }
            };

    useEffect(() => {

        fetchLeaderboard();
    }, [leaderboardType])

    return (
        <>
          <Head>
            <title>Submit Build</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex min-h-screen flex-row   gap-6 text-black dark:bg-gray-800 dark:text-black " >
{/* 1st Column */}

        <div className="flex flex-col items-center mt-20   ">

            <div className="text-center mb-5 ">

                <label  className="  items-center justify-center text-m font-medium text-gray-900 dark:text-white">
                        Select Leaderboard</label>

                        <select 
                        className=" min-w-[200px] text-center   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                            value={leaderboardType}  
                            onChange={(e) => setLeaderboardType(e.target.value)}
                            id="select-civ" 
                            required> 

                            <option value="rm_solo">SOLO</option>
                            <option value="qm_1v1">1v1</option>
                            <option value="qm_2v2">2v2</option>
                            <option value="qm_3v3">3v3</option>
                            <option value="qm_4v4">4v4</option>

                        </select>
            </div>
                {isLoading ? (
                    // WHILE FETCHING
                <div className="flex items-center justify-center h-64">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4c0-3.309 2.691-6 6-6z"></path>
                    </svg>
                    <span className="text-white">Loading...</span>
                </div>
                 ) : ( 
                    // AFTER FETCH
            // <div className="max-h-[35%] overflow-y-auto h-64 "> 
            <div className=""> 
                <table className="    m-10  text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className=" sticky  top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th  scope="col" className="px-6 py-3">Player Name</th>
                            <th scope="col" className="px-6 py-3">Max Rating</th>
                            <th scope="col" className="px-6 py-3">Current Rating</th>
                        </tr>
                    </thead>

                    <tbody  className="max-h-[25%] overflow-y-auto h-32">
                        {playerInfo.slice(0, 10).map((player, index) => (
                        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                        <td className="px-6 py-4">
                            <a
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => getPlayerBaseInfo(player.profile_id)}
                            >
                            {player.player_name}
                            </a>
                        </td>                           
                            <td  className="px-6 py-4" >{player.max_rating}</td>
                            <td className="px-6 py-4" >{player.current_rating}{player.profile_id}</td>
                            {/* <td className="px-6 py-4" ></td> */}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                )} 
        </div>  


{/* 2nd Column */}
        <div className="flex flex-col items-center mt-20">
            <label className="items-center justify-center text-m font-medium text-gray-900 dark:text-white">
                Player Information
            </label>
            <table className="m-10 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    Avatar
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Solo Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Win Rate
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Rank Level
                    </th>
                </tr>
                </thead>
                <tbody>
                {playerDetails.map((player) => (
                    <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 	"
                    key={player.small_avatar}
                    >
                    <td className="px-6 py-4">
                        <img src={player.small_avatar} alt="" className="h-12 w-12 rounded-2xl" />
                    </td>
                    <td className="px-6 py-4">{player.rating}</td>
                    <td className="px-6 py-4">{player.win_rate}%</td>
                    <td className="px-6 py-4">{player.rank_level}</td>
                    </tr>
                ))}

                </tbody>
            </table>

            {/* {playerDetails.map((player) => (
                    <ul
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 	"
                    key={player.small_avatar}
                    >
                    <li className="px-6 py-4">
                        <img src={player.small_avatar} alt="" className="h-12 w-12 rounded-2xl" />
                    </li>
                    <li className="px-6 py-4">{player.rating}</li>
                    <li className="px-6 py-4">{player.win_rate}%</li>
                    <li className="px-6 py-4">{player.rank_level}</li>
                    </ul>
                ))} */}


</div>
{/* 3RD Column */}
        <div className="flex flex-col items-center mt-20">
                    {/* CIV WIN RATIO INFO */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                Civilization
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                Win Rate
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {playerRM_Solo_Info.map((info, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img src={`/aoe4/${civilizationImages[info.civilization]}`} alt="" className="w-8 h-8 mr-2" />
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{info.civilization} </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{info.win_rate} %</div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
            
        </div>

    
          </main>
        </>
      );

}


export default LeaderboardPage