// Modul 3: matriks piksel. '.' = transparan.
import { P_PLAYER } from './palette.js';

export const PIXEL_SPRITES = {};

PIXEL_SPRITES.player_down = { colors: P_PLAYER, rows: [
  '................','.....hhhhhh.....','....hhhhhhhh....','....hnnnnnnh....',
  '....hssssssh....','....hsepspesh...','....hssssssh....','.....hsmmssh....',
  '....rrrrrrrr....','...rrrrrrrrrr...','...rRrrrrrrRr...','....ssssssss....',
  '....bbbbbbbb....','....bbbbbbbb....','.....bb..bb.....','....kkk..kkk....']};

PIXEL_SPRITES.player_up = { colors: P_PLAYER, rows: [
  '................','.....hhhhhh.....','....hhhhhhhh....','....hnnnnnnh....',
  '....hssssssh....','....hssssssh....','....hssssssh....','.....hssssh.....',
  '....rrrrrrrr....','...rrrrrrrrrr...','...rRrrrrrrRr...','....ssssssss....',
  '....bbbbbbbb....','....bbbbbbbb....','.....bb..bb.....','....kkk..kkk....']};

PIXEL_SPRITES.player_left = { colors: P_PLAYER, rows: [
  '................','.....hhhhh......','....hhhhhhh.....','....hnnnnhh.....',
  '....hsssssh.....','....hsepssh.....','....hsspssh.....','.....hsssh......',
  '....rrrrrr......','...rrrrrrrr.....','...rRrrrrRr.....','....ssssss......',
  '....bbbbbb......','....bbbbbb......','.....bbbb.......','....kkkkk.......']};

PIXEL_SPRITES.npc_raka = {
  colors: { ...P_PLAYER, r: '#c64435', R: '#8f2f28' },
  rows: PIXEL_SPRITES.player_down.rows
};
PIXEL_SPRITES.npc_sari = {
  colors: { ...P_PLAYER, r: '#7d56ad', R: '#563879', b: '#438e9b' },
  rows: PIXEL_SPRITES.player_down.rows
};
PIXEL_SPRITES.npc_budi = {
  colors: { ...P_PLAYER, r: '#4d8c50', R: '#32623a', b: '#514d78' },
  rows: PIXEL_SPRITES.player_down.rows
};

PIXEL_SPRITES.cow = { colors: { k:'#25242a', w:'#eee9dc', K:'#56525a', p:'#d98282', h:'#e8d6a5' }, rows: [
  '................','....hh....hh....','...hkk....kkh...','....wwwwwwww....',
  '..kkwwwwwwwwkk..','.kwwKwwwwwwKwwk.','.kwwwwwwwwwwwwk.',
  'kwwwwwwwwwwwwwwk','kwwwwwwwwwwwwwwk','.kwwwwwwwwwwwwk.',
  '..kkwwwwwwwwkk..','....kwwppwwk....','....kkkkkkkk....',
  '...kk......kk...','...kk......kk...','................']};
PIXEL_SPRITES.chicken = { colors: { w:'#f2eee0', W:'#c9c3b4', o:'#ed963b', r:'#c84f47', k:'#302d30' }, rows: [
  '................','......ww........','.....wWWw.......','....wWwwWw......',
  '....wwwwww......','...wwkwwwwo.....','...wwwwwww......','....wwwww.......',
  '....wwwww.......','.....ooo........','....oo.oo.......','................']};
PIXEL_SPRITES.pigeon = { colors: { g:'#737f8c', G:'#a7bac5', w:'#e8edf0', o:'#d8874b', k:'#293039' }, rows: [
  '................','......gg........','.....gGGg.......','....gGGGGg......',
  '...gGGwGGGg.....','..gGGGGGGGGg....','...gGGGGGGGg....',
  '....gggggg......','.....oo.........','....o..o........','................']};

