/* Manual-supported adjustment audit for Alabama Index Study Manager.
   Reference: Alabama Appraisal Manual (2015), Ch. 9 pp.9-8, 9-21, 9-23.
   This does NOT determine a full base-rate or replacement cost. */
(function () {
  'use strict';
  const framing12 = {'Timber':10,'Open steel':18,'Fireproof steel':35,'Reinforced concrete':25};
  const finit = v => v !== undefined && v !== null && String(v).trim() !== '' && Number.isFinite(Number(v)) ? Number(v) : NaN;
  function esc2(v) {return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function units(x){return Number.isFinite(x)?String(Math.round(x)):'Not calculated';}
  function audit(s){
    const L=finit(s.length),W=finit(s.width),S=finit(s.stories),wall=finit(s.exteriorWallUnits),shared=finit(s.sharedWallLength),height=finit(s.wallHeight),stall=finit(s.stallWidth);
    const perimeter=L>0&&W>0?2*(L+W):NaN;
    const validParty=Number.isFinite(perimeter)&&Number.isFinite(wall)&&wall>=0&&Number.isFinite(shared)&&shared>=0&&shared<=perimeter;
    // Manual rounds effective-perimeter ratio to whole percent before applying exterior-wall units.
    const partyPct=validParty?Math.round(100*(perimeter-shared/2)/perimeter)/100:NaN;
    const adjustedWall=validParty?Math.round(wall*partyPct):NaN;
    const normalHeight=Number.isInteger(S)&&S>=1&&S<=30?S*10+2:NaN; // Table 23
    const heightUnits=Number.isFinite(adjustedWall)&&Number.isFinite(height)&&height>0&&Number.isFinite(normalHeight)?Math.round(adjustedWall*height/normalHeight)-adjustedWall:NaN;
    const frame=(Number.isInteger(S)&&S>=1&&S<=2&&Object.hasOwn(framing12,s.framing))?framing12[s.framing]:NaN;
    const stallUnits=Number.isFinite(stall)&&stall>=10?(stall<=10?12:stall<=15?10:stall<=20?7:stall<=25?6:stall<=30?4:1):NaN;
    return {partyPct,adjustedWall,heightUnits,frame,stallUnits,normalHeight};
  }
  const previous = renderEditor;
  renderEditor = function(){
    previous();
    const s=current(),a=audit(s),target=document.getElementById('prcEditor');
    const box=document.createElement('section');box.className='subtlebox';
    box.innerHTML='<h3>Commercial adjustments — manual reference</h3>'+
      '<p style="font-size:12px">Preliminary construction-unit checks only. These do <strong>not</strong> establish base-year replacement cost; verify the manual tables, applicable building type, and rate schedule.</p>'+
      '<div class="field"><label>Exterior-wall construction units before adjustment (Table 20)</label><input type="number" min="0" step="1" data-audit="exteriorWallUnits" value="'+esc2(s.exteriorWallUnits||'')+'"></div>'+
      '<div class="field"><label>Shared party-wall length (feet)</label><input type="number" min="0" step="0.1" data-audit="sharedWallLength" value="'+esc2(s.sharedWallLength||'')+'"></div>'+
      '<table style="font-size:12px;width:100%;border-collapse:collapse"><tr><td>Party-wall-adjusted exterior units</td><td><b>'+units(a.adjustedWall)+'</b></td></tr>'+
      '<tr><td>Height adjustment (Table 23, p.9-21)</td><td><b>'+units(a.heightUnits)+'</b></td></tr>'+
      '<tr><td>Framing units (Table 22, p.9-21)</td><td><b>'+(Number.isFinite(a.frame)?a.frame:'Verify Table 22 manually')+'</b></td></tr>'+
      '<tr><td>Retail stall partition units (Table 27, p.9-23)</td><td><b>'+units(a.stallUnits)+'</b></td></tr></table>'+
      '<p style="font-size:11px">Shared wall: Ch.9 p.9-8. The manual applies party-wall adjustment before height. Table 27 applies to qualifying retail stall configurations; multistory use requires additional assessment. For stalls under 10 feet or other framing story groups, consult the manual.</p>';
    target.appendChild(box);
    box.querySelectorAll('[data-audit]').forEach(el=>el.addEventListener('change',()=>{s[el.dataset.audit]=el.value;renderAll()}));
  };
  const warning='The current PRC template image includes values/checkmarks from an example. The printed front/back are not clean blank cards and field alignment is not fully verified. Use for testing only until templates are corrected.';
  const cardWarning=document.querySelector('#prcView .preview .notice');
  if(cardWarning){cardWarning.textContent=warning;cardWarning.style.background='#fff3cd';cardWarning.style.border='1px solid #e3b75c';cardWarning.style.color='#674c00';}
  const printDescription=document.querySelector('#printView .headline p');
  if(printDescription){printDescription.textContent='Print to PDF for review. WARNING: The source PRC forms still contain example values/checkmarks; do not use as an official completed PRC.';}
  const oldDoPrint=doPrint;
  doPrint=function(){if(confirm(warning+'\n\nContinue to print a TEST copy?'))oldDoPrint();};
  renderEditor();
})();
