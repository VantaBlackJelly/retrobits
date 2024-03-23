
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
            let dims = {
                "width":Number,
                "height":Number,
                "resUnit":""
            };
            
            await sharp(process.argv[2])
                    .metadata()
                    .then(function (metadata) {
                        dims["width"] = metadata.width,
                        dims["height"] = metadata.height,
                        dims["resUnit"] = metadata.resolutionUnit})
           return dims
        }
        catch(err){
            console.log(err)
            }
        }
        
    }