PIXEL_SPRITES.trash_organik = { colors: { y:'#e8c547', Y:'#b89a26', g:'#4e8b3a', G:'#6dab50' }, rows: [
  '................','................','.......yy.......','......yyYy......',
  '.....yy.yYy.....','.....y..Yyy.....','.....yy.Yy......','......yYy.......',
  '.....GGGGG......','....GGGGGGG.....','.....GGGGG......','................',
  '................','................','................','................']};

PIXEL_SPRITES.trash_anorganik = { colors: { w:'#cfe6f2', b:'#6fb7d6', B:'#a9dbf2', c:'#4a8fae' }, rows: [
  '................','......wwww......','.....wbbbbw.....','.....wbBBbw.....',
  '.....wbbbbw.....','......wwww......','......wcbw......','......wbbw......',
  '......wcbw......','......wbbw......','......wwww......','................',
  '................','................','................','................']};

PIXEL_SPRITES.trash_b3 = { colors: { k:'#1b1b22', y:'#f0c419', Y:'#c9a110', z:'#8a8a96', h:'#1b1b22' }, rows: [
  '................','................','.....kkkkkk.....','.....kyYYyk.....',
  '.....kyhhyk.....','.....kYYYYk.....','.....kzzzzk.....','.....kzzzzk.....',
  '.....kyYYyk.....','.....kyhhyk.....','.....kyYYyk.....','.....kkkkkk.....',
  '................','................','................','................']};

export const MACHINE_ROWS = [
  '........................','.........gggggggg.......','........gGGGGGGGGg......',
  '........gGGGGGGGGg......','........gGDDDDDDGg......','........gGDDDDDDGg......',
  '........gGGGGGGGGg......','.........gggggggg.......','......mmmmmmmmmmmm......',
  '.....mMMMMMMMMMMMMm.....','.....mMppppppppppMm.....','.....mMppppppppppMm.....',
  '.....mMppppppppppMm.....','.....mMppppppppppMm.....','.....mMppppppppppMm.....',
  '.....mMMMMMMMMMMMMm.....','.....mmmmmmmmmmmmmm.....','.....mMMMmmmmmmMMMM.....',
  '.....mmmmmmmmmmmmmm.....','......mmmm....mmmm......','......mmmm....mmmm......',
  '......mmmm....mmmm......','........................','........................'];

PIXEL_SPRITES.machine_organik   = { colors: { g:'#3f6b2f', G:'#7bbf52', D:'#c9f0a8', m:'#4a3a2a', M:'#7a6248', p:'#8fd15a' }, rows: MACHINE_ROWS };
PIXEL_SPRITES.machine_anorganik = { colors: { g:'#2f4f7a', G:'#5b8fc7', D:'#bfe3f7', m:'#3a3a4a', M:'#6a6a80', p:'#6fb7d6' }, rows: MACHINE_ROWS };
PIXEL_SPRITES.machine_b3        = { colors: { g:'#6b2f4f', G:'#c75b8f', D:'#f7bfe3', m:'#3a2a3a', M:'#7a5a6a', p:'#f0c419' }, rows: MACHINE_ROWS };

PIXEL_SPRITES.drone = { colors: { k:'#22242c', g:'#5b8fc7', G:'#8fbde0', w:'#dfeaf5', D:'#3f6b8f', r:'#ff6a3d' }, rows: [
  '..............','...kkkkkkkk...','..kggggggggk..','.kgwwwwwwwwgk.',
  '.kgwDDDDDDwgk.','.kgwDDDDDDwgk.','..kggggggggk..','...kkkkkkkk...',
  '....r....r....','...r......r...']};

PIXEL_SPRITES.mecha = { colors: { k:'#1b1d26', m:'#6b7488', M:'#aab4c8', c:'#2fe0c8', o:'#ff8a3d' }, rows: [
  '..............','....kkkkkk....','...kmmmmmmk...','...kmccccmk...',
  '...kmmmmmmk...','..kkmmmmmmkk..','.kmkmmmmmmkmk.','.kmkMMMMMMkmk.',
  '..kk.mmmm.kk..','.....mmmm.....','....kk..kk....','...kk....kk...']};

