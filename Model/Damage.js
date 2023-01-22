import extra from '../Util/Extra.js'
import msg from '../Util/Message.js'

/** Set */
const show = extra.show;
const settings = extra.settings;

export default {
    /*
     * Process fighters qualities types to determine values
     */
    buildPower(names, stats){
        /*
         * Set values
         */        
        let type = [
            "strength",
            "dexterity",
            "intelligence"
        ];
        let number = parseInt(type.length);

        /* qualities of fighters */
        let power = [[],[]];
        let sumA = 0;
        let sumB = 0;
        let qualitiyObjA = {};
        let qualitiyObjB = {};

        /* Indexes */
        var incl = 0;
        var qualitiyIdx = 0;
        var qualityA = 0;
        var qualityB = 0;
        var choiceA = 0;
        var choiceB = 0;

        /* Process */
        for(incl = 0; incl<number; incl++){     
            
            /* Select stat */
            qualitiyIdx = settings.statsLbl.indexOf(type[incl]);
            qualityA = parseFloat(stats.statsA[qualitiyIdx]);
            qualityB = parseFloat(stats.statsB[qualitiyIdx]);
            
            /* Calc for force */
            sumA += qualityA / number;
            sumB += qualityB / number;

            /** Random stats choice for force */
            choiceA = Math.floor(Math.random()*number);
            choiceB = Math.floor(Math.random()*number);

            qualitiyObjA = {
                value:qualityA, 
                id:qualitiyIdx, 
                force: sumA, 
                choice:choiceA,
                name:names.nameA                
            };
            qualitiyObjB = {
                value:qualityB, 
                id:qualitiyIdx, 
                force: sumB,
                choice:choiceB,
                name:names.nameB
            };
            
            /* Build qualities for force*/
            power[0].push(qualitiyObjA);
            power[1].push(qualitiyObjB);

            /* Random Choices */

        }

        return power;
    },
    /*
     * Process qualities to determine forces
     * Check chance for maximum damage
     */
    buildForces(power){
        /* Result forces */
        var powers = [];
         var force;

        /** Choices */
        var choice;

        /* Figters/qualities used */
        let number = 2;
        let max = 0;

        power.forEach(function(fighter){
            /* Set quality force from choice */
            choice = fighter[0].choice;
            force = fighter[choice].force;

            /* Check quality force from choice */
            var extra = fighter[choice].value / (number+1);
            var extraName = settings.statsLbl[fighter[choice].id];
            
            /* Display quality force from choice */
            show(`[${fighter[0].name}] (uses quality ${extraName}) power: ${settings.fixed(extra/2)}`);

            /* Check for maximum force by random*/
            choice = fighter[2].choice == 0 ? 3: fighter[2].choice;
            max = (choice * 3) == 9 ? (fighter[2].force/(number+1)): 0;  

            /* Display maximum force by random*/
            if(max > 0)
                show(`[${fighter[0].name}] (uses maximum) extra power: ${settings.fixed(max)}`);
            
            /** Powers result */                
            powers.push({ force:force, extra:extra, max:max })
        });

        return powers;
    }
}