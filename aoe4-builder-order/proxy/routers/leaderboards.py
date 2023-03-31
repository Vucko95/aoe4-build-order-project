from fastapi import APIRouter
import json
from settings.config import *
import requests
router = APIRouter()


@router.get("/leaderboards/rm_solo")
def get_best_players():
    
    
    response = requests.get(url = aoe4_leaderboards_rm_solo)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'], 'profile_id' : player['profile_id'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    return player_info


@router.get("/leaderboards/qm_1v1")
def get_best_players():
    
    response = requests.get(url = aoe4_leaderboards_qm_1v1)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'] ,'profile_id' : player['profile_id'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    return player_info

@router.get("/leaderboards/qm_2v2")
def get_best_players():
    response = requests.get(url = aoe4_leaderboards_qm_2v2)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'] , 'profile_id' : player['profile_id'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    return player_info

@router.get("/leaderboards/qm_3v3")
def get_best_players():    
    response = requests.get(url = aoe4_leaderboards_qm_3v3)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'] , 'profile_id' : player['profile_id'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    return player_info

@router.get("/leaderboards/qm_4v4")
def get_best_players():    
    response = requests.get(url = aoe4_leaderboards_qm_4v4)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'] , 'profile_id' : player['profile_id'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    return player_info