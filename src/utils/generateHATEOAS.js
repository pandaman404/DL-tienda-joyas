export const generateHATEOAS = (data) => {
  const results = [];
  let stockTotal = 0;

  for (const item of data) {
    stockTotal += item.stock;
    results.push({
      name: item.nombre,
      href: `joyas/joya/${item.id}`,
    });
  }

  return {
    totalJoyas: data.length,
    stockTotal,
    results,
  };
};
