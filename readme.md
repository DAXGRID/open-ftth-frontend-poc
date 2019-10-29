## Open FTTH

Currently running at http://157.245.236.177.

## Deploy to Production

```
cd /var/www/open-ftth-frontend
git pull 
pm2 restart 0
````

## Other server commands

```
pm2 start npm -- start
```

This is running the development version. Ideally, once `npm run build` can actually complete on the server (probably needs more memory) we will run:

```
pm2 start app.config.json
```