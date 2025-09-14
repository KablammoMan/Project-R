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
        jr = json.loads(response.content.decode())
        # print(jr)
        if jr["pos"] != [-1, -1]:
            pyautogui.moveTo(SCREEN_SIZE[0]*jr["pos"][0], SCREEN_SIZE[1]*jr["pos"][1])
        if jr["down"] == 0:
            pyautogui.mouseUp()
        if jr["down"] == 1:
            pyautogui.mouseDown()
        if jr["down"] == 2:
            pyautogui.click()
        pyautogui.scroll(jr["scroll"])
    except Exception as e:
        pass