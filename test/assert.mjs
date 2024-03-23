
import imageMatrix from '../lib/image-encode.mjs'


console.log(process.argv[2])

const grid = new imageMatrix(process.argv[2],8)

//
console.log(grid.getMetaData().then(function (metadata) {console.log(metadata.width)}))
