const ApiRootUrl = 'https://m300wxapp.jumpw.com/';
const RootUrl = 'https://300report.jumpw.com/';
const ApiUrl = '';

module.exports = {
  GuidUrl: ApiRootUrl + 'config/getGuid', //区服
  NormalUrl: ApiRootUrl + 'battle/searchNormal', //信息
  ListUrl: RootUrl + 'api/getlist', //比赛列表
  MatchUrl: RootUrl + 'api/getmatch', //对局详情
  ImageUrl: RootUrl + 'static/images/', //图片

  NoticeUrl: ApiUrl + '', //公告
  UpdateUrl: ApiUrl + '', //更新日志

  // MatchsUrl: ApiRootUrl + 'battle/searchMatchs', //比赛列表
  // MatchinfoUrl: ApiRootUrl + 'battle/searchMatchinfo', //对局详情
  // HeroRankUrl: ApiRootUrl + 'battle/searchHeroRank', //排行榜

};
