// @ts-nocheck

import { nameByRace } from "fantasy-name-generator"

function randomNumber(max) {
  return Math.floor(Math.random() * max)
}

function randomGender() {
  const rnd = Math.random()
  if (rnd > 0.5) {
    return 'female'
  }
  return 'male'
}


export class Monster {
  constructor(monsterRace) {
    this.gender = randomGender() 
    this.name = nameByRace(monsterRace, { gender: this.gender })
    this.hp = randomNumber(200)
    this.monsterRace = monsterRace
  }

  description() {
    return `A ${this.gender} badass ${this.monsterRace}`
  }
}