PIXEL_SPRITES.tree = { colors: {
  g:'#314d35', G:'#50744a', L:'#7f9c5e', H:'#b7c780', t:'#49382a', T:'#987149'
}, rows: [
  '........gggggg..........','......ggGLLHLLgg..........','.....gGGLLHHGGg.........',
  '....gGGGLLHHLLGGGg........','...gGGGLLHHLLGGGGGg.......','...gGGGLLHHLLGGGGGg.......',
  '....gGGLLHHLGGGg........','.....gGGLLGGGGg.........','......ggGLLHgg..........',
  '........tttt............','........tTTt............','........tTTt............',
  '........tttt............']};

PIXEL_SPRITES.bush = { colors: { g:'#2f6b2a', G:'#4f9b3d' }, rows: [
  '................','................','.....gggg.......','...ggGGGGgg.....',
  '..gGGGGGGGGg....','..gGGGGGGGGg....','...ggGGGGgg.....','.....gggg.......',
  '................','................']};

PIXEL_SPRITES.rock = { colors: { k:'#5a5a66', K:'#82828f' }, rows: [
  '................','................','................','.....kkkk.......',
  '....kKKKKk......','...kKKKKKKk.....','...kKKKKKKk.....','....kkkkkk......',
  '................','................']};

PIXEL_SPRITES.bench = { colors: { w:'#8a5a30', W:'#b8814a', k:'#3a2a1c' }, rows: [
  '................','................','................','................',
  '..wwwwwwwwwwww..','..wWWWWWWWWWWw..','..wwwwwwwwwwww..','..k..........k..',
  '..k..........k..','..k..........k..']};

PIXEL_SPRITES.lamp = { colors: { l:'#f7e9a0', y:'#ffe14d', k:'#3a3a44' }, rows: [
  '.......ll.......','......lyyl......','.....lyyyyl.....','......lyyl......',
  '.......kk.......','.......kk.......','.......kk.......','.......kk.......',
  '......kkkk......']};

PIXEL_SPRITES.bin = { colors: { b:'#2f4f7a', B:'#5b8fc7' }, rows: [
  '................','.....bbbbbb.....','....bBBBBBBb....','....bBBBBBBb....',
  '.....bBBBBb.....','.....bBBBBb.....','.....bBBBBb.....','......bbbb......']};

PIXEL_SPRITES.pot = { colors: { f:'#e86fa8', F:'#f7a8cc', p:'#a8552f', P:'#c97648' }, rows: [
  '................','.....f..f.......','....fFfFfFf.....','.....fFfFf......',
  '....fFfFfFf.....','......ppp.......','.....pPPp.......','.....pPPp.......',
  '......pp........']};

PIXEL_SPRITES.pipe = { colors: { k:'#4a4a56', K:'#6e6e7e' }, rows: [
  '................','..kkkkkkkkkk....','..kKKKKKKKKk....','..kkkkkkkkkk....',
  '..kKKKKKKKKk....','..kkkkkkkkkk....','..kKKKKKKKKk....','..kkkkkkkkkk....',
  '..kKKKKKKKKk....','..kkkkkkkkkk....']};

PIXEL_SPRITES.tank = { colors: { k:'#3f5f4a', K:'#6f9a80' }, rows: [
  '................','....kkkkkk......','...kKKKKKKk.....','..kKKKKKKKKk....',
  '..kKKKKKKKKk....','..kKKKKKKKKk....','..kKKKKKKKKk....','...kKKKKKKk.....',
  '....kkkkkk......']};
PIXEL_SPRITES.hay = { colors: { y:'#d9af42', Y:'#f0cf69', k:'#73552e' }, rows: [
  '................','......yyyy......','....yyYYYYyy....',
  '...yYYYYYYYYy...','..yYYYYYYYYYYy..','.yYYYYYYYYYYYYy.',
  '.yYYYYYYYYYYYYy.','.yYYYYYYYYYYYYy.','..kkkkkkkkkkkk..',
  '................']};
