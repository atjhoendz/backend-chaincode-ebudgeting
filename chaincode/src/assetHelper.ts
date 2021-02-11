export const wrapResult = async (iterator: any): Promise<Array<any>> => {
  const allResults = [];

  while (true) {
    let res = await iterator.next();

    if (res.value && res.value.value.toString()) {
      const strValue = Buffer.from(res.value.value).toString("utf8");

      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }

      allResults.push({ Key: res.value.key, Record: record });
    }
    if (res.done) {
      await iterator.close();
      return allResults;
    }
  }
};

export const queryString = (query: Object): Object => {
  return {
    selector: query,
  };
};
