// Using icons require(https://github.com/duiker101/pokemon-type-png-icons/tree/1.0.0

// Import didn't work with TS, so using require.
const bug = require('../assets/images/pokemonTypes/bug.png');
const water = require('../assets/images/pokemonTypes/water.png');
const dark = require('../assets/images/pokemonTypes/dark.png');
const dragon = require('../assets/images/pokemonTypes/dragon.png');
const electric = require('../assets/images/pokemonTypes/electric.png');
const fairy = require('../assets/images/pokemonTypes/fairy.png');
const fighting = require('../assets/images/pokemonTypes/fighting.png');
const fire = require('../assets/images/pokemonTypes/fire.png');
const flying = require('../assets/images/pokemonTypes/flying.png');
const ghost = require('../assets/images/pokemonTypes/ghost.png');
const grass = require('../assets/images/pokemonTypes/grass.png');
const ground = require('../assets/images/pokemonTypes/ground.png');
const ice = require('../assets/images/pokemonTypes/ice.png');
const normal = require('../assets/images/pokemonTypes/normal.png');
const poison = require('../assets/images/pokemonTypes/poison.png');
const psychic = require('../assets/images/pokemonTypes/psychic.png');
const rock = require('../assets/images/pokemonTypes/rock.png');
const steel = require('../assets/images/pokemonTypes/steel.png');

// Return image according to string input
const getIconByType = (type: string) => {
  const imageTypeMap = new Map([
    ['normal', normal],
    ['fire', fire],
    ['water', water],
    ['grass', grass],
    ['electric', electric],
    ['ice', ice],
    ['fighting', fighting],
    ['poison', poison],
    ['ground', ground],
    ['flying', flying],
    ['psychic', psychic],
    ['bug', bug],
    ['rock', rock],
    ['ghost', ghost],
    ['dark', dark],
    ['dragon', dragon],
    ['steel', steel],
    ['fairy', fairy],
  ]);

  return imageTypeMap.get(type) || imageTypeMap.get('normal');
};

export default getIconByType;
