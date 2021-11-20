const api = axios.create({
  baseURL: 'https://618e55b450e24d0017ce121b.mockapi.io/api/v1/',
});

const getScores = async () => {
  try {
    const res = await api.get('scores');
    return res.data.sort((a, b) => b.point - a.point);
  } catch (e) {
    return [];
  }
};

const getScoreByHash = async hash => {
  try {
    const list = await getScores();
    return list.find(l => l.hash === hash);
  } catch (e) {
    return null;
  }
};

const addScore = async (name, point) => {
  try {
    const res = await api.post('scores', {
      hash: Date.now().toString(36),
      name,
      point,
    });
    return res.data;
  } catch (e) {
    return false;
  }
};

const editScore = async (hash, newPoint) => {
  try {
    const found = await getScoreByHash(hash);

    if (found && newPoint > found.point) {
      const res = await api.put(`scores/${found.id}`, {
        point: newPoint,
      });
      return res.data;
    }

    return true;
  } catch (e) {
    return false;
  }
};

/**
 * ****************************
 * *********** TEST ***********
 * ****************************
 */
const main = async () => {
  //   const result = await addScore('Ali', 20);
  //   console.log(result);
  //   const result = await getScoreByHash('kw4wbefa');
  //   console.log(result);
  //   const result = await getScores();
  //   console.log(result);
  //   const result = await editScore('kw4wbefa', 100);
  //   console.log(result);
};
main();
