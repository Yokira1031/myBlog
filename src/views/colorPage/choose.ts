
let str = 'sfdfa#FFFFFF'

const extractColorCodes = (str: string) => {
    const regex = /#[A-Fa-f0-9]{6}\b/g;
    const matches = str.match(regex);
    
    if (matches) {
      const colorObjects = matches.map(match => ({ colorText: match }));
      return colorObjects;
    }
    return [];
  }

export default extractColorCodes