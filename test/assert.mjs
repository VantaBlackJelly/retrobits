
import imageMatrix from '../lib/image-encode.mjs'

console.log(process.argv[2])

const grid = new imageMatrix(process.argv[2],8)

grid.getMetaData(["width", "height"],true)
    .then((data)=>{
        let [w,h] = grid.getBitRatio(data["width"],data["height"]);
        console.log(`\n Aspect ratio of image is: ${w}/${h}\n`)
    })
