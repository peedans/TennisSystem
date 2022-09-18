const recordedGame = ['Lisa', 'Lisa', 'Jennie', 'Lisa', 'Lisa', 'Lisa', 'Jennie', 'Lisa', 'Lisa', 'Jennie', 'Lisa', 'Lisa', 'Jennie', 'Lisa', 'Jennie', 'Jennie', 'Lisa', 'Jennie', 'Jennie', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa', 'Lisa'];


let deuce = {};
let playersWin = {};
let scores = {};

let getNames

let round = 1;

let playerServe = '';

let gamesRecords = [];

const createPlayers = (recGame) =>{
    getNames = [...new Set(recGame)]
    for(let key of getNames){
        deuce[key] = 0
        playersWin[key] = 0
        scores[key] = 0
    }
}

const getWin = (name) =>{
    if(name === getNames[0]){
        playersWin[name]++;
    }else{
        playersWin[name]++;
    }
    gamesRecords[round - 1].unshift(`${playerServe} Serve ${playersWin[getNames[0]]} - ${playersWin[getNames[1]]}`)
    scores[getNames[0]] = 0;
    scores[getNames[1]] = 0;
    round++;
}

const getResult = (playerName) =>{
    for (let name of playerName ) {
        if (round % 2 === 0) {
            playerServe = getNames[1];
        } else {
            playerServe = getNames[0];
        }
        if(scores[getNames[0]] === 40 && scores[getNames[1]] === 40){
            if(deuce[name] === 1){
                getWin(name);
            } else {
                if(name === getNames[0]){
                    gamesRecords[round - 1][0].push(`A:${scores[getNames[1]]}`);
                } else {
                    gamesRecords[round - 1][0].push(`${scores[getNames[0]]}:A`);
                }
                deuce[name]++;
            }
            continue;
        } else if (scores[name] === 40) {
            getWin(name)
            continue;
        } else if (scores[name] === 30) {
            scores[name] += 10
        } else {
            scores[name] += 15
        }
        if(round === 7){
            if(scores[getNames[0]] === 40){
                gamesRecords[round - 1][0].push(`${scores[getNames[0]]}:${scores[getNames[1]]}SP`);
                continue;
            }
            if(scores[getNames[1]] === 40){
                gamesRecords[round - 1][0].push(`${scores[getNames[0]]}SP:${scores[getNames[1]]}`);
                continue;
            }
        }
        if(gamesRecords.length < round){
            gamesRecords.push([[]]);
        }
        gamesRecords[round - 1][0].push(`${scores[getNames[0]]}${playerServe === getNames[0] && scores[getNames[1]] ===40 ? "BP" : ""} : ${scores[getNames[1]]}${playerServe === getNames[1] && scores[getNames[0]] ===40 ? "BP" : ""} `)

    }
}


const readGameRecord = (gameRec) =>{
    createPlayers(gameRec);
    getResult(gameRec)
    return gamesRecords;
}
let result = readGameRecord(recordedGame)
for(let r = 0; r < result.length; r++){
    console.log(`${gamesRecords[r][0]}\n${gamesRecords[r][1].join(',').replace(/,/g, ', ')}${r === result.length - 1 ? '' : '\n'}`);
}

