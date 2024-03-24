
import imageMatrix from '../lib/image-encode.mjs'

console.log(process.argv[2])

const grid = new imageMatrix(process.argv[2],8)

let data = await grid.getMetaData(["width", "height"])
    // .then((data)=>{
    //     console.log(`${data.width},${data.height}`)
    //     let [w,h] = grid.getBitRatio(data.width,data.height);
    //     console.log(`\n Aspect ratio of image is: ${w}/${h}\n`)
    // })
console.log(`imageMatrix.getMetaData() function returned : ${data.width},${data.height}`)

let x = await grid.width()
let y = await grid.height()

console.log(`await width and height: ${x},${y}`)

console.log(await grid.sharp_stats())

console.log(await grid.getNetBitColor(32,[0,0]))