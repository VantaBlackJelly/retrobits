
import { SVGPathElement, createSVGWindow } from 'svgdom'
import { SVG, registerWindow } from '@svgdotjs/svg.js'

import imageMatrix from '../lib/image-encode.mjs'

console.log(process.argv[2])

const grid = new imageMatrix(process.argv[2],32)

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

//show sharp stats for whole image before processing
console.log(await grid.sharp_stats())

//return array of mean color channel quantity per given piremeters and start points
console.log(await grid.getNetBitColor(32,[0,0]))

//get object{'0':array[]} data structure indcating color data for whole of the given image and bit count
console.log(await grid.getBitSvgMatrixData(grid.getBitRatio(x,y)))

// const svg_string = async () => {
//     const ratio = grid.getBitRatio(x,y)
//     const matrix_data = await grid.getBitSvgMatrixData(ratio)
//     const bit_width = grid.getBitDims(await grid.width(),ratio[1])

//     // returns a window with a document and an svg root node
//     const window = createSVGWindow()
//     const document = window.document

//     // register window and document
//     registerWindow(window, document)

//     // create canvas
//     const canvas = SVG(document.documentElement)

//     for(let i=0;i < grid.bits;i++){
//         for(let e=0;e < matrix_data[i].length;e++){
        
//             let rect = canvas.rect(bit_width,bit_width)
//             rect.fill(new SVG.Color(`rgb(${channel[0]}, ${channel[1]}, ${channel[2]})`)).move()

            
        
        
//     }
//     }}

// console.log(await svg_string())
console.log("<svg>"+await grid.getBitSvgMatrixString(grid.getBitRatio(x,y))+"</svg>")