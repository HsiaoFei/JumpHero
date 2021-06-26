const ApiRootUrl = 'https://m300wxapp.jumpw.com/';
const RootUrl = 'https://300report.jumpw.com/';
const ApiUrl = 'http://hsiaofei.top:23333';

module.exports = {
  GuidUrl: ApiRootUrl + 'config/getGuid', //区服
  NormalUrl: ApiRootUrl + 'battle/searchNormal', //信息1
  RoleUrl: RootUrl + 'api/getrole', //信息2
  ListUrl: RootUrl + 'api/getlist', //比赛列表
  MatchUrl: RootUrl + 'api/getmatch', //对局详情
  ImageUrl: RootUrl + 'static/images/', //图片

  JumpheroProfile: ApiUrl + '/public/jumphero/profile.json', //公告日志类
  // UpdateUrl: ApiUrl + '', //更新日志

  // MatchsUrl: ApiRootUrl + 'battle/searchMatchs', //比赛列表
  // MatchinfoUrl: ApiRootUrl + 'battle/searchMatchinfo', //对局详情
  // HeroRankUrl: ApiRootUrl + 'battle/searchHeroRank', //排行榜

};
