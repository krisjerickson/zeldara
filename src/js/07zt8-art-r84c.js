// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt8-art-r84c.js — round 84c: THE HERO, PAINTED LARGE, FOR THE INVENTORY (Kris: "we also need a higher res image of the hero for the
// ║ inventory. it looks out of focus right now, i believe because it becomes a zoomed in view of a small sprite. let's make this for both
// ║ heros").
// ║  Wave 92 — Zeldor and Zeldara standing, full length, painted large (stored at about 520 px tall — the inventory shows them at 300,
// ║            twice that on a sharp screen). 22c-inventory.js draws hero_portrait_m / _f when they are in; until then the walking
// ║            sprite, as today.
// ║ Order: .\tools\sprites\redo.ps1 -Ids sc_hero_portrait   (or tools\sprites\round84c.ps1)
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[92]='Round 84c — the heroes painted large for the inventory';
  var POSE='standing full length in a relaxed, ready three-quarter pose facing the viewer, feet together on the ground, the whole figure from the top of the head to the soles of the boots in frame, nothing cut off; plain travelling clothes as in the reference (no extra armour, no weapon in hand), painted in much finer detail than the small walking sprite — the face, hair, eyes, stitching, belt buckle and boot laces all crisp; a soft rim light of faint light-blue rune glow (#6fe3f5) on one side';
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    {id:'sc_hero_portrait',wave:92,fam:'interior',kind:'obj',cols:2,rows:1,size:'1536x1024',refs:['hero_m.model','hero_f.model'],title:'The heroes painted large — Zeldor and Zeldara, standing, for the inventory',items:[
      ['hero_portrait_m','Zeldor, painted large','Zeldor — the young man in the hero reference, an adult (spiky brown hair, the same face, colours and clothes), '+POSE,180,260],
      ['hero_portrait_f','Zeldara, painted large','Zeldara — the young woman in the hero reference, an adult (long auburn braids, the same face, colours and clothes), '+POSE,180,260]]}]);
})();
