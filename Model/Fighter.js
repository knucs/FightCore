import extra from '../Util/Extra.js'
import expose from './Expose.js'
import damage from './Damage.js'

/** Set */
const show = extra.show;
const settings = extra.settings;

export default {
    /* Figthers */ 
    name:"",
    stgs:{},
    stats:[],
    level:0,
    setStats:function(){
        this.stats = settings.getStats(this.level, this.stats);
    },
    showStats:function(){
        for (var i = 0, len = this.stats.length; i < len; i++) {
            show(" ["+this.stgs.statsLbl[i]+"] "+this.stats[i]+"");
        }

    },
    setLevel:function(newLvl){
        this.level = newLvl;
    },
    levelUp:function(){
        this.level += 1;
        this.setStats();
    },    
    config:function(stgs){
        //this.stgs = {};
        //this.stats = [];
        this.stgs = stgs;
        this.setStats();
        this.getName();
    },
    getName:function(){
        this.name = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 4);
        var firstLetter = this.name[0] || this.name.charAt(0);
        this.name = this.name.replace(/^./, firstLetter.toUpperCase());
        
    },
    getStat:function(name){
        return this.stats[this.stgs.statsLbl.indexOf(name)];
    },
    /* 
        * Actions
    /* Attack action */
    attack:function(other){

        console.log(" ["+this.name+"] (Attacks) ["+other.name+"]");

        this.showLife(other);
        let dmg = this.damage(other);

        if(dmg > 0){
            show(" ["+this.name+"] (Attack): success");
            other.stats[1] -= dmg;
        }else{
            show(" ["+this.name+"] (Attack): fail");
            this.stats[1] -= -1*dmg;
        }
        show(" ["+this.name+"] (Damage) "+ settings.fixed(dmg));

        this.showLife(other);

        show("");
        return this.isAlive(other);
    },
    showLife:function(other){
        /** Set */
        let line = "-------";
        this.stats[1] = settings.fixed(this.stats[1]);
        other.stats[1] = settings.fixed(other.stats[1]);

        show(line);
        show("["+this.name+"] (Life): "+ this.stats[1]);
        show("["+other.name+"] (Life): "+ other.stats[1]);
        show(line);

    },
    damage:function(other){

        /* Power from qualities of fighters */
        let power = [[],[]];
        /* Get figther's names */
        let names = {
            nameA: this.name,
            nameB: other.name
        };
        /* Get figjter's stats */
        let stats = {
            statsA: this.stats,
            statsB: other.stats
        };
        /* Indexes */
        var choiceA = 0;
        var maxA = 0;

        
        /*
         * Process fighters power types to determine values
         */
        power = damage.buildPower(names, stats);


        /*
         * Process qualities to determine forces
         * Check chance for maximum damage
         */
        let powers = damage.buildForces(power);

        // power.forEach(function(fighter){
        
        //     choiceA = fighter[0].choice;
        //     forceA = fighter[choiceA].force;
        //     choiceA = fighter[1].choice;
        //     var extraA = fighter[choiceA].value / (number+1);
        //     var extraNameA = settings.statsLbl[fighter[choiceA].id];
        //     choiceA = fighter[2].choice == 0 ? 3: fighter[2].choice;
        //     maxA = (choiceA * 3) == 9 ? (fighter[2].force/(number+1)): 0;  

        //     show(`[${fighter[0].name}] (uses quality ${extraNameA}) power: ${settings.fixed(extraA/2)}`);

        //     if(maxA > 0){
        //         show(`[${fighter[0].name}] (uses maximum) extra power: ${settings.fixed(maxA)}`);
        //     }
                
        //     powers.push({force:forceA,extra:extraA,max:maxA})
        // });

        /*
         * Process forces to determine damage
         */
        var forceA = powers[0].force + powers[0].extra + powers[0].max;
        var forceB = powers[1].force + powers[1].extra + powers[1].max;
        var dmg = (forceA - forceB)/2;

        /* Simplify variables */
        let forces = {
            forceA,
            forceB
        };

        /*
         * Display values
         */
        let exhibit = {
            forces,
            names,
            dmg
        }
        
        expose.displayDamage(exhibit);
        expose.displayResume(exhibit);

        return dmg;
    },

    isAlive:function(other){

        if(this.stats[1] > 0){

            if(other.stats[1] > 0){
                return true;
                
            } else {
                show('',true);
                show("»»»» We have a winner ««««\n\n["+this.name+"] [WINS] to ["+other.name+"]\n ");
                return false;
            }

        } else {
            show('',true);
            show("»»»» We have a winner ««««\n\n["+other.name+"] [WINS] to ["+this.name+"]\n ");
            return false;
        }

    },
    // Get Stat Value
    value: function(name){
        return this.stats[this.stgs.statsLbl.indexOf(name)];

    },
}