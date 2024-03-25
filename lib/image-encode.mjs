
import { SVGPathElement, createSVGWindow } from 'svgdom'
import { SVG, registerWindow } from '@svgdotjs/svg.js'
import sharp from 'sharp';

//function: Take image file as argument, parse into grid of squares,
//          match the nearest aspect ratio of image that can divide the
//          image equally into the number of sections defined by the 'bit' argument

export default class imageMatrix {

    constructor(image,bits = 8){

        this.image = image
        this.sharp_stats = async () => {return await sharp(this.image).stats().then((image)=>{return image})}
        this.channels = async () => {return await sharp(this.image).stats().then((image)=>{return image.channels})}
        this.channels_count = async () => {return await sharp(this.image).metadata().then((metadata)=>{return metadata.channels})}
        this.bits = parseInt(bits);
        // Consider converting all immediate metadata to below form factor, access with await this.(metadata_name)()
        this.width = async () =>{return await sharp(this.image).metadata().then((metadata)=>{return metadata.width})}
        this.height = async () =>{return await sharp(this.image).metadata().then((metadata)=>{return metadata.height})} 
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

    getBitRatio(width,height,round_nearest=true){

        try{
            const per = parseInt(width) / parseInt(height);
            
            if(round_nearest)
            {
                return [(per*this.bits).toFixed(0),this.bits]
            }else{
               return [(per*this.bits),this.bits]
            }
            
        }
        catch(err){
            console.log(err)
        }

    }
    
    getBitDims(dividend,divisor)
    {
        return Math.floor(dividend/divisor) 
    }

    async getNetBitColor(bit_size,[bit_left,bit_top])
    {
        const section_area = await sharp(this.image)
                                        .extract({ left: bit_left, top: bit_top, width: bit_size, height: bit_size })
                                        .toBuffer()
                                        
        const section_color_values = await sharp(section_area)                                        
                                            .stats()
                                            .then((section) => {
                                                let channel_set = [];
                                                section.channels.forEach(channel => {

                                                    channel_set.push(parseInt(channel.mean.toFixed(0)))
                                                    
                                                });
                                                return channel_set;
                                            })

        return section_color_values
                                
    }

    async getBitSvgMatrixData([ratio_width, ratio_height])
    {

            let matrix = {}
            let start_x = 0;
            let start_y = 0;

            const bit_width = this.getBitDims(await this.width(),ratio_width)

            for(let i=0;i < ratio_height;i++){
                matrix[i] = []
                for(let e=0;e < ratio_width;e++){
                    {let bit = await this.getNetBitColor(bit_width,[start_x,start_y])

                        matrix[i].push(bit)

                        start_x=start_x+bit_width
                        console.log(start_x)}
                }
                start_y=start_y+bit_width
                start_x=0

            }

            return matrix

    } 
    
    async getBitSvgMatrixString([ratio_width, ratio_height])
    {

            let matrix = {}
            let start_x = 0;
            let start_y = 0;

            //returns a window with a document and an svg root node
            const window = createSVGWindow()
            const document = window.document

            // register window and document
            registerWindow(window, document)

            // create canvas
            const canvas = SVG(document.documentElement)
            const group = canvas.group()

            const bit_width = this.getBitDims(await this.width(),ratio_width)

            for(let i=0;i < ratio_height;i++){
                matrix[i] = []
                for(let e=0;e < ratio_width;e++){
                    {let bit = await this.getNetBitColor(bit_width,[start_x,start_y])

                        let rect = canvas.rect(bit_width,bit_width)
                        rect
                            .fill((`rgb(${bit[0]}, ${bit[1]}, ${bit[2]})`))
                            .move(start_x,start_y)
                            
                        group.add(rect)

                        start_x=start_x+bit_width
                    //    console.log(start_x)
                    }
                }
                start_y=start_y+bit_width
                start_x=0

            }

            return group.svg()

    }
        
    }
