export default {
    /* Settings */
    settings: {
        quantity: 2,
        flag: {
            atack: true,
        },
        statsLbl: ['strength', 'health', 'speed', 'dexterity', 'intelligence'],
        levelRND: function (min, max) {
            let value = Math.random () * (max - min) + min;
            let str = value.toString ().split ('.')[1].substring (0, 4);
            return parseFloat (value.toString ().split ('.')[0] + '.' + str);
        },
        getStats: function (lvl, fStats) {
            return this.helper (lvl, fStats);
        },
        helper: function (lvl, fStats) {
            let arr = [];
            if (lvl == 0) {
                for (var i = 0, len = this.statsLbl.length; i < len; i++) {
                arr[i] = 1;
                }
            } else {
                for (var i = 0, len = this.statsLbl.length; i < len; i++) {
                let qlty = this.levelRND (fStats[i], fStats[i] + 2);
                arr[i] = i == 1 ? qlty : qlty;
                }
            }
            return arr;
        },
        fixed: function (toBeFixed) {
            return parseFloat (toBeFixed).toFixed (4);
        },
        /* get Iniciative */
        getIniciative: function (fthA, fthB) {
            let fthIni = [];
            if (fthA.value ('speed') > fthB.value ('speed')) {
                fthIni = [fthA, fthB];
            } else {
                fthIni = [fthB, fthA];
            }
            this.show("",true);
            this.show('»»»» INICIATIVE ««««\n\nFirst to attack [' + fthIni[0].name + ']\n');
            return fthIni;
        },
        prediction: function (ftgrs) {
            let pred = [];
            ftgrs.forEach (function (fighterX) {
                let statsSum = 0;
                fighterX.stats.forEach (function (statX) {
                    statsSum += statX;
                });
                pred.push (statsSum);
            });
            var predX = pred[0] > pred[1] ? 0 : 1;
            var predY = parseInt (pred[0] - pred[1]);
            predY = predY < 0 ? -1 * predY : predY == 0 ? 1 : predY;

            this.show("",true);
            this.show('»»»» PREDICTION: ««««\n');
            this.show('Possible winner [' + ftgrs[predX].name + ']');
            this.show('Number of rounds (' + predY + ')');
            this.show('');
        },
        /** Utilities fix*/
        show: function(s, flag = false){
            if(flag)
                console.log("═════════════════════════════════════════════════════════════════");
            else
                console.log(s);
        },
    },
    /** Utilities */
    show: function(s = "", flag = false){
        if(flag)
            console.log("═════════════════════════════════════════════════════════════════");
        else
            console.log(s);
    },
    clone: function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },
};
