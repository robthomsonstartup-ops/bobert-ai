/* Bobert Intelligence Record Builder
 * Deterministic first pass: turns captured evidence into a reviewable record.
 * It does not invent facts. AI/web research can be added later as separate evidence.
 */
(function(global){
  function id(prefix){ return prefix+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8); }
  function clean(v){ return String(v||'').trim(); }
  function build(input){
    const raw=clean(input.raw);
    const now=input.captured_at||new Date().toISOString();
    const evidenceId=id('ev');
    const record={
      record_id:id('rec'), captured_at:now,
      inputs:[{type:input.type||'manual_entry',source:input.source||'Sales OS',source_url:input.source_url||'',captured_by:input.captured_by||'Rob'}],
      entities:{accounts:[],contacts:[],projects:[],organizations:[],locations:[]},
      claims:[],signals:[],
      evidence:[{evidence_id:evidenceId,type:input.evidence_type||'capture',source:input.source||'Sales OS',url:input.source_url||'',supports:raw,captured_at:now}],
      research_questions:[],recommended_actions:[]
    };
    if(clean(input.account_hint)) record.entities.accounts.push({name:clean(input.account_hint),type:'account',source:'user_capture',confidence:'high'});
    if(clean(input.contact_hint)) record.entities.contacts.push({name:clean(input.contact_hint),type:'contact',source:'user_capture',confidence:'high'});
    if(raw) record.claims.push({claim_id:id('claim'),text:raw,status:'verified',confidence:'high',evidence_ids:[evidenceId],notes:'Captured verbatim; review wording before external use.'});
    const qs=['Who specifies lighting?','Who purchases lighting?','Is procurement centralized or project based?','What current project or growth signal makes this worth pursuing now?'];
    qs.forEach(q=>record.research_questions.push({question:q,priority:'normal',status:'open',reason:'Not established by the capture alone.'}));
    record.recommended_actions.push({action:'Review captured evidence and resolve the highest-value open question.',reason:'The record contains evidence but should not infer missing account intelligence.',evidence_ids:[evidenceId],status:'recommended'});
    return record;
  }
  global.BobertIntelligence={build:build};
})(window);
