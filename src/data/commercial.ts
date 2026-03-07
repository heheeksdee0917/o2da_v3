import type { Project } from './mockData';

export const commercialProjects: Project[] = [
  //  Botanic Centre
  {
    id: 1,
    slug: 'botanic-centre',
    title: 'Botanic Central',
    location: 'Temerloh, Pahang',
    category: 'Commercial',
    status: 'Submission',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn', 'Woon Zhi Zheng', 'Danish Azhan'],
    images: [
      '/Gallery/Housing/BahagiaCentre/CP.avif',
      '/Gallery/Housing/BahagiaCentre/A1.avif',
      '/Gallery/Housing/BahagiaCentre/A2.avif',
      '/Gallery/Housing/BahagiaCentre/A3.avif',
      '/Gallery/Housing/BahagiaCentre/A4.avif',
    ],
    detailContent: [
      { type: 'text', content: 'Botanic Central is positioned within a fast-growing peri-urban corridor where commercial growth tends to arrive as familiar, repeatable shop-office blocks: wide service roads, recessed canopies, and full-width glazing that is later overwhelmed by ad-hoc signboards and banners. The prevalence of this typology exposes a disciplinary gap—signage is rarely given an architectural place, so tenants colonise every available surface, flattening the façade into visual noise while masking glazing that should support display, daylight, and ventilation. This project accepts the two-storey shop-office as an efficient urban instrument, then refines its public face by treating branding as a designed layer rather than an afterthought.' },
      { type: 'text', content: 'The precinct is organised by rhythm, depth, and a clear signage hierarchy. Bold cubic upper volumes act as calibrated frames to the street, thickening the façade into legible planes sized to host tenant identity without spilling into openings. A three-tier system is embedded within this composition: primary tenant panels are reserved on the main upper planes for high-visibility identification; a continuous secondary sign band is aligned as a consistent datum for smaller names and wayfinding; and vertical lot markers are confined to recesses and party-wall seams to register individual units and stairs. By fixing where graphics may land, the architecture preserves windows as windows and signage as signage—improving readability from the road while protecting façade performance from the common cycle of over-application.' },
      { type: 'text', content: 'Arrival is staged through a clear hierarchy of markers and edges, where a darker base plane anchors the row, accommodating shutters, entries, and shopfronts as a robust, serviceable datum. Ground-floor glazing is protected as the commercial interface, kept clear of primary signage so display and visibility remain intact, while louvres and deep reveals moderate sun and glare. Across the elevation, the white blocks are set in a four-step height variation—enough to give each unit a distinct beat and a livelier streetscape, while remaining robust and repeatable for cost control and long-term coherence.' },
      { type: 'text', content: 'Above, upper-floor openings are set back and screened to reduce heat gain and glare, and to remain visually subordinate to the primary sign fields. The façade therefore performs as a controlled framework: it grants tenants generous branding capacity, but only within zones that preserve legibility, protect glazing, and maintain a coherent street edge over time.' },
      { type: 'text', content: 'Botanic Central therefore delivers a retail environment that is functional, legible, and resilient. By formalising the shop-office typology through shading depth and an integrated signage framework, the precinct can accommodate tenant turnover without visual disorder, holding a clear architectural identity within the everyday flux of commercial life.' },
    ],
  },
  //Community Centre
  {
    id: 2,
    slug: 'community-centre',
    title: 'Community Center',
    location: 'Taman Desa, Kuala Lumpur',
    category: 'Commercial',
    status: 'Proposal',
    projectTeam: ['Edric Choo Poo Liang'],
    images: [
      '/Gallery/Commercial/CommunityCenter/CP.avif',
      '/Gallery/Commercial/CommunityCenter/A1.avif',
      '/Gallery/Commercial/CommunityCenter/A2.avif',
      '/Gallery/Commercial/CommunityCenter/A3.avif',
      '/Gallery/Commercial/CommunityCenter/A4.avif',
      '/Gallery/Commercial/CommunityCenter/A5.avif',
      '/Gallery/Commercial/CommunityCenter/A6.avif',
      '/Gallery/Commercial/CommunityCenter/A7.avif',
      '/Gallery/Commercial/CommunityCenter/A8.avif',
      '/Gallery/Commercial/CommunityCenter/A9.avif',
    ],
    detailContent: [
      {
        type: 'text',
        content: 'Set within a broad municipal field, Taman Desa Community Hall is conceived as a shared room for the neighbourhood. The site is read less as a street edge than as an open commons: a lawn edged by trees, crossed by simple paths, and complemented by adjacent covered courts. In this setting, the hall must operate as both destination and backdrop, offering shelter for informal waiting and socialising, and an interior that can absorb the density of weddings, cultural celebrations, and community assemblies. Rather than compete with the openness of the field, the building gives it an address—an inhabitable edge of shade, threshold, and gathering.'
      },
      {
        type: 'text',
        content: 'The architecture breaks the massing into a sequence of folded white planes—thick “pages” that tilt and separate to produce a recognisable silhouette while behaving as climatic devices. Between these folds, narrow vertical slots admit controlled daylight and break the long elevations into shaded intervals. Deep roof edges and continuous eaves extend the protective perimeter, keeping circulation usable during downpours and tempering glare in midday sun. A timber-lined entry volume is inserted as a warmer counterpoint, turning the façade into a civic proscenium, where the hall’s identity is articulated through an abstracted Chinese register: an inclined signboard, layered timber screens, and a lifted eave line align into a legible ceremonial frontage.'
      },
      {
        type: 'text',
        content: 'Approach is deliberately legible. Paths converge toward a shaded forecourt beneath the extended eave, where crowds can gather, queue, and spill outward before and after events. The timber portal compresses the threshold, then releases into a tall, column-free interior—scaled for collective occupation rather than fixed seating. A robust ceiling grid, high-level openings, and clear floor geometry allow the room to shift quickly between badminton games, banquet settings, community briefings, and festive performances. A stage anchors one end as a constant point of orientation, while service bands and side stairs are consolidated to keep the hall clear, adaptable, and straightforward to manage during large events.'
      },
      {
        type: 'text',
        content: 'Taman Desa Community Hall treats architecture as an infrastructure of togetherness. Through disciplined massing, deep shade, and a calibrated sequence from field to veranda to hall, it offers a quiet, durable venue—one that supports the intensity of celebration days and the steady cadence of everyday community use without relying on spectacle.'
      },
    ],
  },
  // UNO Rivertree Signature (Bukit Raja)
  {
    id: 3,
    slug: 'uno-rivertree-bukit-raja',
    title: 'UNO Rivertree Signature',
    location: 'Bukit Raja, Klang',
    category: 'Commercial',
    status: 'Completed',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn','Ny Yu Heng','Yi Mian'],
    accolades: [
      'Asia Pacific Property Awards 2021-2022 (Retail Development Malaysia)',
      'Asia Pacific Property Awards 2021-2022 (Best Development Marketing Malaysia)',
      'PropertyGuru Asia Property Awards 2020 (Best Retail Development)',
    ],
    images: [
      '/Gallery/Commercial/UnoBukitRaja/CP.avif',
      '/Gallery/Commercial/UnoBukitRaja/A1.avif',
      '/Gallery/Commercial/UnoBukitRaja/A2.avif',
      '/Gallery/Commercial/UnoBukitRaja/A3.avif',
      '/Gallery/Commercial/UnoBukitRaja/A4.avif',
      '/Gallery/Commercial/UnoBukitRaja/A5.avif',
      '/Gallery/Commercial/UnoBukitRaja/A6.avif',
    ],
    detailContent: [
      {
        type: 'text',
        content: 'The Uno retail development aim to lift the standard of shop lot retail to more exclusive and high-end design by having full height shopfront glass façade with high ceiling space and mezzanine floor inspired by the exclusive shopping mall shopfront. The idea is to move away from the conventional solid wall, small windows and unorganized signage placement in typical retail shop lot.'
      },
      {
        type: 'text',
        content: 'For the one storey retail, the glass façade has been designed with various sizes and heights to give variation to the façade. The two storey retail has a mezzanine floor with glass balustrade at first floor level to give a sense of openness and transparency to the retail interior. The mezzanine floor is designed to be a social gathering space for office tenants, a coffee break area with great view into the centre of the UNO commercial plaza.'
      },
      {
        type: 'text',
        content: 'The UNO retail development has a central plaza at the middle of single storey retail shop area. It is a place where visitors transit between rows of retail blocks and celebration or large commercial events can take place at this flexible multipurpose public space.'
      },
    ],
  },
  // Sentul Works
  {
    id: 4,
    slug: 'sentul-works',
    title: 'Sentul Works',
    location: 'Sentul, Kuala Lumpur',
    category: 'Commercial',
    status: 'Completed',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    accolades: [
      'Malaysia Fiabsi Award Heritage & Office Category (Winner)',
      'World Architecture Festival Award 2022 (Finalist)'
    ],
    images: [
      '/Gallery/Commercial/SentulWorks/CP.avif',
      '/Gallery/Commercial/SentulWorks/A1.avif',
      '/Gallery/Commercial/SentulWorks/A2.avif',
      '/Gallery/Commercial/SentulWorks/A3.avif',
      '/Gallery/Commercial/SentulWorks/A4.avif',
      '/Gallery/Commercial/SentulWorks/A5.avif',
      '/Gallery/Commercial/SentulWorks/A6.avif',
      '/Gallery/Commercial/SentulWorks/A7.avif',
      '/Gallery/Commercial/SentulWorks/A8.avif',
      '/Gallery/Commercial/SentulWorks/A9.avif',
      '/Gallery/Commercial/SentulWorks/A10.avif',
      '/Gallery/Commercial/SentulWorks/A11.avif',
      '/Gallery/Commercial/SentulWorks/A12.avif',
    ],
    detailContent: [
      { type: 'text', content: 'Sentul Park is nestled within the extended park setting of Sentul Park in Sentul West, Kuala Lumpur, Malaysia where the Federated Malay State Railway (FMSR) rail complexes were established in 1904. The century-old colonial building was formerly the headquarters of FMSR under British rule.'},
      { type: 'text', content: 'For years, this colonial building with its distinctive brick-and-concrete arched-colonnades façade stood prominently as a hollow shell amidst the leafy canopy of the park’s big old trees until YTL land Design Group spearheaded its restoration to create a unique atmosphere for a compatible new use as a modern office building. The brief to the architect was to ensure that building adaptations do not deviate materially from the building’s original architecture. The “new” must not overwhelm the “old” as ideally, both elements should coexist to express a fresh aesthetic to the building’s age and heritage.'},
      { type: 'text', content: 'The original layout of the Sentul Works consists of 2 main spaces separated by a central double volume hallway. Adapting to the original symmetry of the building interior, the new free plan office spaces flanked around the original hallway now serving as a double volume central atrium. A bridge on the first floor links both office floor plates at both sides. Visual connection is established between tenants on the ground and first floor within the working environment without compromise on privacy. The interior of the office is planned as a flexible free plan, giving tenants maximum adaptability according to their working needs.'},
      { type: 'text', content: 'The new extended second and third floors form a new mass rising from the majestic colonial form at the base. Steel posts and beam structures supporting the new floor slabs lightly raised from the ground, well-integrated, and yet structurally independent from the colonial structure. This, at the same time, brought the architecture challenge of creating a relationship between old and new. The new mass is made recessed inwards from the main colonial block below as a means to preserve the scale and presence of the old.'},
      { type: 'text', content: 'Corten steel which is used as an external building surface for the projected new mass above the existing building structure blends harmoniously with the exposed steel frame skeleton of the adjacent old railway workshops. The Corten cladding gives a modern cutting edge modern outlook and yet embodies a rich warm texture that resonates with the surrounding old rustic material palettes.'},
      { type: 'text', content: 'A central glass curtain wall breaks the homogeneity of the Corten-clad new mass. The façade break enhances the quality of modern abstraction and conformity to the domineering and symmetrical colonial architecture below.'},
      { type: 'text', content: 'Office tenants are visually linked to the surrounding context by the window openings on the new corten-clad building skin. Tranquil greenery is brought into the office interior through thoughtfully craved-out window openings.'},
      { type: 'text', content: 'A number of balconies and bay windows are strategically added to some of the openings between the grid projecting towards the historical railway workshops to the north, the lush park setting to the west, the YTL land sales gallery to the south-west and the iconic soaring towers of The Fennel by YTL Land towards the east. The balconies and pop-out windows create surprises and contribute to the overall abstraction of the upper mass in contrast to the formal language of the colonial architecture below.'},
    ],
  },
  // Warehouse 3
  {
    id: 5,
    slug: 'warehouse-3',
    title: 'Warehouse 3',
    location: 'Sentul, Kuala Lumpur',
    category: 'Commercial',
    status: 'Completed',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    images: [
      '/Gallery/Commercial/Warehouse3/CP.avif',
      '/Gallery/Commercial/Warehouse3/A1.avif',
      '/Gallery/Commercial/Warehouse3/A2.avif',
      '/Gallery/Commercial/Warehouse3/A3.avif',
      '/Gallery/Commercial/Warehouse3/A4.avif',
      '/Gallery/Commercial/Warehouse3/A5.avif',
    ],
    detailContent: [
      { type: 'text', content: 'Warehouse 3 is one of the few warehouses existing within the extended park setting of Sentul Park in Sentul West, Kuala Lumpur, Malaysia where the Federated Malay State Railway (FMSR) rail complexes were established in 1904. The warehouse is restored and modified into an event space that hosts banquets and gatherings. All the little pieces of nostalgia within the park restores a certain history of the city. When appropriating these paraphernalia for modern use, a fragment of the past is extracted and bottled. A trace note anchoring our culture whilst the society boldly march forward.'},
    ],
  },
  // Drive-thru KFC Bukit Raja
  {
    id: 6,
    slug: 'kfc-drive-thru-bukit-raja',
    title: 'KFC Bukit Raja',
    location: 'Bukit Raja, Klang',
    category: 'Commercial',
    status: 'Completed',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    accolades: ['International KFC Competition (1st Prize)'],
    images: [
      '/Gallery/Commercial/KFCBukitRaja/CP.avif',
      '/Gallery/Commercial/KFCBukitRaja/A1.avif',
      '/Gallery/Commercial/KFCBukitRaja/A2.avif',
      '/Gallery/Commercial/KFCBukitRaja/A3.avif',
      '/Gallery/Commercial/KFCBukitRaja/A4.avif',
      '/Gallery/Commercial/KFCBukitRaja/A5.avif',
      '/Gallery/Commercial/KFCBukitRaja/A6.avif',
      '/Gallery/Commercial/KFCBukitRaja/A7.avif',
      '/Gallery/Commercial/KFCBukitRaja/A8.avif',
      '/Gallery/Commercial/KFCBukitRaja/A9.avif',
      '/Gallery/Commercial/KFCBukitRaja/A10.avif',
    ],
    detailContent: [
      { type: 'text', content: 'The KFC design language echoes the rest of commercial retail design, using retrospective architectural lines and geometry that remind Malaysians of the past Art Deco and Modernist style architecture in the early 20th century. The spirit of that era also marks the exploration of aerodynamics in post-war automobile design, as well as resonating with the iconic American Art Deco-styled fast food chain drive-thru and diner culture.' },
      { type: 'text', content: 'The mass of the building is conceived visually as a cabin ‘lifted’ from the ground with accentuation of KFC’s iconic red colour highlighting the elements like the roof canopy and window coping. A giant scaled-up KFC Chicken Bucket graces visitors at the top of the main entrance, functioning as a lit-up KFC advertisement mounting surface that forms the landmark beacon for the township.' },
      { type: 'text', content: 'The design of the interior is an extension of the exterior concept mixing Art Deco, and Modernist style language but executed with contemporary material and technique. KFC customers can find retro café car seat style dining and classic mid-century Art Deco arches detailing in the interior.' },
      { type: 'text', content: 'Customers will be greeted by a giant KFC Bucket from the foyer at the main entrance. Some of the dining area seating is part of a concrete façade curved-shaped bay window ledge. The form of the curved window ledge from the exterior gives the overall building a floating retro ‘lifted cabin’ effect.' },
      { type: 'text', content: 'The overall architectural design and the big KFC bucket are iconic design statements that attract people’s attention hopefully from all over Klang Valley and beyond. We hope this KFC and Drive-thru not just provide F&B services but also an ‘Instagram able’ destination where people love to visit, gather, and share their experience of their time spent here.' },
    ],
  },
  // KFC @ Ijok
  {
    id: 7,
    slug: 'jom-rivertree-cafes',
    title: 'JOM RIVERTREE cafes',
    location: 'Ijok, Selangor',
    category: 'Commercial',
    status: 'Submission',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn','Syazwan Amidun','Quak Yi Jane'],
    images: [
      '/Gallery/Commercial/KFCIjok/CP.avif',
      '/Gallery/Commercial/KFCIjok/A1.avif',
      '/Gallery/Commercial/KFCIjok/A2.avif',
      '/Gallery/Commercial/KFCIjok/A3.avif',
      '/Gallery/Commercial/KFCIjok/A4.avif'
    ],
    detailContent: [
      { type: 'text', content: 'The KFC design language echoes the rest of commercial retail design, using retrospective architectural lines and geometry that remind Malaysians of the past Art Deco and Modernist style architecture in the early 20th century. The spirit of that era also marks the exploration of aerodynamics in post-war automobile design, as well as resonating with the iconic American Art Deco-styled fast food chain drive-thru and diner culture. The mass of the building is conceived visually as a cabin ‘lifted’ from the ground with accentuation of KFC’s iconic red colour highlighting the elements like the roof canopy and window coping. A giant scaled-up KFC Chicken Bucket graces visitors at the top of the main entrance, functioning as a lit-up KFC advertisement mounting surface that forms the landmark beacon for the township.' },
      { type: 'text', content: 'The design of the interior is an extension of the exterior concept mixing Art Deco, and Modernist style language but executed with contemporary material and technique. KFC customers can find retro café car seat style dining and classic mid-century Art Deco arches detailing in the interior.' },
      { type: 'text', content: 'Customers will be greeted by a giant KFC Bucket from the foyer at the main entrance. Some of the dining area seating is part of a concrete façade curved-shaped bay window ledge. The form of the curved window ledge from the exterior gives the overall building a floating retro ‘lifted cabin’ effect.' },
      { type: 'text', content: 'The overall architectural design and the big KFC bucket are iconic design statements that attract people’s attention hopefully from all over Klang Valley and beyond. We hope this KFC and Drive-thru not just provide F&B services but also an ‘Instagram able’ destination where people love to visit, gather, and share their experience of their time spent here.' },
    ],
  },
  // Shoplots @ Kepong
  {
    id: 8,
    slug: 'shoplot-kepong',
    title: 'Shoplot',
    location: 'Kepong, Kuala Lumpur',
    category: 'Commercial',
    status: 'Proposal',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    images: [
      '/Gallery/Commercial/ShoplotKepong/CP.avif',
      '/Gallery/Commercial/ShoplotKepong/A1.avif',
      '/Gallery/Commercial/ShoplotKepong/A2.avif',
      '/Gallery/Commercial/ShoplotKepong/A3.avif',
    ],
    detailContent: [
      { type: 'text', content: 'Developer’s brief call for a row of 4-storey shop lot with covered verandah-way and glass shopfront at ground level. The project explores the potential of inserting a central courtyard space for a typical multi-storey shop lot.'},
      { type: 'text', content: 'Due to the site context where the land is facing a noisy major road and an elevated MRT train line under construction, the proposed upper storey office or shop space creates an ‘inward looking’ environment with minimal and controlled window opening towards outside.'},
      { type: 'text', content: 'The exterior façade is mainly in solid walls with small windows that come with coping directing views to the ground street landscape and bounces back train and car noises away from the shop interior. Meanwhile the scheme creates a transparent glass surrounding walls and day-lit central courtyard to brighten interior spaces and encourage interaction around it.'},
      { type: 'text', content: 'Exterior shop signage is well planned integrated into the façade window strips. The corner unit rooftop is planned to be a semi-enclosed F&B terrace with commanding view towards KLCC.'},
    ],
  },
  // THC Warehouse Rawang
  {
    id: 9,
    slug: 'thc-warehouse',
    title: 'THC Warehouse',
    location: 'Rawang, Selangor',
    category: 'Commercial',
    status: 'Proposal',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    images: [
      '/Gallery/Commercial/THCWarehouse/CP.avif',
      '/Gallery/Commercial/THCWarehouse/A1.avif',
      '/Gallery/Commercial/THCWarehouse/A2.avif',
      '/Gallery/Commercial/THCWarehouse/A3.avif',
      '/Gallery/Commercial/THCWarehouse/A4.avif',
      '/Gallery/Commercial/THCWarehouse/A5.avif',
    ],
    detailContent: [
      { type: 'text', content: 'THC Warehouse sits within a working industrial corridor where buildings are typically read as neutral containers—large roofs, hardstand yards, and service roads that privilege throughput over identity. The site’s defining constraint is its fall in level: a sloped ground plane that could easily fragment operations into disconnected pads. Rather than resist this condition, the project uses it as a quiet organiser, turning topography into a legible logistics landscape and giving the facility a clear, civic-like front without departing from its industrial discipline.' },
      { type: 'text', content: 'The scheme is conceived as a pair of calibrated volumes—two broad-span halls set to either side of a central service spine. Their faceted metal envelopes and dark plinths articulate a simple hierarchy: a robust base for impact, movement, and maintenance, and a lighter upper skin that reads as a continuous shed roof folded into crisp edges. This twin-hall composition enables separation of programmes (production, storage, staging) while maintaining operational clarity. Above the yard, a cantilevered observation room is carved into the façade as a controlled aperture—an architectural instrument for oversight that also breaks the scale of the long elevation.' },
      { type: 'text', content: 'Arrival is framed by the two halls, which form a sheltered forecourt and a clear line of sight into the heart of the compound. The central drive rises gently, aligning vehicles to loading bays and staging zones with minimal turning conflict. Along the flanks, continuous canopies and recessed docks create a repeatable rhythm for servicing, while perimeter planting buffers the hardstand and softens long views across the site.' },
      { type: 'text', content: 'Inside, the experience shifts from enclosure to volume: a high truss roof lifts the ceiling plane into a single, expansive room, deliberately unobstructed to support changing machinery layouts and flexible assembly lines. Strip skylights introduce a measured daylight wash, and high-volume fans temper the air without compromising the clarity of the structure. Dedicated zones—such as the machine area—are held as legible fields within the larger hall, allowing the floor plate to be read as an adaptable working surface rather than a fixed diagram.' },
      { type: 'text', content: 'THC Warehouse treats efficiency as an architectural ethic: simple massing, clear circulation, and long-span space are shaped into a facility that is direct, resilient, and easy to operate. The result is an industrial complex that performs as infrastructure, yet carries a composed identity—defined by its paired volumes, disciplined detailing, and a spatial order that turns a sloped site into a coherent working campus.' },
    ],
  },
  // Tagore Lane
  {
    id: 10,
    slug: 'tagore-lane',
    title: 'Tagore Lane',
    location: 'Tagore Lane, Singapore',
    category: 'Commercial',
    status: 'Built (as Project Architect at SCDA PTE LTD)',
    images: [
      '/Gallery/Commercial/Tagore/CP.avif',
      '/Gallery/Commercial/Tagore/A1.avif',
    ],
    detailContent: [
      { type: 'text', content: 'coming soon...' },
    ],
  },
  // Guomei HQ
  {
    id: 11,
    slug: 'guomei-hq',
    title: 'Guomei HQ',
    location: 'Neihu, Taipei',
    category: 'Commercial',
    status: 'Schematic Design (as Design Architect at  WOHA ARCHITECTS)',
    coverPhoto: '/Gallery/Commercial/GuoMei/A0.avif',
    images: [
      '/Gallery/Commercial/GuoMei/CP.avif',
      '/Gallery/Commercial/GuoMei/A1.avif',
      '/Gallery/Commercial/GuoMei/A2.avif',
      '/Gallery/Commercial/GuoMei/A3.avif',

    ],
    detailContent: [
      { type: 'text', content: 'coming soon...' },
    ],
  },
];
