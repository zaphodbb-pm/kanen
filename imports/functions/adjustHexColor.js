/**
 * @summary Adjusts hex colour value up (to 100 percent; lighter) or down (to -100 percent; darker).
 *
 * @memberof Functions
 * @function adjustHexColor
 * @locus Client
 *
 * @param {String} color - #123456 or #789
 * @param {Number} percent - Integer: -100 <= percent <= 100
 *
 * @return {{color: string, text: string}}
 *
 */



export function adjustHexColor(color, percent) {

    let R, G, B;
    let outR, outG, outB;
    let pc = 0;
    let offset = 2;

    //** exit if color construct is not proper
    if( !color.includes("#") || ( color.length !== 7 && color.length !== 4 ) ){ return null; }

    //** accommodates shortened hex colour values
    if( color.length === 4){
        offset = 1;
    }

    //** type check and range check percent change value
    if( typeof percent === "number" ){
        pc = Math.round( percent );
    }else{
        if( typeof percent === "string" ){
            pc = parseInt( percent );
        }else{
            pc = 0;
        }
    }

    pc = pc >  100 ?  100 : pc;
    pc = pc < -100 ? -100 : pc;

    //** extract hex string fragments; convert to decimal numbers
    R = parseInt( color.substring(1,              1 + offset)    , 16);
    G = parseInt( color.substring(1 + offset,     1 + 2 * offset), 16);
    B = parseInt( color.substring(1 + 2 * offset, 1 + 3 * offset), 16);

    //** adjust fragments up or down
    R = Math.round( R * (100 + pc) / 100);
    G = Math.round( G * (100 + pc) / 100);
    B = Math.round( B * (100 + pc) / 100);

    //** clamp values into valid rgb range
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    //** get best contrast colour for text
    let yiq = Math.round( ( (R * 299) + (G * 587) + ( B * 114) ) / 1000 );
    yiq = (yiq >= 128) ? "#000000" : "#FFFFFF" ;

    //** convert back into hex values and return adjusted colour setting
    outR = ( (R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16) );
    outG = ( (G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16) );
    outB = ( (B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16) );

    return {
        color:  "#" + outR + outG + outB,
        text:   yiq,
    }
}
