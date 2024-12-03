@echo off
setlocal enabledelayedexpansion

:: URL of the Node.js server you want to stress test
set URL=http://localhost:8080/preferences/send-notification

:: Authorization Token
set AUTH_TOKEN=Bearer onlyvim2024

:: Number of requests to send
set REQUESTS=1000

:: Loop to send requests
for /L %%i in (1,1,%REQUESTS%) do (
  echo Sending request #%%i
  curl --location "!URL!" ^
    --header "Authorization: !AUTH_TOKEN!" ^
    --header "Content-Type: application/json" ^
    --data "{ \"userId\": 1, \"message\": \"Hello, this is a notification!\" }" ^
    -s -o nul -w "%%{http_code}\n"
)

echo Stress testing completed.
pause