PIXEL_SPRITES.fence = { colors: { k:'#563b28', w:'#a87548', W:'#c18d5c' }, rows: [
  '................','..kk....kk....kk','..kw....kw....kw',
  '..kw....kw....kw','..kw....kw....kw','kkwwwwwwwwwwwwkk',
  'kWWWWWWWWWWWWWWk','kkwwwwwwwwwwwwkk','..kw....kw....kw',
  '..kw....kw....kw','..kk....kk....kk','................']};
PIXEL_SPRITES.table = { colors: { k:'#4b3022', b:'#805638', B:'#b07c4d' }, rows: [
  '................','..bbbbbbbbbbbb..','..bBBBBBBBBBBb..',
  '..bbbbbbbbbbbb..','....kk....kk....','....kk....kk....',
  '................']};
PIXEL_SPRITES.stove = { colors: { k:'#30333b', K:'#686c76', o:'#ef8b38', y:'#ffd45a' }, rows: [
  '................','...kkkkkkkkkk...','..kKKKKKKKKKKk..',
  '..kK..oooo..Kk..','..kK.oyyyyo.Kk..','..kK..oooo..Kk..',
  '..kkkkkkkkkkkk..','....kk....kk....','....kk....kk....']};
PIXEL_SPRITES.fountain = { colors: { k:'#344656', K:'#478db2', b:'#478db2', B:'#7bd4e4', w:'#d5faff' }, rows: [
  '......ww........','.....bBBb.......','......bb........',
  '....b..b..b.....','...bB..B..Bb....','..bbbbbbbbbb....',
  '..bBBBBBBBBb....','...bbbbbbbb.....','....kkkkkk......',
  '...kKKKKKKk.....','...kkkkkkkk.....','................']};
PIXEL_SPRITES.pine = { colors: {
  g:'#294b38', G:'#47704a', L:'#73945a', H:'#a8bc78', t:'#533f2c', T:'#9a754c'
}, rows: [
  '.......gg.......','......gGGg......','.....gGGLGg.....',
  '....gGGLHGGg....','...gGGLGGHGGg...','......gGGLg......',
  '.....gGHLGg.....','....gGGLGGGg....','...gGGHGGGLGg...',
  '......gGGLg......','.....gGGHGGg.....','....gGGLGGGg....',
  '.......tt.......','.......tT.......','.......tt.......']};

function makeForestTreeRows() {
  const width = 28;
  const height = 32;
  const clusters = [
    [7, 8, 6, 7], [14, 6, 7, 6], [21, 8, 6, 7],
    [9, 15, 8, 7], [18, 15, 8, 7]
  ];
  const hasLeaves = (x, y) => clusters.some(([cx, cy, rx, ry]) =>
    ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
  );
  const rows = [];

  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      let pixel = '.';
      if (y < 23 && hasLeaves(x, y)) {
        const edge = !hasLeaves(x - 1, y) || !hasLeaves(x + 1, y)
          || !hasLeaves(x, y - 1) || !hasLeaves(x, y + 1);
        const noise = ((x * 37 + y * 67 + x * y * 13 + 19) % 101) / 100;
        if (edge) pixel = 'k';
        else if (noise > 0.94 && y < 17) pixel = 'H';
        else if (noise > 0.69 || (x + y * 2) % 23 === 0) pixel = 'L';
        else if (noise < 0.22 || y > 16) pixel = 'd';
        else pixel = 'G';
      }

      if (y >= 22 && x >= 12 && x <= 15)
        pixel = x === 12 ? 't' : (x === 15 ? 'b' : ((x + y) % 4 === 0 ? 'T' : 'b'));
      row += pixel;
    }
    rows.push(row);
  }
  return rows;
}

PIXEL_SPRITES.forest_tree = { colors: {
  k:'#25372d', d:'#324c37', G:'#4e7047', L:'#7c9d60', H:'#b7c780',
  t:'#4d3929', b:'#725337', T:'#a17a4f'
}, rows: makeForestTreeRows() };
PIXEL_SPRITES.bridge = { colors: { k:'#493222', w:'#a67548', W:'#c18e5d' }, rows: [
  '................','..kk..........kk','..kw..........wk',
  '..kw..........wk','..kwwwwwwwwwwwwk','..kWWWWWWWWWWWWk',
  '..kwwwwwwwwwwwwk','..kkkkkkkkkkkkkk','..kk..........kk',
  '................']};
