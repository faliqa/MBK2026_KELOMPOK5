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

PIXEL_SPRITES.tree = { colors: { g:'#2f6b2a', G:'#4f9b3d', t:'#5a4028', T:'#7a5a38' }, rows: [
  '........gggggg..........','......ggGGGGgg..........','.....gGGGGGGGGg.........',
  '....gGGGGGGGGGGg........','...gGGGGGGGGGGGGg.......','...gGGGGGGGGGGGGg.......',
  '....gGGGGGGGGGGg........','.....gGGGGGGGGg.........','......ggGGGGgg..........',
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