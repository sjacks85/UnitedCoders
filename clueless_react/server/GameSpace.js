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
        return this.mCurrentCharacters.includes(character);
    }

    enterCharacter(character) {
        if (!this.isAtLimit() && !this.containsCharacter(character)) {
            this.mCurrentCharacters.push(character);
            return true;
        }
        return false;
    }

    exitCharacter(character) {
        if (this.containsCharacter(character)) {
            //get the index of the character and remove it
            ind = this.mCurrentCharacters.indexOf(character);
            this.mCurrentCharacters.splice(0, ind);
            return true;
        }
        return false;
    }

    containsWeapon(weapon) {
        return this.mCurrentWeapons.includes(weapon);
    }

    enterWeapon(weapon) {
        if (!this.containsWeapon) {
            this.mCurrentWeapons.push(weapon);
            return true; //return true to say the weapon moved
        }

        return false; //weapon did not enter

    }

    exitWeapon(weapon) {
        if (this.containsWeapon(weapon)) {
            //get the index of the weapon and remove it
            ind = this.mCurrentWeapons.indexOf(weapon);
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