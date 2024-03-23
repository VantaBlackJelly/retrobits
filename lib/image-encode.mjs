
import { createSVGWindow } from 'svgdom'
import { SVG, registerWindow } from '@svgdotjs/svg.js'
import sharp from 'sharp';

//function: Take image file as argument, parse into grid of squares,
//          match the nearest aspect ratio of image that can divide the
//          image equally into the number of sections defined by the 'bit' argument

export default class imageMatrix {

    constructor(image,bits = 8){

        this.image = image;
        this.bits = bits;
    }

    //Returns promise that 
    async getMetaData() {
        try{
            let img = await sharp(process.argv[2]).metadata();
            return img
        }
        catch(err){
            console.log(err)
            }
        }
        
    }
