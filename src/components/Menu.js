import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SectionList,
  Platform,
  View,
} from 'react-native';

import {
  AdMobBanner,
} from 'react-native-admob';

import { ADMOB_BANNDER_AD_UNIT_ID } from '../config/ads';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingBottom: 5,
    color: 'white',
  },
  sectionHeader: {
    color: '#a1fbe2',
    fontSize: 32,
  },
});

const komica_board =
[
  { category: '連線板',
    data: [
      { title: '2CAT', url: 'https://2cat.ml/' },
      { title: '貓管理部', url: 'https://2cat.ml/~ad/0d/' },
      { title: '站務公告', url: 'https://komica.blogspot.com/' },
      { title: '動畫', url: 'https://2cat.ml/~tedc21thc/anime/' },
      { title: '漫畫', url: 'https://2cat.ml/~scribe/2c/' },
      { title: '影視', url: 'https://aqua.komica.org/04/' },
      { title: '綜合', url: 'https://rem.komica2.net/00/' },
      { title: '綜合2', url: 'https://alleyneblade.mymoe.moe/queensblade/' },
      { title: '掛圖', url: 'https://aqua.komica.org/64/' },
      { title: '氣象', url: 'https://aqua.komica.org/62/' },
      { title: '新番捏他', url: 'https://2cat.ml/~tedc21thc/new/' },
      { title: '新番實況', url: 'https://2cat.ml/~tedc21thc/live/' },
      { title: '三次實況', url: 'https://yuutan.mymoe.moe/pawahuru/' },
      { title: '模型', url: 'https://aqua.komica.org/09/' },
      { title: 'Figure/GK', url: 'https://vi.anacel.com/fg/vichan/fg/' },
      { title: '玩偶', url: 'https://aqua.komica.org/26/' },
      { title: '螢幕攝', url: 'https://alica.dreamhosters.com/screenshot/' },
      { title: '歡樂惡搞', url: 'https://aqua.komica.org/12/' },
      { title: '特攝', url: 'https://aqua.komica.org/13/' },
      { title: '祭典', url: 'https://rthost.fam.cx/sd/' },
      { title: '治癒系', url: 'https://tsukisiro.snow-sugar.net/iyasi/' },
      { title: '蘿蔔', url: 'https://aqua.komica.org/15/' },
      { title: '攝影', url: 'https://aqua.komica.org/50/' },
      { title: '軍武', url: 'https://aqua.komica.org/17/' },
      { title: '車', url: 'https://no_99.mymoe.moe/cars/' },
      { title: '萌', url: 'https://2cat.ml/~kirur/img2/' },
      { title: '詢問', url: 'https://2cat.ml/~kirur/orz/' },
      { title: 'AA', url: 'https://rthost.fam.cx/aa/' },
      { title: 'COSPLAY', url: 'https://cosplay.mymoe.moe/cosplay/' },
      { title: '改造', url: 'https://aqua.komica.org/40/' },
      { title: '投票所', url: 'https://komica.yucie.net/vote/' },
      { title: '問答', url: 'https://komica.yucie.net/quiztest/' },
      // { title: 'UP', url: 'https://rthost.fam.cx/komica-up/upload.php' },
    ] },
  { category: '連線二版',
    data: [
      { title: '綜合學術', url: 'https://gzone-anime.info/UnitedSites/academic/' },
      { title: '數學', url: 'https://study.mymoe.moe/math/' },
      { title: '歷史', url: 'https://study.mymoe.moe/history/' },
      { title: '地理', url: 'https://study.mymoe.moe/geography/' },
      { title: '校園', url: 'https://komicolle.dreamhosters.com/school/' },
      { title: '職業', url: 'https://2cat.org/~career/' },
      { title: '財經', url: 'https://2cat.org/~finance/' },
      { title: '生活消費', url: 'https://gzone-anime.info/UnitedSites/shopping/' },
      { title: '法律', url: 'https://2cat.org/~law/' },
      { title: '海外', url: 'https://next.nagatoyuki.org/outremer/' },
      { title: '閒談@香港', url: 'https://kagaminerin.org/hongkong/' },
      { title: '消費電子', url: 'https://komicolle.dreamhosters.com/digital/' },
      { title: '藝術', url: 'https://gzone-anime.info/UnitedSites/art/' },
      { title: '繪師', url: 'https://2cat.org/~artist/' },
      { title: '交易合購', url: 'https://komica.yucie.net/trade/' },
      { title: '鋼普拉', url: 'https://aqua.komica.org/61/' },
      { title: '生存遊戲', url: 'https://2cat.ml/~gtr2003/pixmicat1/' },
      { title: '鐵道', url: 'https://tsukisiro.snow-sugar.net/tetsudou/' },
      { title: '燃', url: 'https://ningen.dreamhosters.com/moe/' },
      { title: '笑話', url: 'https://wildboar.mymoe.moe/humour/' },
      { title: '猜謎', url: 'https://2cat.org/~quiz/' },
      { title: '故事接龍', url: 'https://storysol.boguspix.com/' },
      { title: '歐美漫畫', url: 'https://miyarei.org/AmericanSuperHeroes/' },
      { title: '歐美動畫', url: 'https://mymoe.moe/boards/wei75631/komicartoon/' },
      { title: '大自然', url: 'https://2cat.ml/~rt/pd/' },
      { title: '天文', url: 'https://2cat.org/~astronomy/' },
      { title: '星座命理', url: 'https://kagaminerin.org/horoscope/' },
      { title: 'New Age', url: 'https://crystal.mymoe.moe/newage/' },
      { title: '戀愛', url: 'https://moecorner.com/iboards/Relationship/' },
      { title: '超常現象', url: 'https://2cat.org/~supernature/' },
      { title: '夢', url: 'https://komicolle.dreamhosters.com/dream/' },
      { title: '流言終結', url: 'https://next.nagatoyuki.org/myth/' },
      { title: '政治', url: 'https://politics.mymoe.moe/index/' },
      { title: '旅遊', url: 'https://travel.voidfactory.com/' },
      { title: '耳機', url: 'https://norrk.mymoe.moe/headphone/' },
      { title: '手機', url: 'https://phone.mymoe.moe/pda/' },
      { title: '服飾', url: 'https://2cat.org/~pixmicat/' },
      { title: '美容', url: 'https://kagaminerin.org/cosmetic/' },
      { title: '髮型', url: 'https://yuutan.mymoe.moe/kaminoke/' },
      { title: '家政', url: 'https://mymoe.moe/boards/24/house/' },
      { title: '手工藝', url: 'https://komica.chiisana.net/diy/' },
      { title: '圖書', url: 'https://gzone-anime.info/UnitedSites/books/' },
      { title: '讀書筆記', url: 'https://mymoe.moe/boards/24/mindmap/' },
      { title: '煩惱相談', url: 'https://next.nagatoyuki.org/conseil/' },
      { title: '安價', url: 'https://next.nagatoyuki.org/ancre/' },
    ] },
  { category: '影音',
    data: [
      { title: '短片', url: 'https://2cat.ml/~touhonoob/21d/' },
      { title: '短片2', url: 'https://aqua.komica.org/69/' },
      { title: '彈幕', url: 'https://komica.yucie.net/video/' },
      { title: '直播', url: 'https://komica.yucie.net/boardcast/' },
      { title: 'MAD', url: 'https://aqua.komica.org/39/' },
    ] },
  { category: '遊戲',
    data: [
      { title: '遊戲速報', url: 'https://aqua.komica.org/27/' },
      { title: '綜合遊戲', url: 'https://tehepero.org/komica/' },
      { title: '動作遊戲', url: 'https://kagaminerin.org/act/' },
      { title: '格鬥遊戲', url: 'https://komica.yucie.net/fight/' },
      { title: '2D STG', url: 'https://kagaminerin.org/stg/' },
      { title: '3D STG', url: 'https://kagaminerin.org/fps/' },
      { title: '冒險遊戲', url: 'https://kagaminerin.org/avg/' },
      { title: 'RPG', url: 'https://kagaminerin.org/rpg/' },
      { title: '賽車遊戲', url: 'https://2cat.ml/~caradmin/rcg-slg/' },
      { title: '戰略遊戲', url: 'https://2cat.ml/~caradmin/rcg-slg/' },
      { title: '養成遊戲', url: 'https://komica.yucie.net/slg/' },
      { title: '戀愛遊戲', url: 'https://komica.yucie.net/renai/' },
      { title: '女性向遊戲', url: 'https://2cat.org/~boylove/' },
      { title: '音樂遊戲', url: 'https://komica.chiisana.net/musicgame/' },
      { title: '網頁遊戲', url: 'https://komica.chiisana.net/webgame/' },
      { title: '獨立遊戲', url: 'https://komica.dbfoxtw.me/indiegame/' },
      { title: '行動遊戲', url: 'https://2cat.org/~handheld/' },
      { title: '體感遊戲', url: 'https://2cat.org/~motion/' },
      { title: '桌上遊戲', url: 'https://2cat.org/~boardgame/' },
      { title: '麻將', url: 'https://moecorner.com/iboards/Mahjong/' },
      { title: '遊戲設計', url: 'https://komica.dbfoxtw.me/gameprogramming/' },
      { title: 'RPG Maker', url: 'https://rm2k3xpvx.mymoe.moe/rm/' },
      { title: 'STEAM', url: 'https://steam.mymoe.moe/STEAM/' },
      { title: '網路遊戲', url: 'https://aqua.komica.org/52/' },
    ] },
  { category: '遊戲作品',
    data: [
      { title: 'CosmicBreak', url: 'https://gamegroup.mymoe.moe/cosmicbreak/' },
      { title: 'Elsword', url: 'https://palladium.mymoe.moe/ElswordNew/' },
      { title: 'DNF', url: 'https://sdgo.mymoe.moe/GGCDNF/' },
      { title: 'DOTA2', url: 'https://lordofdota2.mymoe.moe/DOTA2/' },
      { title: 'FEZ', url: 'https://komica.yucie.net/fez/' },
      { title: 'GW2', url: 'https://fina.mymoe.moe/gw2/' },
      { title: 'GTA', url: 'https://fenrisulfr.org/gta/' },
      { title: 'LOL', url: 'https://klol.mymoe.moe/komicaLOL/' },
      { title: 'Minecraft', url: 'https://komica.peroneko.org/minecraft/' },
      { title: 'PAD', url: 'https://phone.mymoe.moe/bazudora/' },
      { title: 'PSO2', url: 'https://2012.mymoe.moe/pso2/' },
      { title: 'SDGO', url: 'https://touhonoob.mymoe.moe/sd_gundum/' },
      { title: 'StarCraft', url: 'https://mymoe.moe/boards/touhonoob/starcraft/' },
      { title: 'T7S', url: 'https://www.karlsland.net/t7s/' },
      { title: 'WOW', url: 'https://www.wowhk.org/' },
      { title: '白貓Project', url: 'https://acs5566.mymoe.moe/shironeko/' },
      { title: '流亡黯道 PoE', url: 'https://pathofexile.mymoe.moe/komicaPOE/' },
      { title: '新瑪奇英雄傳', url: 'https://kvindictus.mymoe.moe/Vindictus/' },
      { title: '戰車世界', url: 'https://fenrisulfr.org/wot/' },
      { title: '戰地風雲', url: 'https://fenrisulfr.org/battlefield/' },
      { title: '戰爭雷霆', url: 'https://fenrisulfr.org/war_thunder/' },
      { title: '戰機世界', url: 'https://fenrisulfr.org/wowp/' },
      { title: '戰艦世界', url: 'https://fenrisulfr.org/wows/' },
      { title: '艦隊收藏', url: 'https://acgspace.wsfun.com/kancolle/' },
      { title: '魔物獵人', url: 'https://strange-komica.com/MonsterHunter/' },
      { title: '爐石戰記', url: 'https://lordofdota2.mymoe.moe/Hearthstone/' },
    ] },
  { category: '動漫作品',
    data: [
      { title: '動物朋友', url: 'https://aqua.komica.org/68/' },
      { title: '東方', url: 'https://2cat.ml/~kirur/touhou/' },
      { title: '葉鍵', url: 'https://ningen.dreamhosters.com/leafkey/' },
      { title: '龍騎士07', url: 'https://2cat.org/~07expansion/' },
      { title: '涼宮', url: 'https://next.nagatoyuki.org/szmy/' },
      { title: '反逆', url: 'https://komica.chiisana.net/pizzahut/' },
      { title: '奈葉', url: 'https://nanoha.boguspix.com/' },
      { title: '廢怯少女', url: 'https://mymoe.moe/boards/21/madoka/' },
      { title: '禁書', url: 'https://index.mymoe.moe/index/' },
      { title: '遊戲王', url: 'https://yugioh.mymoe.moe/20110517/' },
      { title: '女王之刃', url: 'https://alleyneblade.mymoe.moe/0002/' },
      { title: 'APH', url: 'https://kagaminerin.org/aph1/' },
      { title: 'Digimon', url: 'https://joshua.mymoe.moe/digimon/' },
      { title: 'Homestuck', url: 'https://komica.dbfoxtw.me/homestuck/' },
      { title: 'IM@S', url: 'https://idolma.ster.tw/imgbbs/' },
      { title: 'LoveLive!', url: 'https://lovelive.mymoe.moe/lovelive/' },
      { title: 'Pokemon', url: 'https://kagaminerin.org/pokemon/' },
      { title: 'Pretty Cure', url: 'https://komica.yucie.net/prettycure/' },
      { title: 'Saki', url: 'https://neet1145.mymoe.moe/shizuno/' },
      { title: 'Strike Witches', url: 'https://www.karlsland.net/sw/' },
      { title: 'VOCALOID', url: 'https://vocaloid.orzhk.net/' },
    ] },
  { category: '製作公司',
    data: [
      { title: 'Capcom', url: 'https://no_99.mymoe.moe/capcom/' },
      { title: 'GAINAX', url: 'https://kagaminerin.org/gainax/' },
      { title: 'KOEI', url: 'https://www.karlsland.net/koei/' },
      { title: 'SQEX', url: 'https://moecorner.com/iboards/Square_Enix/' },
      { title: 'TYPE-MOON', url: 'https://gzone-anime.info/UnitedSites/TypeMoon/' },
      { title: '京都動畫', url: 'https://komica.yucie.net/kyoutoanimate/' },
    ] },
  { category: '聲優藝人',
    data: [
      { title: '聲優綜合', url: 'https://komica.yucie.net/seiyuu/' },
      { title: '釘宮', url: 'https://komica.yucie.net/kugimiya/' },
      { title: '田村/堀江/水樹', url: 'https://komica.yucie.net/nana/' },
      { title: 'AKB48', url: 'https://akb48.mymoe.moe/akb48/' },
      { title: 'Sound Horizon', url: 'https://laurenthorizon.weebly.com/' },
    ] },
  { category: '專題版',
    data: [
      { title: '角色配對', url: 'https://kagaminerin.org/flash/' },
      { title: '催淚', url: 'https://kagaminerin.org/tearing/' },
      { title: '性轉換', url: 'https://komica.chiisana.net/genderswap/' },
      { title: 'Maid', url: 'https://ningen.dreamhosters.com/maid/' },
      { title: '巫女', url: 'https://alica.dreamhosters.com/miko/' },
      { title: '魔女', url: 'https://komica.yucie.net/magic/' },
      { title: '蘿莉', url: 'https://komica.yucie.net/lori/' },
      { title: '正太', url: 'https://p.komica.acg.club.tw/s/' },
      { title: '御姊', url: 'https://sister.boguspix.com/' },
      { title: '兄貴', url: 'https://p.komica.acg.club.tw/a/' },
      { title: '妹系', url: 'https://komica.yucie.net/imoto/' },
      { title: '人外', url: 'https://komica.dbfoxtw.me/jingai/' },
      { title: '獸', url: 'https://kemono.wtako.net/kemono/' },
      { title: '機娘', url: 'https://msgirls.boguspix.com/' },
    ] },
  { category: '創作',
    data: [
      { title: '返信娘', url: 'https://2cat.ml/~rt/hd/' },
      { title: 'Lolita Fashion', url: 'https://komica.yucie.net/lolita/' },
      { title: '傲嬌', url: 'https://komica.chiisana.net/tsundere/' },
      { title: '塗鴉王國', url: 'https://aqua.komica.org/30/' },
      { title: '線上繪圖', url: 'https://aqua.komica.org/poti/' },
      { title: '塗鴉保育區', url: 'https://kemono.wtako.net/kemozone/' },
      { title: '塗鴉工廠', url: 'https://broken.goodluck.com.tw/' },
      { title: '3D', url: 'https://komicolle.dreamhosters.com/3d/' },
      { title: 'MMD', url: 'https://valerinty.mymoe.moe/mmdance/' },
      { title: '同人', url: 'https://aqua.komica.org/65/' },
      { title: '同人2', url: 'https://doujin2.acgmoe.com/board/' },
      { title: 'SOHO', url: 'https://durudurudadada.mymoe.moe/soho/' },
      { title: '宣傳', url: 'https://aqua.komica.org/20d/' },
    ] },
  { category: '飲食',
    data: [
      { title: '飲食', url: 'https://aqua.komica.org/58/' },
      { title: '酒', url: 'https://next.nagatoyuki.org/beverage/' },
      { title: '咖啡/茶', url: 'https://2cat.org/~coffee/' },
      { title: '烹飪', url: 'https://2cat.org/~cooking/' },
      { title: '素食', url: 'https://kagaminerin.org/vegetarian/' },
    ] },
  { category: '體育運動',
    data: [
      { title: '體育', url: 'https://aqua.komica.org/49/' },
      { title: '足球', url: 'https://komica.yucie.net/worldcup/' },
      { title: '武術', url: 'https://komica.yucie.net/budou/' },
    ] },
  { category: '動物',
    data: [
      { title: '動物綜合', url: 'https://2cat.ml/~twocat/7d/' },
      { title: '犬', url: 'https://komica.yucie.net/dog/' },
      { title: '貓', url: 'https://komica.yucie.net/cat/' },
      { title: '鳥', url: 'https://2cat.org/~bird/' },
      { title: '蟲', url: 'https://spg-web.sytes.net/PasteChart/insect/' },
      { title: '水族', url: 'https://komica.yucie.net/aquarium/' },
      { title: '認養', url: 'https://komica.yucie.net/adopt/' },
    ] },
  { category: '桌布壁紙',
    data: [
      { title: '二次壁', url: 'https://2cat.ml/~twocat/5d/' },
      { title: '三次壁', url: 'https://2nee.org/bg_photo' },
      { title: 'PSV/手機壁', url: 'https://2cat.ml/~touhonoob/14d/' },
    ] },
  { category: '電腦網路',
    data: [
      { title: '電腦', url: 'https://aqua.komica.org/37/' },
      { title: 'Pixmicat!', url: 'https://2cat.ml/~scribe/pixmicat_dev/' },
      { title: 'Joyful Note', url: 'https://rthost.fam.cx/joyful/' },
      { title: '程設交流', url: 'https://komicolle.dreamhosters.com/cs/' },
      { title: 'Apple', url: 'https://moecorner.com/iboards/Apple/' },
    ] },
  { category: '本地板',
    data: [
      { title: '文化交流', url: 'https://aqua.komica.org/22/' },
      { title: '新聞', url: 'https://aqua.komica.org/25/' },
      { title: '寫真', url: 'https://aqua.komica.org/16/' },
      { title: '女性角色', url: 'https://aqua.komica.org/19/' },
      { title: '男性角色', url: 'https://aqua.komica.org/38/' },
      { title: '中性角色', url: 'https://aqua.komica.org/57/' },
      { title: '四格', url: 'https://aqua.komica.org/42/' },
      { title: '擬人化', url: 'https://aqua.komica.org/36/' },
      { title: '少女漫畫', url: 'https://aqua.komica.org/47/' },
      { title: '音樂', url: 'https://aqua.komica.org/29/' },
      { title: '布袋戲', url: 'https://aqua.komica.org/46/' },
      { title: '小說', url: 'https://aqua.komica.org/35/' },
      { title: '奇幻', url: 'https://aqua.komica.org/60/' },
      { title: '紙牌', url: 'https://aqua.komica.org/10/' },
      { title: '高解析度', url: 'https://aqua.komica.org/33/' },
      { title: 'GIF', url: 'https://aqua.komica.org/23/' },
      { title: 'FLASH', url: 'https://aqua.komica.org/24/' },
      { title: '求圖', url: 'https://aqua.komica.org/45/' },
      { title: '測試', url: 'https://komica42.dreamhosters.com/99/' },
    ] },
  { category: '文字版',
    data: [
      { title: '綜合討論', url: 'https://aqua.komica.org/f1/' },
      { title: '連結', url: 'https://aqua.komica.org/f3/' },
      { title: '豆知識', url: 'https://aqua.komica.org/f5/' },
      { title: '電腦', url: 'https://aqua.komica.org/f6/' },
      { title: '單身', url: 'https://aqua.komica.org/f7b/' },
      { title: '寫作', url: 'https://aqua.komica.org/f9/' },
    ] },
  { category: '其他',
    data: [
      { title: 'KomicaWiki', url: 'https://wiki.komica.org/%E9%A6%96%E9%A0%81' },
      { title: '精華區', url: 'https://aqua.komica.org/up/' },
      { title: 'Komicolle', url: 'https://komicolle.org/' },
    ] },
  { category: '外部連結',
    data: [
      { title: 'Komica2', url: 'https://komica2.net/' },
      { title: '0rz.tw', url: 'https://0rz.tw/' },
      { title: 'Google 日本', url: 'https://www.google.co.jp/ja' },
      { title: 'goo 辞書', url: 'https://dictionary.goo.ne.jp/' },
      { title: 'Yahoo! 字典', url: 'https://tw.dictionary.yahoo.com/' },
      { title: '英漢字典', url: 'https://cdict.net/' },
      { title: '國語辭典', url: 'https://dict.revised.moe.edu.tw/cbdic/' },
      { title: 'Excite 翻訳', url: 'https://www.excite.co.jp/world/chinese/' },
      { title: 'Babel Fish', url: 'https://www.babelfish.com/' },
      { title: '維基百科', url: 'https://zh.wikipedia.org/' },
      { title: 'Yahoo! 知識+', url: 'https://tw.knowledge.yahoo.com/' },
      { title: '繁簡轉換', url: 'https://www.tdctrade.com/putonghua/' },
      { title: '假名注音', url: 'https://www.hiragana.jp/' },
      { title: '漢字轉換', url: 'https://www.j-talk.com/nihongo/' },
      { title: 'SF', url: 'https://orzistic.org/s/' },
      { title: '國際政治', url: 'https://orzistic.org/i/' },
      { title: '樂器．作曲', url: 'https://www.svwind.org/bbs/' },
      { title: '角色商品', url: 'https://netaba.re/cat/' },
      { title: '川澄/能登', url: 'https://mamiko.keyfans.net/' },
      { title: '花澤', url: 'https://kana.keyfans.net/' },
      { title: '偶像', url: 'https://yuutan.mymoe.moe/idol/' },
    ] },
];


export default function Menu({ onItemSelected }) {
  return (
    <View style={{ flex: 1 }}>

      <AdMobBanner
        bannerSize="mediumRectangle"
        testDeviceID="EMULATOR"
        adUnitID={ADMOB_BANNDER_AD_UNIT_ID}
        adViewDidReceiveAd={() => { console.log('AdMobBanner', 'adViewDidReceiveAd'); }}
        didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
      />

      <SectionList
        sections={komica_board}
        renderItem={({ item }) =>
          (<TouchableOpacity
            onPress={() => { onItemSelected(item); }}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>)
        }
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.category}</Text>}
        style={{ margin: 10 }}
      />
    </View>

  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
