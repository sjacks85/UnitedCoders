// JavaScript source code

class GameSpace {
    constructor(name, type, limit) {
        this.mType = type;
        this.mLimit = limit;
        this.mName = name;
        this.mCurrentCharacters = [];
        this.mCurrentWeapons = [];
    }

    containsCharacter(character) {
        console.log("CHARACTER " + character);
        console.log("TO STRING: " + this.mCurrentCharacters.toString());
        console.log("INCLUDES " + this.mCurrentCharacters.includes(Number(character)));
        return this.mCurrentCharacters.includes(Number(character));
    }

    enterCharacter(character) {
        if (!this.isAtLimit() && !this.containsCharacter(Number(character))) {
            this.mCurrentCharacters.push(Number(character));
            return true;
        }
        return false;
    }

    exitCharacter(character) {
        console.log("EXIT");
        if (this.containsCharacter(Number(character))) {
            console.log("CONTAINS");
            //get the index of the character and remove it
            var ind = this.mCurrentCharacters.indexOf(Number(character));
            this.mCurrentCharacters.splice(0, ind);
            console.log("curr character length " + this.mCurrentCharacters.length);
            return true;
        }
        return false;
    }

    containsWeapon(weapon) {
        return this.mCurrentWeapons.includes(Number(weapon));
    }

    enterWeapon(weapon) {
        if (!this.containsWeapon) {
            this.mCurrentWeapons.push(Number(weapon));
            return true; //return true to say the weapon moved
        }

        return false; //weapon did not enter
    }

    exitWeapon(weapon) {
        if (this.containsWeapon(Number(weapon))) {
            //get the index of the weapon and remove it
            var ind = this.mCurrentWeapons.indexOf(Number(weapon));
            this.mCurrentWeapons.splice(0, ind);
            return true;
        }
        return false;
    }

    isAtLimit() {
        if (this.mLimit === -1) {
            return false;
        }
        return this.mCurrentCharacters.length >= this.mLimit;
    }

    getType() {
        return this.mType;
    }

}

module.exports = GameSpace;