PIXEL_SPRITES.facade = { colors: { k:'#493d3a', r:'#9a6250', R:'#c69272', w:'#e6c6a2' }, rows: [
  '...kkkkkkkkkk...','...krrrrrrrrk...','...krRrRrRrrk...',
  '...krrrrrrrrk...','...kwwk..kwwk...','...kwwk..kwwk...',
  '...krrrrrrrrk...','...krrrrrrrrk...','...kkkkkkkkkk...']};
PIXEL_SPRITES.flag = { colors: { k:'#34343c', r:'#d9483b', w:'#f4f0e5' }, rows: [
  '.......k........','.......krrrr....','.......krrrr....',
  '.......kwwww....','.......kwwww....','.......k........',
  '.......k........','.......k........','......kkk.......']};
PIXEL_SPRITES.hoop = { colors: { k:'#37333c', o:'#e9874d', w:'#f3ede0' }, rows: [
  '.....kkkkkk.....','....k......k....','....k......k....',
  '.....kkkkkk.....','.......ww.......','......w..w......',
  '.....w....w.....','....w......w....','................']};
PIXEL_SPRITES.desk = { colors: { k:'#34343e', b:'#55475d', B:'#81708d', w:'#aac7d2' }, rows: [
  '................','..bbbbbbbbbbbb..','..bBBBBBBBBBBb..',
  '..bbbbbbbbbbbb..','....kk....kk....','....kk....kk....',
  '...wwww.........','...w..w.........']};
PIXEL_SPRITES.printer = { colors: { k:'#333640', K:'#6e7480', w:'#d7dce2', b:'#6ca6cb' }, rows: [
  '................','....wwwwww......','...w......w.....',
  '..kkkkkkkkkkk...','..kKKKKKKKKKk...','..kKwwwwwwKKk...',
  '..kkkkkkkkkkk...','....bbbbbb......','................']};
PIXEL_SPRITES.bed = { colors: { k:'#394552', w:'#e5e3db', b:'#64a9c5', c:'#b5dbe5' }, rows: [
  '................','..kkkkkkkkkkkk..','..kwwwwwwwwwwk..',
  '..kcccccwwwwwk..','..kcccccwwwwwk..','..kwwwwwwwwwwk..',
  '..kkkkkkkkkkkk..','..kk........kk..','..kk........kk..']};
PIXEL_SPRITES.medical = { colors: { w:'#e8e8e2', r:'#d64d58', k:'#4b515d' }, rows: [
  '................','......ww........','......ww........',
  '....wwwwww......','....wwwwww......','......ww........',
  '......ww........','................']};
PIXEL_SPRITES.conveyor = { colors: { k:'#353a43', K:'#6c727d', b:'#a6afb8', w:'#d2d7dc' }, rows: [
  '................','..kkkkkkkkkkkk..','..kK..K..K..Kk..',
  '..kK..K..K..Kk..','..kkkkkkkkkkkk..','...wwwwwwwwww...',
  '....kkkkkkkk....','................']};
PIXEL_SPRITES.forklift = { colors: { k:'#30333b', y:'#e4b83f', Y:'#f2cf66', b:'#6f8796' }, rows: [
  '................','....yyyyyy......','....yYYYYy......',
  '..kk.yYYYYy.....','..kYyyyyyyyyk...','..kYybbbbbbbk...',
  '..kYyyyyyyyyk...','..kkkk....kkk...',
  '....kk....kk....','................']};
PIXEL_SPRITES.oil = { colors: { k:'#171b20', K:'#343d43', g:'#617b45', G:'#8ca45a' }, rows: [
  '................','......kk........','....kKKKKk......',
  '...kKKGGKKk.....','..kKKGGGGKKk....','..kKKKKKKKKk....',
  '...kkKKKKkk.....','.....kkkk.......','................']};

