
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

type TopPlayersList = {
    player_name : string;
    max_rating : number;
    current_rating : number;   
    profile_id : number;
}
type PlayerDetails = {
    player_name: string;

    small_avatar: string;
    rating: number;
    win_rate: number;
    rank_level: string;
    profile_id : number;
}


type PlayerModeStatsInfo = {
    civilization : string;
    win_rate : number;
    pick_rate : number;
    games_count : number;
}

type PlayerModesList = {
    mod_name : string,
    mod_rating : number
}

const LeaderboardPage: NextPage = () => { 
    const [topPlayersList, setTopPlayersList] = useState<TopPlayersList[]>([]);
    const [playerDetails, setPlayerDetails] = useState<PlayerDetails[]>([]);
    const [activePlayerID, setActivePlayerID] = useState<"">();

    const [playerModeStatsInfo, setPlayerModeStatsInfo] = useState<PlayerModeStatsInfo[]>([]);
    const [playerModesList, setPlayerModesListo] = useState<PlayerModesList[]>([]);
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
        'french': 'french.png',
        'ottomans': 'ottomans.png'
      };

            const fetchLeaderboard = async () => {

            const res = await fetch(`http://localhost:6969/leaderboards/${leaderboardType}`);
            const data = await (await res).json();
  
            setTopPlayersList(data);
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
                    setPlayerDetails(data.player_info);
                    setActivePlayerID(data.player_info[0].profile_id)
                    setPlayerModeStatsInfo(data.rm_solo_civs_player_info)
                    setPlayerModesListo(data.played_modes)

                  } catch (error) {
                    console.error(error);
                  }
            };

        const displayCivilizationAndWinRates = async (mod_name : string) => {

            try {
                const response = await fetch('http://localhost:6969/player/mod/info', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ "mod_name": mod_name, "profile_id" : activePlayerID })

                  
                });
                const data = await response.json();            
                setPlayerModeStatsInfo(data.player_mode_civ_winRate_stats)


              } catch (error) {
                console.error(error);
              }
        }

    useEffect(() => {

        fetchLeaderboard();
    }, [leaderboardType])

    return (
        <>
          <Head>
            <title>Leaderboard </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex min-h-screen flex-row   gap-6 text-black dark:bg-gray-800 dark:text-black " >
{/* 1st Column */}

        <div className="flex flex-col items-center mt-20   ">
        
            <div className="text-center  ">

                <label className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Leaderboards</label>

                        <select 
                        className="mt-5 min-w-[200px] text-center   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
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
                <table className="    m-10   text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className=" sticky  top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th  scope="col" className="px-6 py-3">Player Name</th>
                            <th scope="col" className="px-6 py-3">Max Rating</th>
                            <th scope="col" className="px-6 py-3">Current Rating</th>
                        </tr>
                    </thead>

                    <tbody  className="max-h-[25%] overflow-y-auto h-32">
                        {topPlayersList.slice(0, 10).map((player, index) => (
                        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                        <td className="px-6 py-4">
                            <a
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => getPlayerBaseInfo(player.profile_id)}
                            >
                            {player.player_name}
                            </a>
                        </td>                           
                            <td  className="px-6 py-4 text-center"  >{player.max_rating}</td>
                            <td className="px-6 py-4 text-center" >{player.current_rating}</td>
                            {/* <td className="px-6 py-4" ></td> */}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                )} 
        </div>  


{/* 2nd Column */}
            <div className="flex flex-col items-center mt-16  basis-1/4">


                {playerDetails.map((player) => (
                    <div className="flex mt-5 gap-6 ">
                <img src={player.small_avatar} alt="" className=" w-24 h-24	 rounded-xl" />
                <label className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"  key={player.small_avatar}>

                    {player.player_name}
                </label>
                    </div>    
                    
                    ))}

            
            <table className="mt-top-13 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className=" sticky  top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                        Mode Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mode Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                         Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {playerModesList.map((mode) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={mode.mod_name}>
                        <td className="px-6 py-4 ">{mode.mod_name}</td>
                        <td className="px-6 py-4 pl-10">{mode.mod_rating}</td>
                        <td className="px-6 py-4">
                            <a 
                                onClick={() => displayCivilizationAndWinRates(mode.mod_name)} 
                                href="#" className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Check Rating
                                {/* <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> */}
                            </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>
{/* 3RD Column */}
        <div className="flex flex-col items-center mt-20">
                    {/* CIV WIN RATIO INFO */}
                    {/* <img  src="/aoe4/dog.gif" className="object-cover w-full md:h-auto md:w-24  "  alt=""/>  */}

                    <table className=" mt-top-23 min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-hidden	">
                            <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                Civilization
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                Win Rate
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                Pick Rate
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                Games Count
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {playerModeStatsInfo.map((info, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img src={`/aoe4/${civilizationImages[info.civilization]}`} alt="" className="w-8 h-8 mr-2" />
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{info.civilization} </div>
                                </div>
                                </td>
          
                                <td className="px-8 py-4 whitespace-nowrap ">
                                <div className="text-sm text-center text-gray-500 dark:text-gray-400">{info.win_rate} %</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500 dark:text-gray-400">{info.pick_rate} %</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center text-gray-500 dark:text-gray-400">{info.games_count} </div>
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