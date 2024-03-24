
import { createSVGWindow } from 'svgdom'
import { SVG, registerWindow } from '@svgdotjs/svg.js'
import sharp from 'sharp';

//function: Take image file as argument, parse into grid of squares,
//          match the nearest aspect ratio of image that can divide the
//          image equally into the number of sections defined by the 'bit' argument

export default class imageMatrix {

    constructor(image,bits = 8){

        this.image = image;
        this.bits = parseInt(bits);
        //this.test=this.getBitRatio(5,5)   <----Replace with this.
    }

    //Returns promise that uses the .then() syntax to retrieve and extend use of parameterized image metadata returned to by the sharp object
    async getMetaData(metadata_keys=[],get_undefined=false) {
        try{
            let dims = {};
            await sharp(this.image)
                    .metadata()
                    .then((metadata) => {
                        
                        metadata_keys//get all keys from the argument and add them and their matching value to output object
                        .forEach(key => {
                            
                            if(typeof metadata[String(key)] !== 'undefined' || get_undefined){
                                dims[String(key)] = metadata[String(key)]
                            }
                            else{
                                throw "\n key defined in 'metadata_keys' array not defined in Sharp() metadata object,"+
                                 "set 'get_undefined' to true force definition of undefined key-value pair\n"
                            }                                                         

                        })

                    })
                    .catch((err)=>{throw new Error(err)})

           return dims
        }
        catch(err){
            console.log(err)
            }
        }

    getBitRatio(width,height){

        try{
            const per = parseInt(width) / parseInt(height);
            
            return [(per*this.bits).toFixed(0),this.bits]
        }
        catch(err){
            console.log(err)
        }

    }
        
    }
