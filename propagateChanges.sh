#!/bin/bash

npm run build && rm -rf backend/client/* && mv build/* backend/client/
git add --all
git commit -m "new build"
git push
ssh -i /Users/Kenny/.ssh/id_rsa kenny@104.196.224.131 'cd /var/www/html/startup-tracker/ && sudo git pull && pm2 restart 1'