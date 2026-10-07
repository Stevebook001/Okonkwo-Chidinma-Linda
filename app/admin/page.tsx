export default function Admin() {
  return <main><header className="nav"><a className="brand" href="/"><span className="brandMark">+</span><span>OCL <b>Health</b></span></a><a className="navButton" href="/">View website</a></header><section className="adminHero"><span className="eyebrow">OCL CONTROL CENTER</span><h1>Admin dashboard foundation</h1><p>This is the first dashboard shell. Authentication, team roles, database-backed products, blog publishing, price updates, enquiries and analytics should be connected before production use.</p><div className="adminGrid">{[
    ["Products","Add products, upload images, edit descriptions, prices and availability."],
    ["Blog","Create, edit, schedule and publish health articles."],
    ["Team","Invite authorised staff with role-based permissions."],
    ["Newsletter","View subscribers and connect an approved email provider."],
    ["Analytics","Monitor visitors, popular articles, product interest and enquiries."],
    ["AdSense","Manage the site preparation and ad placements after Google approval."]
  ].map(([a,b]) => <article key={a}><span>01</span><h2>{a}</h2><p>{b}</p><button>Module planned</button></article>)}</div></section></main>;
}
