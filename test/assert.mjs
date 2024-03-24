
import imageMatrix from '../lib/image-encode.mjs'


console.log(process.argv[2])

const grid = new imageMatrix(process.argv[2],8)

grid.getMetaData(["width","height","depth","peepee"],true)
    .then((data)=>{console.log(data)})