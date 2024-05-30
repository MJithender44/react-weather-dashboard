const fToC = temp => {
    return Math.round(((temp - 32) * 5) / 9)
  }
  
  const cToF = temp => {
    return Math.round((temp * 9) / 5 + 32)
  }

  const kToC = temp => {
    return Math.round(temp - 273.15);
  };

  const cToK = temp => {
    return Math.round(temp + 273.15);
  }
  
  export {fToC, cToF, kToC, cToK};
  