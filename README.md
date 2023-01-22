# FightCore
FightCore is a simple fight engine.
<br><br>
This application allows the creation of fighters, with random attributes.<br>
It also allows these fighters to attack each other.<br>
Allows you to predict who can win the fight and in how many rounds.<br>
All movements can be displayed in console.<br>

<br>

## Installation
- Install FightCore

        npm i fight-core

## Example
- A sample of how FightCore can be used

        import FightCtrl from "fight-core";

        /** Set */
        const fightCtrl = new FightCtrl();

        /** Set Fighter  */
        fightCtrl.createFighter();

        /** Prediction for only 2 fighters */
        fightCtrl.getPrediction();

        /** Iniciative for only 2 fighters */
        fightCtrl.getIniciative();

        /** The main arena fight */
        fightCtrl.arenaFight();
<br>
