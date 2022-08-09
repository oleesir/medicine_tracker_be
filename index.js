if(process.env.DEV_ENV === "true") {
  require('@babel/register')({
    extensions: ['.js', '.ts']
  })
  require('./src/app')
} else {
  require('./lib/app')
}