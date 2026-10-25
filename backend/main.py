from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json

from market_simulator import simulator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationControl(BaseModel):
    command: str # "normal", "anomaly", "reset"

@app.post("/api/simulation/control")
async def control_simulation(control: SimulationControl):
    if control.command == "anomaly":
        simulator.set_anomaly_mode(True)
    elif control.command == "normal":
        simulator.set_anomaly_mode(False)
    elif control.command == "reset":
        simulator.set_anomaly_mode(False)
        # In a real app, clear history too
    return {"status": "ok", "mode": simulator.is_anomaly_mode}

active_connections = []

@app.websocket("/ws/market")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            # We don't really expect to receive much from the client here,
            # but we need to keep the connection open.
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)

async def broadcast_market_data():
    while True:
        if active_connections:
            data = simulator.step()
            for connection in active_connections:
                try:
                    await connection.send_json(data)
                except Exception as e:
                    print(f"Error sending to websocket: {e}")
        await asyncio.sleep(2) # Send update every 2 seconds

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_market_data())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
