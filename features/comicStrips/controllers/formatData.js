const formatComicData = comicData => ({
  urlAddress: comicData.urlAddress,
  description: comicData.description,
  title: comicData.title,
  tags: comicData.tags !== void 0 ? comicData.tags : null,
  privacyLevel: comicData.privacyLevel,
  userID: comicData.userID,
  _id: comicData._id,
  createdAt: comicData.createdAt,
  updatedAt: comicData.updatedAt
});

const formatComicDataArray = comicDataArray => {
  return comicDataArray.map(comicStrip => formatComicData(comicStrip));
};

module.exports = {
  formatComicData,
  formatComicDataArray
};
