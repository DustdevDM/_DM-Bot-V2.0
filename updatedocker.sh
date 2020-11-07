git fetch
git pull
docker build -t dustin/dm-bot .
docker rm --force DM-Twitch-Bot
docker run -d --restart always --cap-add=SYS_ADMIN --name DM-Twitch-Bot -p 6787:6787 dustin/bot
