import extra from '../Util/Extra.js'
import msg from '../Util/Message.js'

/** Set */
const show = extra.show;
const settings = extra.settings;
const weapons = msg.weapons;

export default {
    /* Figthers */ 
    displayDamage(exhibit){

        /* Display damage */
        const max = 10;
        let power = (exhibit.forces.forceA * max)/(exhibit.forces.forceA + exhibit.forces.forceB);
        let display = "";
        let isSuccess = exhibit.dmg > 0;
        
        /** Action */
        display += isSuccess ? "[+]":"[-]";

        for (let index = 0; index < max; index++) {
            if(Math.trunc(power) == index)
                display += "|";

            else if(power > index)
                display += "»»";

            else
                display += "««";
        }
        display += isSuccess ? "[-]":"[+]";

        show(`\n [${exhibit.names.nameA}] ${display} [${exhibit.names.nameB}] \n`);

    },
    displayResume(exhibit){

        /* Display damage */
        const max = 10;
        const min = 0;
        let power = (exhibit.forceA * max)/(exhibit.forceA + exhibit.forceB);
        let display = "";
        let isSuccess = exhibit.dmg > 0;
        let index = Math.floor(Math.random () * (max - min) + min);

        if(msg.resume[index][1] == 2){
            show(` (${exhibit.names.nameA} ${msg.resume[index][0]} ${exhibit.names.nameB})`);

        } else if(msg.resume[index][1] == 1) {
            show(` (${exhibit.names.nameA} ${msg.resume[index][0]})`);
        }

    },
    displayRound(inc){

        /* Display damage */
        let line = "---------------------------------------------------";

        /* Get random weapon */
        // const max = 8;
        // const min = 0;          
        // let index = Math.floor(Math.random () * (max - min) + min);
        // let display = weapons[index][0].replace(/[r]+/g, inc);
        
        /* Display */
        show(line);
        show(` ROUND (${inc}) `);
        show(line);
    }

}