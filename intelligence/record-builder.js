/* Bobert Intelligence Record Builder
 * Deterministic first pass: turns captured evidence into a reviewable record.
 * It only promotes information explicitly present in the capture.
 */
(function(global){
  function id(prefix){ return prefix+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8); }
  function clean(v){ return String(v||'').trim(); }
  function addClaim(record,text,evidenceId){ if(text && !record.claims.some(c=>c.text===text)) record.claims.push({claim_id:id('claim'),text,status:'verified',confidence:'high',evidence_ids:[evidenceId],notes:'Captured from source; review wording before external use.'}); }
  function addSignal(record,text,evidenceId){ if(text && !record.signals.some(s=>s.text===text)) record.signals.push({signal_id:id('sig'),text,status:'observed',confidence:'high',evidence_ids:[evidenceId]}); }
  function build(input){
    const raw=clean(input.raw), now=input.captured_at||new Date().toISOString();
    const record={record_id:id('rec'),captured_at:now,inputs:[{type:input.type||'manual_entry',source:input.source||'Sales OS',source_url:input.source_url||'',captured_by:input.captured_by||'Rob'}],entities:{accounts:[],contacts:[],projects:[],organizations:[],locations:[]},claims:[],signals:[],evidence:[{evidence_id:id('ev'),type:input.evidence_type||'capture',source:input.source||'Sales OS',url:input.source_url||'',supports:raw,captured_at:now}],research_questions:[],recommended_actions:[]};
    const evidenceId=record.evidence[0].evidence_id;
    if(clean(input.account_hint)) record.entities.accounts.push({name:clean(input.account_hint),type:'account',source:'user_capture',confidence:'high'});
    if(clean(input.contact_hint)) record.entities.contacts.push({name:clean(input.contact_hint),type:'contact',source:'user_capture',confidence:'high'});
    if(raw) addClaim(record,raw,evidenceId);
    const lower=raw.toLowerCase();
    const patterns=[[/purchase(?:s|d)? (?:the )?lights? through (?:the )?electrical subcontractors?/i,'Lighting is purchased through electrical subcontractors.'],[/through (?:the )?electrical subcontractors?/i,'Lighting purchasing is routed through electrical subcontractors.'],[/design teams? (?:are )?(?:the ones )?specif(?:y|ying|ies)/i,'Design teams specify lighting.'],[/we don.?t purchase direct/i,'The organization does not purchase lighting direct.'],[/handled at the project level/i,'Lighting responsibility is handled at the project level.'],[/central(?:ized|ised) (?:procurement|purchasing)/i,'Procurement is centralized.'],[/different designer every job/i,'Design responsibility may vary by project.']];
    patterns.forEach(([re,text])=>{if(re.test(raw)){addClaim(record,text,evidenceId);addSignal(record,text,evidenceId);}});
    if(/electrical subcontractor|\bec\b|electrical sub/i.test(lower)) record.research_questions.unshift({question:'Which electrical contractors are the recurring partners?',priority:'high',status:'open',reason:'The capture explicitly routes purchasing through electrical contractors.'});
    if(/design team|designer|specif/i.test(lower)) record.research_questions.unshift({question:'Which design firms or designers are recurring specifiers?',priority:'high',status:'open',reason:'The capture explicitly identifies design as part of the lighting decision.'});
    ['Who specifies lighting?','Who purchases lighting?','Is procurement centralized or project based?','What current project or growth signal makes this worth pursuing now?'].forEach(q=>{if(!record.research_questions.some(x=>x.question===q)) record.research_questions.push({question:q,priority:'normal',status:'open',reason:'Not established by the capture alone.'});});
    const first=record.research_questions[0];
    record.recommended_actions.push({action:first?'Resolve: '+first.question:'Review captured evidence.',reason:'Prioritize the next question that can materially improve account intelligence.',evidence_ids:[evidenceId],status:'recommended'});
    return record;
  }
  global.BobertIntelligence={build:build};
})(window);
