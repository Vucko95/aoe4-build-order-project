from fastapi import FastAPI
from routers import leaderboards


app = FastAPI()
app.include_router(leaderboards.router)

