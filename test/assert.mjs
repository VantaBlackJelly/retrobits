
import imageMatrix from '../lib/image-encode.mjs'


console.log(process.argv[2])

const grid = new imageMatrix(process.argv[2],8)

grid.getMetaData().then((data)=>{
    Object.keys(data).forEach(element => {
       console.log(data[element]) 
    });})