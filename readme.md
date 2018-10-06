# pogocard

Pass in all your stat values to generate a card (png)

Example:
https://ifws1y93uf.execute-api.us-east-1.amazonaws.com/dev/profile-card?tn=readonlychild&team=valor&slogan=United%20States%20-%20Illinois&xp=15095000&jogger=1499.3&kanto=150&collector=24397&scientist=1767&breeder=542&backpacker=17280&battlegirl=3496&pikachufan=331&johto=97&berrymaster=8762&gymleader=12330&hoenn=115&ranger=1236&fisherman=94&acetrainer=173&youngster=158&battlelegend=198&pilot=343176&unown=6&champion=90&gentleman=68&idol=0&schoolkid=8025&blackbelt=1011&birdkeeper=5490&punkgirl=4463&ruinmaniac=1346&hiker=1811&bugcatcher=3325&hexmaniac=620&depotagent=566&kindler=1047&swimmer=4568&gardener=2787&rocker=1093&psychic=1495&skier=641&dragontamer=207&delinquent=1145&fairytalegirl=571&gymbadges=200&goldgyms=14&threekplus=19&threekplus4=7&hundosunique=91&shiniesunique=40&luckiesunique=4

## Tech

### Serverless AWS lambda

(https://serverless.com)
This was deployed using version 1.8.0.
It's been a while since I've upgraded to the latest

### Imagemagick

What comes pre-installed in the lambda Node image.

### Node.js on AWS lambda

version 8.10

## Setup

npm install

### Dependencies npm packages

`base-64` `shortid`

## Deploy to AWS

### Initial

`sls deploy`

Sets up the lambda function and the apiGateway public endpoint.

### Api Gateway modifications

Api Gateway needs setup to know to respond with binary data.

Go to the API, click on `Settings`, then add a new **Binary Media Type** and set it to `*/*`

When I troubleshooted this, my first attempt was `image/png`, but only `*/*` seemed to work.


### For changes (in code)

`sls deploy function --function profile`

Deploys only the function, much quicker

## Notes

For a faster image, give the lambda more RAM.

In file `serverless.yml`, change `provider.memorySize` to better value.

Your AWS credentials should be in file `<user-folder/.aws/credentials`

`serverless.yml` is pointing to section `personal-dev` inside that file.

