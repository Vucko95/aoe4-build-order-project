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
    small_avatar = mfker_info['avatars']['small']
    rating = mfker_info['modes'].get('rm_solo', {}).get('rating', 'None')
    win_rate = mfker_info['modes'].get('rm_solo', {}).get('win_rate', 'None')
    rank_level = mfker_info['modes'].get('rm_solo', {}).get('rank_level', 'None')

    player_info = []
    player = {
        "small_avatar": small_avatar,
        "rating": rating,
        "win_rate": win_rate,
        "rank_level": rank_level}
    player_info.append(player)



    # RM SOLO PLAYER INFO EACH CIV WIN RATE
    rm_solo_civs_stats = mfker_info['modes']['rm_solo']['civilizations']
    rm_solo_civs_player_info = []
    for one_civilization in rm_solo_civs_stats:
        print(one_civilization['civilization'])
        win_rate = "{:.1f}".format(one_civilization['win_rate'])

        rm_solo_civilization_information = {
            'civilization' : one_civilization['civilization'],
            'win_rate' : win_rate,
        }
        rm_solo_civs_player_info.append(rm_solo_civilization_information)
    print(rm_solo_civs_player_info)
    # return player_info
    return {"player_info": player_info, "rm_solo_civs_player_info": rm_solo_civs_player_info}

    # return response
    # return profile_id