from fastapi import APIRouter
import json
from settings.config import *
import requests
router = APIRouter()


@router.get("/players")
def get_best_players():
    
    
    response = requests.get(url = aoe4_players_base)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    return player_info



@router.get("/players/number")
def get_best_players():
    
    
    response = requests.get(url = aoe4_players_base_example)
    aoe4_players_base_example_json = json.loads(response.content) 
    mfker_info = aoe4_players_base_example_json
    # for player in best_mfkers:
    #     player_info.append({'player_name': player['name'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    # return player_info

# BASE INFO
    small_avatar = mfker_info['avatars']['small']
    rating = mfker_info['modes']['rm_solo']['rating']
    win_rate = mfker_info['modes']['rm_solo']['win_rate']
    rank_level = mfker_info['modes']['rm_solo']['rank_level']

# RM SOLO PLAYER INFO EACH CIV WIN RATE
    rm_solo_civs_stats = mfker_info['modes']['rm_solo']['civilizations']
    rm_solo_civs_player_info = []
    for one_civilization in rm_solo_civs_stats:
        print(one_civilization['civilization'])
        rm_solo_civilization_information = {
            'civilization' : one_civilization['civilization'],
            'win_rate' : one_civilization['win_rate'],
        }
        rm_solo_civs_player_info.append(rm_solo_civilization_information)
    print(rm_solo_civs_player_info)



    userPlayedModes = mfker_info['modes']
    playedModeInfo = []
    for mod, ratings in userPlayedModes.items():
        playedModeInfo.append({"mod_name": mod, "mod_rating": ratings["rating"]})

#   Player BASE RESPONSE
    player_info = []
    player = {
    "small_avatar": small_avatar,
    "rating": rating,
    "win_rate": win_rate,
    "rank_level": rank_level
}
    player_info.append(player)
    return player_info

@router.post("/player/info")
# def get_base_player_info(profile_id: int):
def get_base_player_info(data: dict):
    profile_id = data['profile_id']
    aoe4_player_info = f"{aoe4_players_base}{profile_id}"
    response = requests.get(url = aoe4_player_info)
    response_json = json.loads(response.content) 
    mfker_info =response_json
    player_name = mfker_info['name']
    small_avatar = mfker_info['avatars']['full']
    rating = mfker_info['modes'].get('rm_solo', {}).get('rating', 'None')
    win_rate = mfker_info['modes'].get('rm_solo', {}).get('win_rate', 'None')
    rank_level = mfker_info['modes'].get('rm_solo', {}).get('rank_level', 'None')

    player_info = []
    player = {
        "player_name" : player_name,
        "small_avatar": small_avatar,
        "rating": rating,
        "win_rate": win_rate,
        "rank_level": rank_level,
        "profile_id" : profile_id
            }
    player_info.append(player)



    # RM SOLO PLAYER INFO EACH CIV WIN RATE
    rm_solo_civs_stats = mfker_info['modes']['rm_solo']['civilizations']
    rm_solo_civs_player_info = []
    for one_civilization in rm_solo_civs_stats:
        # print(one_civilization['civilization'])
        win_rate = "{:.1f}".format(one_civilization['win_rate'])

        rm_solo_civilization_information = {
            'civilization' : one_civilization['civilization'],
            'win_rate' : win_rate,
        }
        rm_solo_civs_player_info.append(rm_solo_civilization_information)


    ## MODES 


    userPlayedModes = mfker_info['modes']
    playedModeInfo = []
    for mod, ratings in userPlayedModes.items():
        playedModeInfo.append({"mod_name": mod, "mod_rating": ratings["rating"]})
    modes_to_remove = ['rm_1v1_elo', 'rm_2v2_elo', 'rm_3v3_elo', 'rm_4v4_elo']
    playedModeInfo = [mode for mode in playedModeInfo if mode['mod_name'] not in modes_to_remove]
    # print(playedModeInfo)
    # print(rm_solo_civs_player_info)
    # return player_info
    return {"player_info": player_info, "rm_solo_civs_player_info": rm_solo_civs_player_info , "played_modes" : playedModeInfo}

    # return response
    # return profile_id
    # const [playerRM_Solo_Info, setPlayerRM_Solo_Info] = useState<PlayerRM_Solo_Info[]>([]);

    # const [playerModeStatsInfo, setPlayerModeStatsInfo] = useState<PlayerModeStatsInfo[]>([]);



@router.post("/player/mod/info")
# def get_base_player_info(profile_id: int):
def get_base_player_info(data: dict):
    mod_name = data['mod_name']
    profile_id = data['profile_id']
    # aoe4_player_info = f"{aoe4_players_base}{profile_id}"
    # response = requests.get(url = aoe4_player_info)
    # response_json = json.loads(response.content) 
    # mfker_info =response_json
    # print(mod_name)
    # print(profile_id)
    # print(profile_id)
    aoe4_player_info = f"{aoe4_players_base}{profile_id}"
    response = requests.get(url = aoe4_player_info)
    mfker_info = json.loads(response.content) 
    mode_info = mfker_info['modes'][mod_name]['civilizations']
    player_mode_civ_winRate_stats = []
    for one_civilization in mode_info:
        print(one_civilization['civilization'])
        rm_solo_civilization_information = {
            'civilization' : one_civilization['civilization'],
            'win_rate' : one_civilization['win_rate'],
        }
        player_mode_civ_winRate_stats.append(rm_solo_civilization_information)
    # print(player_mode_civ_winRate_stats)
    print(player_mode_civ_winRate_stats)
    return { "player_mode_civ_winRate_stats": player_mode_civ_winRate_stats }

    # get_scors = requests.get()
    # rm_solo_civs_stats = mfker_info['modes']['rm_solo']['civilizations']
    # rm_solo_civs_player_info = []
    # for one_civilization in rm_solo_civs_stats:
    #     print(one_civilization['civilization'])
    #     rm_solo_civilization_information = {
    #         'civilization' : one_civilization['civilization'],
    #         'win_rate' : one_civilization['win_rate'],
    #     }
    #     rm_solo_civs_player_info.append(rm_solo_civilization_information)
    # print(rm_solo_civs_player_info)