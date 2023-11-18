
const fs = require('fs/promises')
const sharp = require('sharp')

async function start(){

  const DIRNAME = __dirname + '/../public/images'
  const images = await fs.readdir(DIRNAME)
  const pngs = images.filter(v => v.match(/\.png/))
  
  await pngs.reduce((a,b) => {
  
    // @ts-ignore
    a = a.then(async v => {
      console.log(b)
      return Promise.all([

        sharp(DIRNAME + '/' + b)
          .resize({
            width: 1200
          })
          .webp({
            quality: 80,
            nearLossless: true,
            smartSubsample: true
          })
          .toFile(
            __dirname + '/' + b.replace(/\.png/,'.webp')
          ),
        
        sharp(DIRNAME + '/' + b)
          .resize({
            width: 600
          })
          .webp({
            quality: 80,
            nearLossless: true,
            smartSubsample: true
          })
          .toFile(
            __dirname + '/' + b.replace(/\.png/,'-600.webp')
          ),


      ])
      
    })
  
    return a
  
  },Promise.resolve(1))
}

start()
