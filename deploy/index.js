var spawn = require('child_process').spawn

function rumCommand( cmd, args, cwd, callback ) {
  var child = spawn( cmd, args, {cwd: cwd} )
  var response = ''
  child.stdout.on('data', function( buffer ){ response += buffer.toString(); })
  child.stdout.on('end', function(){ callback( response ) })
}

function init() {
  rumCommand('sh', ['../server/autoServer.sh'], '../server' ,function( result ) { // 执行 脚本文件
    console.log(result)
  })
  
  rumCommand('sh', ['../client/autoClient.sh'], '../client' ,function( result ) { // 执行 脚本文件
    console.log(result)
  })

}
init()