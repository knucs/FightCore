import extra from '../Util/Extra.js'
import expose from '../Model/Expose.js'
import fighter from '../Model/Fighter.js'

/** Set */
const show = extra.show;
const clone = extra.clone;
const settings = extra.settings;


export default class FightCtrl {
    /** Properties */
    constructor () {
        this.fighters = [];
    }

    /* 
    * Set Fighter
    */
    createFighter(){
        let fighters = [];
        let x = 0;
        show("",true);
        show(`»»»» Fighters introduction ««««\n`);
        for (x = 0; x < settings.quantity; x++) {
            fighters[x] = clone(fighter);
            fighters[x].config(settings);
            fighters[x].levelUp();
            fighters[x].setStats();

            show(`-------------------\n»» Fighter (${(x+1)}) ««\n [Name] ${fighters[x].name}`);
            fighters[x].showStats();
            show(" ");
        }
        this.fighters = fighters;
    }
    
    /* 
     * Prediction for only 2 fighters
     */
    getPrediction(){
        settings.prediction(this.fighters);
    }

    /* 
     * Iniciative for only 2 fighters
     */
    getIniciative(){
        this.fighters = settings.getIniciative(this.fighters[0],this.fighters[1]);
    }


    /* 
     * The main arena fight
     */
    arenaFight(){
        /** Set */
        let attack = true;
        let inc = 1;
        let line = "---------------------------------------------------";
        let end = "»»»» End of the fight ««««";

        /** Actions */
        while(attack){
 
            /** Attack from fighter 1 */
            expose.displayRound(inc);
            attack = this.fighters[0].attack(this.fighters[1]);
            
            /** Attack from fighter 2 */
            if(attack){
                expose.displayRound(inc++);
                attack = this.fighters[1].attack(this.fighters[0]);
            }


            if(!attack)
                show('', true);
        }
    }
}