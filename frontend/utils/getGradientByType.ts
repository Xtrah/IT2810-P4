// Code inspired by a group member's earlier code https://github.com/LiviaValenti/gjensidige-case/blob/main/src/utils.ts

/**
 * Returns gradient-values based on Pokémon-type
 * @param type string depicting Pokémon-type
 * @returns gradient values on format (gradient-angle, hex1 colorstop1, hex1 colorstop2)
 */
const getGradientByType = (type: string): string[] => {
  const gradientMap = new Map([
    ['normal', ['#A8A878', '#645D23']],
    ['fire', ['#F08030', '#a04009']],
    ['water', ['#49b9db', '#2249A8']],
    ['grass', ['#50ec65', '#26a822']],
    ['electric', ['#eeca2c', '#c0a114']],
    ['ice', ['#5eb8d3', '#27bdc2']],
    ['fighting', ['#f87a7a', '#c23838']],
    ['poison', ['#A040A0', '#660c66']],
    ['ground', ['#b1a434', '#908542']],
    ['flying', ['#c580fd', '#8138d4']],
    ['psychic', ['#d4259f', '#e68b24']],
    ['bug', ['#b4e21f', '#88a52a']],
    ['rock', ['#88835b', '#6e6b54']],
    ['ghost', ['#611bb1', '#44384e']],
    ['dark', ['#58452c', '#2f2114']],
    ['dragon', ['#6e28dd', '#4f1bdd']],
    ['steel', ['#b8b8b8', '#777777']],
    ['fairy', ['#f3bbfa', '#ce61c8']],
  ]);

  return gradientMap.get(type) || ['#A8A878', '#645D23'];
};

export default getGradientByType;