PIXEL_SPRITES.portal = { colors: { p:'#5fe0ff', P:'#bff4ff' }, rows: [
  '................','................','................','.....pppppp.....',
  '...pPPPPPPPPp...','..pp........pp..','..p..........p..','..p..........p..',
  '..pp........pp..','...pPPPPPPPPp...','.....pppppp.....','................',
  '................','................']};

PIXEL_SPRITES.gedung_sate = { colors: { w:'#e8e4d8', W:'#c9c4b4', k:'#4a4438' }, rows: [
  '................................','...............k................','..............kkk...............',
  '.............k.w.k..............','..............w.w...............','.............kwkwk..............',
  '..............w.w...............','..............kwk...............','.............kw.wk..............',
  '..............w.w...............','..............kwk...............','...............w................',
  '..............www...............','.............wwwww..............','............wwwwwww.............',
  '...........wwwwwwwww............','..........wwwwwwwwwww...........','.........wwwwwwwwwwwww..........',
  '........wwwwwwwwwwwwwww.........','.......wwwwwwwwwwwwwwwww........','......wwwwwwwwwwwwwwwwwww.......',
  '.....wwwwwwwwwwwwwwwwwwwww......','....wwwwwwwwwwwwwwwwwwwwwww.....','...wwwwwwwwwwwwwwwwwwwwwwwww....',
  '...wWWWWWWWWWWWWWWWWWWWWWWWw....','...wWkkWkkWkkWkkWkkWkkWkkWWw....','...wWWWWWWWWWWWWWWWWWWWWWWWw....',
  '...wWkkWkkWkkWkkWkkWkkWkkWWw....','...wWWWWWWWWWWWWWWWWWWWWWWWw....','...wWkkWkkWkkWkkWkkWkkWkkWWw....',
  '...wWWWWWWWWWWWWWWWWWWWWWWWw....','...wWkkWkkWkkWkkWkkWkkWkkWWw....','...wWWWWWWWWWWWWWWWWWWWWWWWw....',
  '...wWWWWWWWWWWWWWWWWWWWWWWWw....','...wWkkkkkkkkkkkkkkkkkkkkkWw....','...wWWWWWWWWWWWWWWWWWWWWWWWw....',
  '...wwwwwwwwwwwwwwwwwwwwwwwww....','...wwwwwwwwwwwwwwwwwwwwwwwww....','................................']};

PIXEL_SPRITES.kalpataru = { colors: { t:'#6a4a24', T:'#8f6a38', g:'#2f6b2a', G:'#57a83f', y:'#ffe14d' }, rows: [
  '..........yyyy..........','.......gggGGGGggg.......','.....gGGGGGGGGGGGg.....',
  '....gGGGGGGGGGGGGGg....','...gGGGGGGGGGGGGGGGg...','...gGGGGGGGGGGGGGGGg...',
  '....gGGGGGGGGGGGGGg....','.....gGGGGGGGGGGGg.....','.......gggGGGGggg.......',
  '..........yyyy..........','........tttttt..........','........tTTTTt..........',
  '........tTTTTt..........','........tttttt..........','.......tttttttt.........',
  '......tttttttttt........']};

PIXEL_SPRITES.monumen = { colors: { y:'#ffd94d', Y:'#c9a110', k:'#4a4438', w:'#fff6cf' }, rows: [
  '...........k............','..........kyk...........','...........k............',
  '..........kyk...........','.........kYYYk..........','........kyYYYyk.........',
  '.......kYYYYYYYk........','......kYYYYYYYYYk.......','.....kYYYYYYYYYYYk......',
  '....kYYYYYYYYYYYYYk.....','...kYYYYYYYYYYYYYYYk....','..kYYYYYYYYYYYYYYYYYk...',
  '..kYYwYYwYYwYYwYYwYYk...','..kYYYYYYYYYYYYYYYYYk...','..kYYwYYwYYwYYwYYwYYk...',
  '..kkkkkkkkkkkkkkkkkkk...']};