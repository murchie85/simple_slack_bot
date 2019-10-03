const SlackBot = require('slackbots');
const axios =  require('axios');

let fs = require('fs')
let filename = "js.txt"
let content = fs.readFileSync(process.cwd() + "/" + filename).toString()


const bot = new SlackBot({
    token: content,
    name: 'butler_bot'

})


// start handler 

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':poop:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.postMessageToChannel('general', 'howdy cunts!', params);
    
});


// Error handler 

bot.on('error', (err) => console.log(err));


// Message handler (response)
bot.on('message', (data) => {
    // data object has some properties on them type
    if(data.type !== 'message') {
        return;
    }
   handleMessage(data.text); // call our function we make lower down
});


// respond to data 
function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckjoke(); // if text contains chuck norris, lets run our function chuckjoke
    } else if(message.includes(' joke')){
        hazjoke();
    }
}



// tell a chuck norris joke 
// use an external api url 
// returns a type,value object we need to dig into 
function chuckjoke(){
    axios.get('http://api.icndb.com/jokes/random')
        .then(res =>{
            const joke = res.data.value.joke;
            var params = {
                icon_emoji: ':laughing:'
            };  
            bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
        })
}

function hazjoke(){
    axios.get('https://api.jokes.one/jod')
        .then(res =>{
            // no value object this time 
            const joke = res.data.contents;
            var params = {
                icon_emoji: ':laughing:'
            };  
            bot.postMessageToChannel('general', `Ihazjoke: ${joke}`, params);
        })
}