from fastapi import FastAPI
from routers import leaderboards, players
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)






app.include_router(leaderboards.router)
app.include_router(players.router)

