const Discord = require("discord.js") //모듈 불러오기
const client = new Discord.Client() //클라이언트 생성
const { token, prefix } = require("config.json") //config.json 파일에서 token과 prefix 항목만 추출

client.on("ready", () => { //ready 이벤트
    console.log(`${client.user.username} 봇에 로그인, ID: ${client.user.id}, Users: ${client.users.size}, Servers: ${client.guilds.size}`)
    client.user.setActivity({ name: `${client.users.size}명의 유저들`, type: "WATCHING" })
    
    //WATCHING = 보는 중
    //LISTENING = 듣는 중
    //STREAMING = 방송 중
    // + client.user.setActivity({ name: `${client.users.size}명의 유저들`, type: "STREAMING", url: "www.twitch.com/anonymous" })
    // + url 항목에 꼭 존재하는 링크일 필요X
    //PLAYING = 플레이 중
})

client.on("message", async message => ({ //message 이벤트
    if(message.author.bot) return; //만약 메세지를 친 유저가 봇이라면 리턴(평상시로 돌아감)
    if(message.channel.type === 'dm') return; //만약 메세지를 친 채널의 종류가 DM이라면 리턴(평상시로 돌아감)
    if(!message.content.startsWith(prefix)) return //만약 메세지가 설정한 접두사로 시작하지 않을시 리턴(평상시로 돌아감)
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g) //메세지에서 설정한 접두사의 글자수만큼 앞부분을 제거한후, 공백 제거, Array화
    const command = args.shift().toLowerCase() //Array화 된 메세지에서 첫 부분만 추출후 소문자화
    
    if(command === "ping") { //만약 그렇게 전달된 command가 ping과 일치한다면:
        let pnmsg = await message.channel.send("Calculating...") //해당 채널에 Calculating...이라는 메세지 전송할때까지 대기
        pnmsg.edit(`Pong! 메세지 핑: ${pnmsg.createdTimestamp - message.createdTimestamp}ms, 웹소켓 서버 핑: ${Math.round(client.ping)}ms`)
      
        //그 후, 수정된 메세지의 생성시간에서 명령어 생성시간을 빼서 메세지 핑을 얻은 후,
        //Math.round()로 숫자를 정수화,
        //client.ping을 전달
    }
})


client.login(token)
