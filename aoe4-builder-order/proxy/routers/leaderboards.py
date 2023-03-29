from fastapi import APIRouter
import json
from settings.config import *
import requests
router = APIRouter()



@router.get("/example")
def get_best_players():
    
    response = requests.get(url = aoe4_leaderboards_rm_solo)
    leaderboard_list_json = json.loads(response.content) 
    best_mfkers = leaderboard_list_json['players']
    player_info = []
    for player in best_mfkers:
        player_info.append({'player_name': player['name'] , 'max_rating': player['max_rating'], 'current_rating' : player['rating']})
    # print(player_info)
    return player_info