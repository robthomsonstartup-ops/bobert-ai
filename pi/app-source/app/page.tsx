"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {AlertTriangle,Check,ChevronRight,Clipboard,Download,FileSpreadsheet,Filter,Library,Lightbulb,Search,Settings2,ShieldCheck,Sparkles,Upload} from "lucide-react";
import {Button} from "@/components/ui/button"; import {Input} from "@/components/ui/input"; import {Badge} from "@/components/ui/badge";
import {Fixture,potbelly,valleyFord,vendorRules as defaultVendorRules,ConfigStatus} from "./configurator-data";
import {extractPdfScheduleText} from "./pdf-extract";
type VendorRule={match:string,target:string,includes:string};
const labels:Record<ConfigStatus,string>={ready:"Ready",review:"Configure",factory:"Factory check",photometric:"Photometric",keep:"Keep specified"};
const csv=(v:string|number)=>`"${String(v).replaceAll('"','""')}"`;
export default function Home(){
 const [project,setProject]=useState<string>("valley"),[rows,setRows]=useState<Fixture[]>(valleyFord),[selected,setSelected]=useState("D1"),[filter,setFilter]=useState<"all"|ConfigStatus>("all"),[query,setQuery]=useState(""),[configured,setConfigured]=useState(false),[copied,setCopied]=useState(false),[notice,setNotice]=useState(""),[noticeType,setNoticeType]=useState<"success"|"warning">("success"),[customProjects,setCustomProjects]=useState<{id:string,label:string}[]>([]),[showNewProject,setShowNewProject]=useState(false),[newProjectName,setNewProjectName]=useState(""),[showAddFixture,setShowAddFixture]=useState(false),[newFixture,setNewFixture]=useState({type:"",area:"Interior" as "Interior"|"Exterior",specified:"",specifiedCatalog:"",description:"",qty:1});
 const officeInput=useRef<HTMLInputElement>(null);
 const scheduleInput=useRef<HTMLInputElement>(null);
 const [extracting,setExtracting]=useState(false);
 const [vendorRules,setVendorRules]=useState<VendorRule[]>(defaultVendorRules);
 const [showAddRule,setShowAddRule]=useState(false);
 const [newRule,setNewRule]=useState({match:"",target:"",includes:""});
 useEffect(()=>{const saved=localStorage.getItem("bobert-vendor-rules");if(saved){try{setVendorRules(JSON.parse(saved))}catch{}}},[]);
 useEffect(()=>{localStorage.setItem("bobert-vendor-rules",JSON.stringify(vendorRules))},[vendorRules]);
 useEffect(()=>{const saved=localStorage.getItem("bobert-projects-index");if(saved){try{setCustomProjects(JSON.parse(saved))}catch{}}},[]);
 useEffect(()=>{localStorage.setItem("bobert-projects-index",JSON.stringify(customProjects))},[customProjects]);
 useEffect(()=>{const saved=localStorage.getItem(`bobert-config-${project}`);if(saved){try{const parsed=JSON.parse(saved);setRows(parsed.rows);setConfigured(parsed.configured)}catch{}}},[project]);
 useEffect(()=>{localStorage.setItem(`bobert-config-${project}`,JSON.stringify({rows,configured}))},[project,rows,configured]);
 const active=rows.find(x=>x.type===selected)||rows[0]; const visible=rows.filter(x=>(filter==="all"||x.status===filter)&&`${x.type} ${x.specified} ${x.alternate} ${x.family}`.toLowerCase().includes(query.toLowerCase()));
 const total=rows.reduce((s,x)=>s+x.qty,0), exceptions=rows.filter(x=>["review","factory","photometric"].includes(x.status)).length, ready=rows.filter(x=>["ready","keep"].includes(x.status)).length, release=exceptions===0&&rows.length>0;
 const statusCounts=useMemo(()=>Object.fromEntries((["ready","review","factory","photometric","keep"] as ConfigStatus[]).map(s=>[s,rows.filter(x=>x.status===s).length])),[rows]);
 const projectLabel=project==="valley"?"Valley Ford of Huron FS2.0":project==="potbelly"?"Potbelly Sandwich Works":(customProjects.find(p=>p.id===project)?.label||"New Project");
 function switchProject(v:string){setProject(v);const saved=localStorage.getItem(`bobert-config-${v}`);if(saved){try{const parsed=JSON.parse(saved);setRows(parsed.rows);setConfigured(parsed.configured)}catch{setRows(v==="valley"?valleyFord:v==="potbelly"?potbelly:[])}}else{setRows(v==="valley"?valleyFord:v==="potbelly"?potbelly:[]);setConfigured(v!=="valley")};setSelected(v==="valley"?"D1":v==="potbelly"?"L109":"");setFilter("all");setNotice("")}
 function notify(text:string,type:"success"|"warning"="success"){setNotice(text);setNoticeType(type)}
 function matchVendorRule(specified:string):{target:string,ruleLabel:string}|null{
  const s=specified.toLowerCase();
  for(const rule of vendorRules){
   const terms=rule.includes.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);
   if(terms.some(t=>s.includes(t))||s.includes(rule.match.toLowerCase())){return {target:rule.target,ruleLabel:rule.match}}
  }
  return null
 }
 function buildAlternatePackage(){
  let matched=0,unmatched=0;
  setRows(r=>r.map(x=>{
   if(x.alternate)return x; // already assigned (curated demo data, or previously matched) - don't clobber
   const hit=matchVendorRule(x.specified);
   if(hit){matched++;return {...x,alternate:hit.target,family:"Vendor rule match — verify specific model and catalog #",exception:`Matched vendor rule "${hit.ruleLabel}" → ${hit.target}. Confirm exact model and enter catalog #.`}}
   unmatched++;return {...x,exception:x.exception||"No vendor rule matched this manufacturer. Assign an alternate manually or add a rule."}
  }));
  setConfigured(true);
  notify(`Vendor rules applied: ${matched} matched, ${unmatched} need manual assignment.`,unmatched>0&&matched===0?"warning":"success");
 }
 function addVendorRule(){
  if(!newRule.match.trim()||!newRule.target.trim()||!newRule.includes.trim()){notify("Fill in all three fields to add a vendor rule.","warning");return}
  setVendorRules(v=>[...v,{match:newRule.match.trim(),target:newRule.target.trim(),includes:newRule.includes.trim()}]);
  setNewRule({match:"",target:"",includes:""});setShowAddRule(false);
  notify(`Rule added: ${newRule.match.trim()} → ${newRule.target.trim()}. Applies next time you build the alternate package.`)
 }
 function addProject(){const name=newProjectName.trim();if(!name){notify("Enter a project name before creating it.","warning");return}const id=`field-${Date.now()}`;setCustomProjects(p=>[...p,{id,label:name}]);setNewProjectName("");setShowNewProject(false);setRows([]);setConfigured(false);setProject(id);setSelected("");setFilter("all");notify(`${name} created. Add fixtures below as you walk the job.`)}
 function addFixture(){if(!newFixture.type.trim()){notify("Enter a fixture type before adding it.","warning");return}const row:Fixture={type:newFixture.type.trim(),area:newFixture.area,specified:newFixture.specified.trim()||"Field entry — unverified",specifiedCatalog:newFixture.specifiedCatalog.trim(),description:newFixture.description.trim(),qty:Math.max(0,newFixture.qty||0),qtySource:"Field count",alternate:"",family:"",status:"review",exception:"Added from the field; needs drawing-truth verification and alternate assignment.",requirements:[]};setRows(r=>[...r,row]);setSelected(row.type);setShowAddFixture(false);setNewFixture({type:"",area:"Interior",specified:"",specifiedCatalog:"",description:"",qty:1});notify(`${row.type} added — ${row.qty} units. Configure or keep specified next.`)}
 function updateQty(type:string,qty:number){setRows(r=>r.map(x=>x.type===type?{...x,qty:Math.max(0,qty||0),qtySource:"Manual override"}:x))}
 function updateCatalog(type:string,alternateCatalog:string){setRows(r=>r.map(x=>x.type===type?{...x,alternateCatalog,status:x.status==="keep"?"keep":"review",exception:"Catalog number entered; review before release."}:x))}
 function isPlausibleCatalogNumber(v:string):boolean{
  const s=v.trim();
  if(s.length<3)return false;
  if(!/[0-9]/.test(s))return false;
  if(!/[A-Za-z]/.test(s))return false;
  if(/^(.)\1*$/.test(s.replace(/[^A-Za-z0-9]/g,"")))return false; // rejects things like "dddd"
  return true;
 }
 function approve(type:string){const row=rows.find(x=>x.type===type);if(row?.status!=="keep"&&!row?.alternateCatalog){notify("Add a verified alternate catalog number before approving this fixture.","warning");return}if(row?.status!=="keep"&&row?.alternateCatalog&&!isPlausibleCatalogNumber(row.alternateCatalog)){notify(`"${row.alternateCatalog}" doesn't look like a real catalog number — needs letters and numbers, e.g. LD6 or HBLED12. Double-check against the manufacturer's cut sheet.`,"warning");return}setRows(r=>r.map(x=>x.type===type?{...x,status:"ready",exception:"User reviewed and approved"}:x));notify(`${type} approved and saved.`)}
 function keepSpecified(type:string){setRows(r=>r.map(x=>x.type===type?{...x,alternate:x.specified,alternateCatalog:x.specifiedCatalog,status:"keep",exception:"Retained as specified by user."}:x));notify(`${type} retained as specified.`)}
 async function importOfficeCounts(file:File){const text=await file.text();const lines=text.split(/\r?\n/).filter(Boolean);let matched=0;setRows(current=>current.map(row=>{for(const line of lines){const cells=line.split(/,|\t/).map(v=>v.trim().replace(/^"|"$/g,""));const qty=Number(cells[1]);if(cells[0]?.toUpperCase()===row.type.toUpperCase()&&Number.isFinite(qty)){matched++;return {...row,qty,qtySource:`Office count · ${file.name}`}}}return row}));notify(`${matched} office counts matched by fixture type. Unmatched rows were left unchanged.`,matched===0?"warning":"success")}
 async function extractFromSchedule(file:File){
  setExtracting(true);
  notify(`Reading ${file.name}…`);
  try{
   const extracted=await extractPdfScheduleText(file);
   if(extracted.mode==="none"){notify("No fixture schedule pages detected in this PDF. Try a different file, or use \"Add fixture\" to enter it manually.","warning");return}
   if(extracted.mode==="manual-fallback"){notify(`Schedule pages (${extracted.schedulePageNums.join(", ")}) found but too large to auto-extract. Try a smaller PDF with just the schedule sheet.`,"warning");return}
   notify(`Found schedule content on page(s) ${extracted.schedulePageNums.join(", ")} of ${extracted.totalPages}. Extracting fixtures…`);
   const res=await fetch("/api/extract-schedule",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:extracted.text})});
   const data=await res.json() as {fixtures?:{type?:string,area?:string,specified?:string,specifiedCatalog?:string,description?:string,qty?:number,confidence?:string}[],error?:string};
   if(!res.ok||data.error){notify(data.error||`Extraction failed (${res.status}).`,"warning");return}
   const found=data.fixtures||[];
   if(found.length===0){notify("No fixture rows extracted with confidence. This drawing may need manual entry via \"Add fixture.\"","warning");return}
   const newRows:Fixture[]=found.map(f=>({
    type:String(f.type||"").trim()||"?",area:f.area==="Exterior"?"Exterior":"Interior",
    specified:String(f.specified||"").trim()||"Unclear from drawing",specifiedCatalog:String(f.specifiedCatalog||"").trim(),
    description:String(f.description||"").trim(),qty:Number(f.qty)||0,qtySource:`PDF extraction · ${file.name}`,
    alternate:"",family:"",status:"review",
    exception:`Extracted from drawing (${f.confidence||"unknown"} confidence) — verify against source before approving.`,requirements:[],
   }));
   setRows(r=>[...r,...newRows]);setConfigured(false);
   const low=newRows.filter(r=>r.exception.includes("low confidence")).length;
   notify(`${newRows.length} fixture type(s) extracted from ${file.name}.${low?` ${low} flagged low-confidence.`:""} Verify every row against the drawing before approving.`,low>0?"warning":"success");
  }catch(err){notify(`Extraction error: ${(err as Error).message}`,"warning")}
  finally{setExtracting(false)}
 }
 const bom=rows.map(x=>[x.type,x.alternate,x.alternateCatalog||"",x.family,x.description,x.qty,x.qtySource,labels[x.status]].map(csv).join(","));
 const fileSlug=projectLabel.replace(/[^a-z0-9]+/gi,"-").replace(/^-+|-+$/g,"");
 function download(){const blob=new Blob([["TYPE","MANUFACTURER","CATALOG #","FAMILY","DESCRIPTION","QTY","QTY SOURCE","STATUS"].map(csv).join(",")+"\n"+bom.join("\n")],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${fileSlug}-Alternate-BOM.csv`;a.click();URL.revokeObjectURL(a.href)}
 function createQuote(){if(!release)return;const quoteRows=rows.map(x=>[x.type,x.alternate,x.alternateCatalog||x.specifiedCatalog,"",x.description,x.qty].map(csv).join(","));const blob=new Blob([["TYPE","MANUFACTURER","CATALOG #","DIM","DESCRIPTION","QTY"].map(csv).join(",")+"\n"+quoteRows.join("\n")],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${fileSlug}-Company-Quote-Import.csv`;a.click();URL.revokeObjectURL(a.href);setNotice("Released quote-import file created from approved alternates only.")}
 async function copy(){await navigator.clipboard.writeText(rows.map(x=>`${x.type}\t${x.alternate}\t${x.family}\t\t${x.description}\t${x.qty}`).join("\n"));setCopied(true);setTimeout(()=>setCopied(false),1200)}
 return <main className="app-shell"><aside className="sidebar"><div className="brand"><span>B</span>bobert.ai</div><p>LIGHTING INTELLIGENCE</p><nav><button className="active"><Lightbulb/>Configurator</button><button><Library/>Knowledge</button><button><ShieldCheck/>Reviews</button><button><FileSpreadsheet/>Exports</button></nav><div className="side-note"><Sparkles/><strong>Shared company brain</strong><small>Every verified job improves the next one.</small></div></aside>
 <section className="workspace"><header className="topbar"><div><small>ACTIVE PROJECT</small><select value={project} onChange={e=>{const v=e.target.value;if(v==="__new__"){setShowNewProject(true)}else{switchProject(v)}}}><option value="valley">Valley Ford of Huron FS2.0</option><option value="potbelly">Potbelly — verified baseline</option>{customProjects.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}<option value="__new__">+ New project…</option></select></div><div className="top-actions"><input ref={officeInput} hidden type="file" accept=".csv,.tsv,.txt" onChange={e=>e.target.files?.[0]&&importOfficeCounts(e.target.files[0])}/><input ref={scheduleInput} hidden type="file" accept="application/pdf" onChange={e=>{const f=e.target.files?.[0];if(f)extractFromSchedule(f);e.target.value=""}}/><Button variant="outline" onClick={()=>scheduleInput.current?.click()} disabled={extracting}><Upload/>{extracting?"Extracting…":"Upload schedule (PDF)"}</Button><Button variant="outline" onClick={()=>officeInput.current?.click()}><Upload/>Import office counts</Button><Button variant="outline" onClick={copy}><Clipboard/>{copied?"Copied":"Copy quote rows"}</Button><Button onClick={download} disabled={rows.length===0}><Download/>Export BOM</Button></div></header>{notice?<div className={`notice page-notice ${noticeType==="warning"?"notice-warning":""}`}>{noticeType==="warning"?<AlertTriangle style={{width:14,height:14,marginRight:6,display:"inline-block",verticalAlign:"-2px"}}/>:null}{notice}</div>:null}
 {showNewProject?<div className="notice page-notice" style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><Input placeholder="Project name (e.g. Main Street Dealership — Springfield)" value={newProjectName} onChange={e=>setNewProjectName(e.target.value)} style={{maxWidth:360}}/><Button onClick={addProject}>Create project</Button><Button variant="outline" onClick={()=>{setShowNewProject(false);setNewProjectName("")}}>Cancel</Button></div>:null}
 <div className="content"><section className="project-head"><div><p className="eyebrow">{project==="valley"?"CJI CONSTRUCTION · BID SET 07/30/2026":project==="potbelly"?"VERIFIED PILOT":"FIELD INTAKE"}</p><h1>{projectLabel}</h1><p>{project==="valley"?"1530 Berlin Road, Huron, OH · Alternate package · Counts from drawing takeoff":project==="potbelly"?"Locked baseline used to validate the full workflow":rows.length===0?"No fixtures yet — add them below as you walk the job.":"Field-entered fixtures · verify drawing truth and assign alternates"}</p></div><Button size="lg" onClick={buildAlternatePackage} disabled={configured}><Sparkles/>{configured?"Rules applied":"Build alternate package"}</Button></section>
 <section className="pipeline"><div className="done"><Check/>Intake</div><ChevronRight/><div className="done"><Check/>Drawing truth</div><ChevronRight/><div className={configured?"done":"current"}>{configured?<Check/>:<Settings2/>}Configure</div><ChevronRight/><div className={configured?"current":""}>Review exceptions</div><ChevronRight/><div className={release?"done":"locked"}>Excel quote</div></section>
 <section className="metrics"><article><strong>{rows.length}</strong><span>Fixture types</span></article><article><strong>{total}</strong><span>Total units</span></article><article><strong>{configured?ready:0}</strong><span>Assigned / retained</span></article><article className={exceptions?"warn":"good"}><strong>{configured?exceptions:"—"}</strong><span>Exceptions to review</span></article></section>
 {!configured?<section className="launch-card"><Sparkles/><div><h2>Drawing truth is ready</h2><p>One click applies LPA CSI's vendor rules to the schedule, assigns preferred manufacturers, and preserves unmatched decorative fixtures.</p></div><Button onClick={buildAlternatePackage}>Build alternates</Button></section>:null}
 <section className="rules"><div><Settings2/><strong>Preferred vendor rules</strong></div>{vendorRules.map(r=><span key={r.match}>{r.match}<ChevronRight/><b>{r.target}</b></span>)}<Button variant="outline" onClick={()=>setShowAddRule(v=>!v)}>+ Add rule</Button></section>
 {showAddRule?<div className="launch-card"><Settings2/><div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",width:"100%"}}>
 <Input placeholder="Rule label (e.g. Signify brands)" value={newRule.match} onChange={e=>setNewRule(r=>({...r,match:e.target.value}))} style={{maxWidth:200}}/>
 <Input placeholder="Target manufacturer (e.g. LSI)" value={newRule.target} onChange={e=>setNewRule(r=>({...r,target:e.target.value}))} style={{maxWidth:160}}/>
 <Input placeholder="Match terms, comma-separated (e.g. Lightolier, Gardco)" value={newRule.includes} onChange={e=>setNewRule(r=>({...r,includes:e.target.value}))} style={{maxWidth:320}}/>
 <Button onClick={addVendorRule}>Add rule</Button>
 </div></div>:null}
 <section className="work-grid"><article className="table-card"><div className="toolbar"><div><h2>Configurator</h2><p>Automation handles the normal path. Review only flagged exceptions.</p></div><div className="search"><Search/><Input placeholder="Search fixtures" value={query} onChange={e=>setQuery(e.target.value)}/></div><Button variant="outline" onClick={()=>setShowAddFixture(v=>!v)}><Upload/>Add fixture</Button></div>
 {showAddFixture?<div className="launch-card"><Sparkles/><div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",width:"100%"}}>
 <Input placeholder="Type (e.g. A1)" value={newFixture.type} onChange={e=>setNewFixture(f=>({...f,type:e.target.value}))} style={{maxWidth:120}}/>
 <select value={newFixture.area} onChange={e=>setNewFixture(f=>({...f,area:e.target.value as "Interior"|"Exterior"}))}><option value="Interior">Interior</option><option value="Exterior">Exterior</option></select>
 <Input placeholder="Specified manufacturer" value={newFixture.specified} onChange={e=>setNewFixture(f=>({...f,specified:e.target.value}))} style={{maxWidth:200}}/>
 <Input placeholder="Specified catalog #" value={newFixture.specifiedCatalog} onChange={e=>setNewFixture(f=>({...f,specifiedCatalog:e.target.value}))} style={{maxWidth:220}}/>
 <Input placeholder="Description" value={newFixture.description} onChange={e=>setNewFixture(f=>({...f,description:e.target.value}))} style={{maxWidth:220}}/>
 <Input type="number" placeholder="Qty" value={newFixture.qty} onChange={e=>setNewFixture(f=>({...f,qty:+e.target.value}))} style={{maxWidth:90}}/>
 <Button onClick={addFixture}>Add</Button>
 </div></div>:null}
 <div className="filters"><button className={filter==="all"?"on":""} onClick={()=>setFilter("all")}><Filter/>All {rows.length}</button>{(["ready","review","factory","photometric","keep"] as ConfigStatus[]).map(s=><button key={s} className={filter===s?"on":""} onClick={()=>setFilter(s)}>{labels[s]} {statusCounts[s]}</button>)}</div>
 {rows.length===0?<div className="table-wrap"><p style={{padding:24,textAlign:"center",opacity:0.7}}>No fixtures yet. Click "Add fixture" above to start entering what's on the schedule or what you're seeing on site.</p></div>:<div className="table-wrap"><table><thead><tr><th>Type</th><th>Drawing truth</th><th>Preferred alternate</th><th>Qty</th><th>Status</th></tr></thead><tbody>{visible.map(x=><tr key={x.type} className={selected===x.type?"selected":""} onClick={()=>setSelected(x.type)}><td><b>{x.type}</b><small>{x.area}</small></td><td><b>{x.specified}</b><small>{x.description}</small></td><td><b>{configured?x.alternate||"Not assigned":"Pending"}</b><small>{configured?x.family||"Enter alternate catalog #":"Run configurator"}</small></td><td><Input type="number" value={x.qty} onClick={e=>e.stopPropagation()} onChange={e=>updateQty(x.type,+e.target.value)}/><small>{x.qtySource}</small></td><td><Badge className={`status ${configured?x.status:"pending"}`}>{configured?labels[x.status]:"Pending"}</Badge></td></tr>)}</tbody></table></div>}</article>
 {active?<aside className="review"><div className="review-top"><span>{active.type}</span><Badge className={`status ${active.status}`}>{labels[active.status]}</Badge></div><h2>{active.alternate||"No alternate assigned yet"}</h2><p className="family">{active.family}</p><div className="truth"><small>SPECIFIED BASIS</small><strong>{active.specified}</strong><code>{active.specifiedCatalog}</code></div><div className="catalog-entry"><small>VERIFIED ALTERNATE CATALOG #</small><Input value={active.alternateCatalog||""} onChange={e=>updateCatalog(active.type,e.target.value)} placeholder="Enter or paste confirmed catalog number"/></div><div className="requirements"><small>NORMALIZED REQUIREMENTS</small>{active.requirements.map(r=><span key={r}>{r}</span>)}</div><div className={`exception ${active.status}`}><AlertTriangle/><div><small>AUTOMATION DECISION</small><p>{active.exception||"No exception recorded."}</p></div></div><div className="source"><ShieldCheck/><p><b>Quantity traceable</b><br/>{active.qty} units · {active.qtySource}</p></div>{!["ready","keep"].includes(active.status)?<div className="review-actions"><Button variant="outline" onClick={()=>keepSpecified(active.type)}>Keep specified</Button><Button onClick={()=>approve(active.type)}><Check/>Approve alternate</Button></div>:<Button className="full" variant="outline"><Check/>Ready for BOM</Button>}</aside>:null}</section>
 <section className={`release ${release?"open":"blocked"}`}><div>{release?<ShieldCheck/>:<AlertTriangle/>}<div><h2>{release?"Company quote export ready":"Company quote export is protected"}</h2><p>{release?"All fixture lines passed review and can be written into the locked quote template.":`${exceptions} fixture types still need configuration, factory confirmation, or photometric review. Review CSV remains available.`}</p></div></div><Button disabled={!release} onClick={createQuote}><FileSpreadsheet/>Create quote import</Button></section>
 </div></section></main>}
