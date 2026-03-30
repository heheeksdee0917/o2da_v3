export interface ContentBlock {
  type: 'text' | 'image';
  content: string;
  caption?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string; // Format: "YYYY-MM-DD"
  excerpt: string;
  image: string; // Path to image
  slug: string; // URL-friendly identifier
  content: ContentBlock[]; // Array of content blocks
}

export const newsItems: NewsItem[] = [

  {
    id: 1,
    title: "Retro KFC at Uno Rivertree Featured on KL Foodie",
    date: "2020-11-02",
    excerpt: "The 1950s American-inspired KFC outlet designed by O2DA at Uno Rivertree, Bukit Raja, Klang, gains attention on KL Foodie.",
    image: '/Gallery/Commercial/KFCBukitRaja/CP.avif',
    slug: "unorivertreekfcklfoodie",
    content: [
      {
        type: 'text',
        content: `Our retro 1950s American diner-inspired KFC outlet at Uno Rivertree (Bukit Raja, Klang) has been spotlighted by KL Foodie.`
      },
      {
        type: 'text',
        content: `The design brings nostalgic charm to the fast-food experience with bold colours, classic signage, and vintage detailing.`
      },
      {
        type: 'text',
        content: `Read the full feature here: <a href="https://klfoodie.com/kfc-bukit-raja-klang-retro-design/" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">KL Foodie article</a>.`
      }
    ]
  },
  {
    id: 2,
    title: "Courtyard House Ranked in ArchDaily Top 100 Projects",
    date: "2020-11-01",
    excerpt: "The Courtyard House secures No. 9 spot in ArchDaily's weekly Top 100 Projects.",
    image: '/Publications/Top100.avif',
    slug: "courtyardhousearchdailytop100",
    content: [
      {
        type: 'text',
        content: `O2 Design Atelier is proud to announce that the Courtyard House has been ranked No. 9 in ArchDaily's Top 100 Projects for the week.`
      },
      {
        type: 'text',
        content: `This recognition highlights the project's innovative reinterpretation of the traditional courtyard typology on a standard terrace lot, prioritising greenery, natural light, and cross ventilation.`
      },
      {
        type: 'text',
        content: `View the ranking here: <a href="https://www.archdaily.com/tag/top100/" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">ArchDaily Top 100</a>.`
      }
    ]
  },
  {
    id: 3,
    title: "Uno Rivertree Signature Featured in Sin Chew Daily",
    date: "2020-10-31",
    excerpt: "The Uno Rivertree commercial project is published in Sin Chew Daily.",
    image: "/Publications/sinchew_news.jpeg",
    slug: "unorivertreesinchewdaily",
    content: [
      {
        type: 'text',
        content: `The Uno Rivertree Signature project has been featured in Sin Chew Daily, showcasing O2DA's contemporary commercial design approach.`
      },
      {
        type: 'text',
        content: `Read the article here: <a href="https://www.sinchew.com.my/content/content_2368727.html" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">Sin Chew Daily</a>.`
      }
    ]
  },
  {
    id: 4,
    title: "Courtyard House Published in The Edge Malaysia",
    date: "2020-09-07",
    excerpt: "Courtyard House featured in City & Country section of The Edge Malaysia Weekly.",
    image: '/Gallery/Residential/CourtyardHouse/A1.avif',
    slug: "courtyardhousetheedgemarket",
    content: [
      {
        type: 'text',
        content: `The Courtyard House was prominently featured in The Edge Malaysia Weekly (7–13 September 2020) under the City & Country section.`
      },
      {
        type: 'text',
        content: `The article explores how the design works with nature, light, and spatial experience to create a serene tropical home.`
      },
      {
        type: 'text',
        content: `Read the article here: <a href="https://www.theedgemarkets.com/article/design-works-touch-nature-light-and-spatial-experience" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">The Edge Malaysia</a>.`
      }
    ]
  },
  {
    id: 5,
    title: "Courtyard House Featured in PropertyGuru's Green Homes List",
    date: "2020-08-26",
    excerpt: "Courtyard House included in PropertyGuru's '10 Green Homes in Malaysia that Prove Eco-Friendly Living is Possible'.",
    image: '/Gallery/Residential/CourtyardHouse/A12.avif',
    slug: "courtyardhousepropertyguru",
    content: [
      {
        type: 'text',
        content: `The Courtyard House has been selected by PropertyGuru as one of "10 Green Homes in Malaysia that Prove Eco-Friendly Living is Possible", aligned with rising sustainability trends in the property market.`
      },
      {
        type: 'text',
        content: `The feature highlights the project's passive design strategies, natural ventilation, and integration of greenery within an urban terrace lot.`
      },
      {
        type: 'text',
        content: `Read the article here: <a href="https://www.archdaily.com/783163/terrace-house-renovation-o2-design-atelier?ad_source=search&ad_medium=search_result_all" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">Archdaily</a>.`
      }
    ]
  },
  {
    id: 6,
    title: "Edric Choo Joins WAF Webinar on Post-COVID Architecture",
    date: "2020-01-01",
    excerpt: "Principal Edric Choo Poo Liang participates in World Architecture Festival's 'Asia - Life after COVID-19' panel discussion.",
    image: '/Publications/PostPandamicTalk.jpg',
    slug: "webinaro2dawaf",
    content: [
      {
        type: 'text',
        content: `Edric Choo Poo Liang represented O2 Design Atelier in the World Architecture Festival's Talking Architecture webinar series titled "Asia - Life after COVID-19".`
      },
      {
        type: 'text',
        content: `The panel brought together leading architects to discuss architectural responses and concerns in the post-pandemic era across Asia.`
      },
      {
        type: 'text',
        content: `Watch the webinar here: <a href="https://www.worldarchitecturefestival.com/talking-architecture-asia-life-after-covid-19" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">WAF Talking Architecture</a>.`
      }
    ]
  },
  {
    id: 7,
    title: "O2 Design Atelier Wins BUILD Award 2019",
    date: "2019-01-01",
    excerpt: "O2DA recognised as Best Contemporary Residential Architecture Studio 2019 - Malaysia by BUILD Magazine.",
    image: "/Publications/BuildAward.avif",
    slug: "o2dabuildaward2019",
    content: [
      {
        type: 'text',
        content: `O2 Design Atelier has been awarded "Best Contemporary Residential Architecture Studio 2019 - Malaysia" in BUILD Magazine's Architecture Awards.`
      },
      {
        type: 'text',
        content: `This international recognition celebrates the studio's excellence in contemporary residential design and commitment to quality architecture.`
      },
      {
        type: 'text',
        content: `View the award listing here: <a href="https://www.build-review.com/winners/o2-design-atelier/" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">BUILD Review Winners</a>.`
      }
    ]
  },
  {
    id: 8,
    title: "Kenya Orphanage Project Highly Commended at WAF 2017",
    date: "2017-11-15",
    excerpt: "One Heart Foundation Orphanage and Children Eco-Village receives 'Highly Commended' at World Architecture Festival 2017.",
    image: '/Gallery/Competition/KenyaOrph/A4.avif',
    slug: "kenyaorphanageworldnews",
    content: [
      {
        type: 'text',
        content: `The One Heart Foundation Orphanage and Children Eco-Village project by O2 Design Atelier received "Highly Commended" recognition in the Future Masterplanning Project category at World Architecture Festival 2017 in Berlin.`
      },
      {
        type: 'text',
        content: `The international jury acknowledged the project's thoughtful approach to community, sustainability, and child-centred design.`
      },
      {
        type: 'text',
        content: `Read the article here: <a href="https://www.australiandesignreview.com/news/winner-competition-design-village/" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">adr</a> and <a href="https://architectureau.com/articles/o2-design-atelier-wins-competition-to-design-kenyan-eco-village/" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">Architecture, Au</a>.`
      }
    ]
  },
  {
    id: 9,
    title: "Courtyard House Shortlisted for World Festival of Interiors 2017",
    date: "2017-11-15",
    excerpt: "Courtyard House becomes the only Malaysian project shortlisted for INSIDE World Festival of Interiors Awards (Residential Category).",
    image: '/Gallery/Residential/CourtyardHouse/A5.avif',
    slug: "courtyardhousethestar",
    content: [
      {
        type: 'text',
        content: `The Courtyard House was shortlisted for the 2017 INSIDE World Festival of Interiors Awards in the Residential category, making it the only Malaysian project to reach this international stage.`
      },
      {
        type: 'text',
        content: `The shortlist was announced during WAF 2017 in Berlin under the theme "Performance". The project was also covered by The Star and The Edge Malaysia.`
      },
      {
        type: 'text',
        content: `More rticles on <a href="https://www.theedgemarkets.com/article/design-works-touch-nature-light-and-spatial-experience" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">The Edge Malaysia</a> and <a href="https://www.thestar.com.my/lifestyle/culture/2017/11/10/global-architecture-awards" target="_blank" rel="noopener" class="underline hover:no-underline text-black/90">The Stars</a>.`
      }
    ]
  },
  {
    id: 10,
    title: "Skyscrapers do we need them?",
    date: "2023-03-12",
    excerpt: "Edric Choo questions the role of skyscrapers in addressing urban density, land scarcity, and post-pandemic challenges, weighing vertical efficiency benefits against environmental, social, and safety drawbacks while proposing future self-sustaining towers that free ground space for nature.",
    image: '/Gallery/Competition/CityofTmorrow/CP.avif',
    slug: "skyscrapers-do-we-need-them",
    content: [
      {
        type: 'text',
        content: `In this reflective piece from Architecture Malaysia, Edric Choo examines whether skyscrapers are still necessary amid growing populations and limited land. Advantages include vertical density to reduce sprawl, freed ground for parks and nature, efficient infrastructure, energy savings per capita, enhanced security, and iconic economic boosts. Drawbacks cover high costs, environmental impacts (wind, shadows, habitat loss), social isolation (especially post-COVID), safety risks, and infrastructure strain.`
      },
      {
        type: 'text',
        content: `The article advocates evolving toward multi-program, self-sustaining elevated towers with integrated live-work-play functions and clean-energy mobility, decentralizing cities to restore ecosystems and eliminate suburbs/roads.`
      },
      {
        type: 'text',
        content: `Read the full article on Architecture Malaysia <a href="https://architecturemalaysia.my/2023/03/12/skyscrapers-do-we-need-them/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 11,
    title: "A conversation with Ar. Syed Sobri Syed Ismaila",
    date: "2025-12-27",
    excerpt: "Ar. Edric Choo interviews Ar. Syed Sobri Syed Ismail, co-founder of GDP Architects, on firm origins, business realities in Malaysian architecture, climate-responsive design, ESG as the new standard, and practical advice for young architects to build professionalism and trust.",
    image: '/Publications/conversation.avif',
    slug: "conversation-ar-syed-sobri-syed-ismail",
    content: [
      {
        type: 'text',
        content: `This in-depth conversation in Architecture Malaysia features Ar. Syed Sobri Syed Ismail reflecting on founding GDP Architects in 1990 through friendship and strong design principles, while addressing ongoing challenges in the Malaysian profession.`
      },
      {
        type: 'text',
        content: `Key discussions include treating architecture as a business (management, marketing, stakeholder engagement), adapting to hot-humid climate with innovations like double-skin facades, prioritizing ESG principles, and urging young architects to gain real-world experience, build client trust, and embrace professionalism over pure aesthetics.`
      },
      {
        type: 'text',
        content: `Read the full conversation on Architecture Malaysia <a href="https://architecturemalaysia.my/2025/12/27/a-conversation-with-ar-syed-sobri-syed-ismail/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 12,
    title: "Interview with Dato’ Tengku Abdul Aziz Tengku Mahmud and Ar Farid Baharuddin",
    date: "2025-04-16",
    excerpt: "Interview by Ar. David Teoh and Ar. Edric Choo explores the vision behind Merdeka 118, architect selection, structural/fire-safety innovations, pandemic challenges, heritage integration, sustainability goals (LEED Platinum), and the project's role in economic revitalization and global positioning for Malaysian architecture.",
    image: '/Publications/interview1.avif',
    slug: "interview-dato-tengku-abdul-aziz-ar-farid-baharuddin",
    content: [
      {
        type: 'text',
        content: `Conducted at Kelambi, Level 92, Merdeka 118, this discussion features Dato’ Tengku Abdul Aziz Tengku Mahmud (CEO, PNB Merdeka Ventures) and Ar. Farid Baharuddin (Principal, RSP Architects) detailing the iconic supertall project's inception, masterplanning, and execution.`
      },
      {
        type: 'text',
        content: `Topics cover consolidating space into one tower for heritage respect and growth, collaboration between Fender Katsalidis and RSP, engineering challenges (wind, seismic, evacuation lifts), COVID delays, cultural motifs in design, LEED Platinum sustainability, and aspirations for the precinct as a cultural-economic hub bridging tradition and modernity.`
      },
      {
        type: 'text',
        content: `Read the full interview on Architecture Malaysia <a href="https://architecturemalaysia.my/2025/04/16/interview-with-dato-tengku-abdul-aziz-tengku-mahmud-and-ar-farid-baharuddin/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 13,
    title: "Perfection Imperfection",
    date: "2023-12-18",
    excerpt: "Ar Edric Choo introduces wabi-sabi philosophy—embracing beauty in imperfection, transience, and natural authenticity—as a counter to modern architecture's obsession with precision, mass production, and permanence, advocating for organic, site-responsive, sustainable designs that evolve with time.",
    image: '/Publications/perfect-imperfection.avif',
    slug: "perfection-imperfection",
    content: [
      {
        type: 'text',
        content: `In this thoughtful article from Architecture Malaysia, Ar Edric Choo explores the Japanese Zen-inspired concept of wabi-sabi, which finds aesthetic value in simplicity, asymmetry, impermanence, and the natural cycle of growth and decay.`
      },
      {
        type: 'text',
        content: `It contrasts wabi-sabi's intuitive, organic approach (using natural materials, raw textures, kintsugi, understated elegance) with modernism's logical perfection, promoting elements like kanso (simplicity), fukinsei (asymmetry), shizen (naturalness), and acceptance of aging for harmonious, sustainable living.`
      },
      {
        type: 'text',
        content: `Read the full article on Architecture Malaysia <a href="https://architecturemalaysia.my/2023/12/18/perfection-imperfection/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 14,
    title: "Glassy Act",
    date: "2023-06-18",
    excerpt: "The Retro KFC Drive-Thru Restaurant at Bukit Raja breaks from standard templates with a retrospective Art Deco and Modernist design inspired by early 20th-century aerodynamics and classic American fast-food culture, featuring a 'lifted' floating cabin effect, prominent red KFC branding, and a giant illuminated Chicken Bucket as a landmark beacon.",
    image: '/Gallery/Commercial/KFCBukitRaja/A2.avif',
    slug: "glassy-act",
    content: [
      {
        type: 'text',
        content: `Designed by Choo Poo Liang Architect in collaboration with MOA Architects, this project reinterprets commercial retail aesthetics with curved concrete façades, bay window ledges, and a building mass conceived as a cabin lifted from the ground. The iconic red KFC elements accent the roof canopy and details, while a large scaled-up lit-up KFC Chicken Bucket serves as entrance foyer, advertisement, and township beacon.`
      },
      {
        type: 'text',
        content: `The interior continues the retro theme with café car seat-style dining, mid-century Art Deco arches, and contemporary materials, transforming a typical F&B outlet into an eye-catching, Instagramable destination that encourages gathering and sharing across the Klang Valley.`
      },
      {
        type: 'text',
        content: `Read the full feature on Architecture Malaysia <a href="https://architecturemalaysia.my/2023/06/18/retro-kfc-drive-thru-restaurant-at-bukit-raja/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 15,
    title: "Pilgrimage of an Architect",
    date: "2022-12-18",
    excerpt: "Edric Choo reflects on architectural travel as an essential pilgrimage that expands mental horizons, awakens all senses, gathers energy, and provides true inspiration through direct, immersive experiences of iconic global works that photos and drawings cannot fully convey.",
    image: '/Publications/pilgrimage.avif',
    slug: "pilgrimage-of-an-architect",
    content: [
      {
        type: 'text',
        content: `In this personal essay, Edric Choo describes how traveling broadens perspectives and fuels design creativity for architects. Every journey becomes a pilgrimage of discovery and transcendence, emphasizing feeling, thinking, and sensory immersion over mere movement.`
      },
      {
        type: 'text',
        content: `Examples include Tadao Ando's Church of Light, Moshe Safdie's Jewel Changi Airport, Le Corbusier's Chandigarh, Frank Gehry's UTS Business School, Herzog & de Meuron's Museu Blau, and works by I.M. Pei, Santiago Calatrava, and SANAA, highlighting how in-person visits reveal intricacies, beauty, and context.`
      },
      {
        type: 'text',
        content: `Read the full article on Architecture Malaysia <a href="https://architecturemalaysia.my/2022/12/18/pilgrimage-of-an-architect/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 16,
    title: "Thinking outside the box",
    date: "2022-06-18",
    excerpt: "This cluster of twelve linked 2½-storey terrace houses in Puchong rethinks tropical suburban living by centering spaces around a triple-volume courtyard with natural light and greenery, incorporating monsoon windows, operable louvers, and heritage-inspired elements to improve ventilation, brightness, and livability over standard dark terrace designs.",
    image: '/Gallery/Housing/GarisanPuchong/A2.avif',
    slug: "thinking-outside-the-box",
    content: [
      {
        type: 'text',
        content: `Located in Puchong, Selangor, these houses vary in height, color, and texture to avoid linear monotony, drawing from Malaysian shophouse traditions while prioritizing natural airflow and connection to nature through a central landscaped courtyard void with skylight.`
      },
      {
        type: 'text',
        content: `Tropical strategies include breeze pathways from front to rear, hot air exhaust via high-level porous blocks, monsoon windows for rain-proof ventilation, adjustable louvers for privacy/shading, cantilevered staircases, rooftop terraces, and organic curvy forms softening corners.`
      },
      {
        type: 'text',
        content: `Read the full article on Architecture Malaysia <a href="https://architecturemalaysia.my/2022/06/18/thinking-outside-the-box/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 17,
    title: "Nothingness and Fullness",
    date: "2022-06-18",
    excerpt: "Edric Choo explores the interconnected philosophical concepts of nothingness and fullness in architecture, drawing from Zen, Buddhist, and Western thought to advocate for mindful design that embraces emptiness as a path to equilibrium, presence, and meaningful built environments rather than object-centric production.",
    image: '/Gallery/Competition/NNE/A1.avif',
    slug: "nothingness-and-fullness",
    content: [
      {
        type: 'text',
        content: `This reflective piece discusses how nothingness (absence, emptiness) and fullness (wholeness, presence) form a permanent cycle of balance — nothing is ever fully empty or full. It references thinkers like Alan Watts, Kitaro Nishida, Heidegger, and Baudrillard, viewing nothingness as the ultimate clarity and foundation for experience.`
      },
      {
        type: 'text',
        content: `Architectural examples include Tadao Ando's Church of Light, Kengo Kuma's anti-object approach to dissolve buildings into surroundings, Merdeka Square as urban void enabling community fullness, and Khoo Kongsi's shift from cultural fullness to touristic nothingness. The article promotes pauses, mindfulness, and resistance to object-ness for more thoughtful, sublime architecture.`
      },
      {
        type: 'text',
        content: `Read the full article on Architecture Malaysia <a href="https://architecturemalaysia.my/2022/06/18/nothingness-and-fullness/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 18,
    title: "Standing the test of time: Sentul Works",
    date: "2022-03-18",
    excerpt: "This feature explores the adaptive reuse of a century-old colonial Federated Malay States Railways building in Sentul West, Kuala Lumpur, transformed into Sentul Works modern office space through innovative engineering, contrasting old and new elements, and collaborative onsite solutions to preserve heritage while meeting contemporary needs.",
    image: '/Gallery/Commercial/SentulWorks/A7.avif',
    slug: "standing-the-test-of-time-sentul-works",
    content: [
      {
        type: 'text',
        content: `Interviewed by Nizar Musa with insights from Yeoh Pei Teeng (YTL Land) and Ar Edric Choo Poo Liang (Choo Poo Liang Architect), the article details the project's transformation of a dilapidated early-1900s railway structure into a four-storey office. Key innovations include micropile-supported steel frames bypassing the existing building, a reintroduced two-storey atrium, mezzanine hung from rods, pop-out balconies, recessed windows, and a factory-fabricated floating staircase of folded steel plates with concealed LED lighting.`
      },
      {
        type: 'text',
        content: `The design philosophy juxtaposes modern Corten steel, glass, and steel elements against preserved colonial brickwork (English bond pattern) and rugged features, inspired by projects like CaixaForum Madrid. It emphasizes grid-mapped relationships for framing views, onsite craftsmanship, and balancing historical integrity with contemporary functionality in YTL Land's broader Sentul regeneration efforts.`
      },
      {
        type: 'text',
        content: `Read the full article on Architecture Malaysia <a href="https://architecturemalaysia.my/2022/03/18/standing-the-test-of-timesentul-works/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 19,
    title: "A Home for 2 / O2 Design Atelier",
    date: "2018-11-24",
    excerpt: "O2 Design Atelier revamps the interior of a residence in a prominent northern Kuala Lumpur neighborhood, prioritizing client-specific design needs and spatial requirements while preserving most of the original exterior facade, achieved through close collaboration with the client (also a designer).",
    image: '/Gallery/Residential/Homefor2/CP.avif',
    slug: "a-home-for-2-o2-design-atelier",
    content: [
      {
        type: 'text',
        content: `Completed in 2018 and published on ArchDaily, this residential project by O2 Design Atelier (led by Edric Choo Poo Liang) focuses on interior transformation to meet the owner's preferences for design and functionality.`
      },
      {
        type: 'text',
        content: `High-quality fixtures from brands like Grohe, Toto, Feruni, and others enhance the revamped spaces, creating a personalized home through collaborative input from the client, who is also a designer.`
      },
      {
        type: 'text',
        content: `Explore the full project details and images on ArchDaily <a href="https://www.archdaily.com/905911/a-home-for-2-o2-design-atelier?ad_source=search&ad_medium=projects_tab" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 20,
    title: "Terrace House Renovation / O2 Design Atelier",
    date: "2015",
    excerpt: "O2 Design Atelier renovates a standard terrace house in Sungai Buloh (near Kuala Lumpur) by extending outwards to maximize internal living space, transforming a typical 22x75 ft lot into a more spacious and functional home through strategic outward additions.",
    image: '/Gallery/Residential/CourtyardHouse/A8.avif',
    slug: "terrace-house-renovation-o2-design-atelier",
    content: [
      {
        type: 'text',
        content: `This 2015 renovation project by O2 Design Atelier addresses the limitations of conventional terrace housing by expanding the structure outwards, increasing usable internal volume while maintaining the core footprint.`
      },
      {
        type: 'text',
        content: `The intervention uses concrete extensions to create brighter, more open spaces suited to Malaysian living, reflecting a practical approach to upgrading existing homes for enhanced comfort and functionality.`
      },
      {
        type: 'text',
        content: `View the complete project on ArchDaily <a href="https://www.archdaily.com/783163/terrace-house-renovation-o2-design-atelier?ad_source=search&ad_medium=projects_tab" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 21,
    title: "3 Courtyard House / O2 Design Atelier",
    date: "2018",
    excerpt: "O2 Design Atelier designs the 3 Courtyard House in Petaling Jaya with three strategically placed courtyards that promote natural ventilation, ample daylight, and privacy, creating a comfortable, tropical-responsive home through thoughtful spatial voids and cross-breeze pathways.",
    image: '/Gallery/Residential/3CourtyardHouse/A3.avif',
    slug: "3-courtyard-house-o2-design-atelier",
    content: [
      {
        type: 'text',
        content: `Completed in 2018 and spanning 1885 m², this residence by O2 Design Atelier centers its layout around three courtyards to address Malaysia's hot-humid climate, facilitating airflow, natural light penetration, and shaded outdoor connections.`
      },
      {
        type: 'text',
        content: `Incorporating elements from brands like Johnson Suisse and Monier, the design emphasizes privacy, sustainability through passive strategies, and a harmonious indoor-outdoor relationship tailored to tropical living.`
      },
      {
        type: 'text',
        content: `Discover the full project gallery and details on ArchDaily <a href="https://www.archdaily.com/910089/3-courtyard-house-o2-design-atelier?ad_source=search&ad_medium=projects_tab" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 22,
    title: "Sentul Works / O2 Design Atelier + YTL Land & Development",
    date: "2021",
    excerpt: "O2 Design Atelier, in collaboration with YTL Land & Development, transforms a historic colonial railway building in Sentul, Kuala Lumpur, into Sentul Works — a contemporary office blending heritage preservation with modern Corten steel additions, innovative structural solutions, and adaptive reuse principles.",
    image: '/Gallery/Commercial/SentulWorks/A2.avif',
    slug: "sentul-works-o2-design-atelier-ytl",
    content: [
      {
        type: 'text',
        content: `This project restores and repurposes an early-1900s Federated Malay States Railways structure into a modern creative office hub, juxtaposing original brickwork and rugged colonial elements with new steel framing, glass, and Corten steel facades for a striking old-new contrast.`
      },
      {
        type: 'text',
        content: `Engineering highlights include micropile-supported bypass frames, floating staircases, and atrium reintroduction, emphasizing sustainability through reuse, heritage integration, and onsite craftsmanship in YTL's Sentul regeneration vision.`
      },
      {
        type: 'text',
        content: `Explore the complete project on ArchDaily <a href="https://www.archdaily.com/967938/sentul-works-o2-design-atelier-plus-ytl-land-and-development?ad_source=search&ad_medium=projects_tab" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 22,
    title: "Introvert House / O2 Design Atelier + Choo Poo Liang Architect",
    date: "2020",
    excerpt: "This renovation of a two-storey terrace house in Kuala Lumpur adapts a standard 22 ft x 75 ft layout for a Chinese family of five plus helper, adding bedrooms for grown children and improving interior quality through thoughtful spatial adjustments.",
    image: '/Gallery/Residential/IntrovertHouse/CP1.avif',
    slug: "introvert-house-o2-design-atelier",
    content: [
      {
        type: 'text',
        content: `Completed in 2020 and published on ArchDaily in 2021, the Introvert House by O2 Design Atelier + Choo Poo Liang Architect transforms a conventional terrace house to better suit family needs, focusing on practical expansions and enhanced living spaces.`
      },
      {
        type: 'text',
        content: `The design incorporates high-quality fixtures (e.g., from Feruni) and prioritizes functionality for multi-generational living, creating a more comfortable and personalized home environment.`
      },
      {
        type: 'text',
        content: `Explore the full project details and images on ArchDaily <a href="https://www.archdaily.com/956581/introvert-house-o2-design-atelier-plus-choo-poo-liang-architect?ad_source=search&ad_medium=projects_tab" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 23,
    title: "O2 design atelier imagines a 'post-pandemic city of tomorrow' elevated above nature",
    date: "2020-11-02",
    excerpt: "O2 Design Atelier's visionary 'The Post-Pandemic City of Tomorrow' proposes self-sustaining elevated towers that integrate living, working, and mobility, lifting urban life above ground to allow forests, rivers, and ecosystems to regenerate naturally below, eliminating roads, suburbs, and deforestation.",
    image: '/Gallery/Competition/CityofTmorrow/A1.avif',
    slug: "post-pandemic-city-of-tomorrow-o2-design-atelier",
    content: [
      {
        type: 'text',
        content: `Published on designboom on November 2, 2020, this conceptual project responds to the 2020 pandemic and environmental crises by elevating entire cities onto towers, freeing the ground for nature to reclaim former highways, parking lots, and urban sprawl.`
      },
      {
        type: 'text',
        content: `Innovations include clean-energy flying capsules for live-work-travel, connected platforms for retail, sports, culture, medical hubs, and inter-tower bridges — all in sanitized, zero-waste environments that prioritize nature regeneration and regulated human access to the ground.`
      },
      {
        type: 'text',
        content: `Discover the complete visionary feature on designboom <a href="https://www.designboom.com/architecture/o2-design-atelier-the-post-pandemic-city-of-tomorrow-11-02-2020/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 24,
    title: "Corten Steel mass rises up from a restored colonial building in Kuala Lumpur",
    date: "2021-09-21",
    excerpt: "Sentul Works restores a century-old colonial Federated Malay States Railways building in Kuala Lumpur, adding a recessed Corten steel mass above the preserved heritage structure for a modern office that contrasts old brickwork with contemporary abstraction, warm textures, and innovative spatial elements like pop-out balconies and glass curtain walls.",
    image: '/Gallery/Commercial/SentulWorks/A9.avif',
    slug: "corten-steel-mass-sentul-works",
    content: [
      {
        type: 'text',
        content: `Featured on designboom on September 21, 2021, this adaptive reuse project by O2 Design Atelier in collaboration with YTL Land preserves the formal colonial architecture while introducing a modern Corten steel addition that recedes inwards to maintain scale and harmony.`
      },
      {
        type: 'text',
        content: `The design blends heritage brick patterns with new steel frames, balconies, and a central glass curtain wall for visual surprise and abstraction, creating a rich, textured modern office that respects historical context.`
      },
      {
        type: 'text',
        content: `Read the full article on designboom <a href="https://www.designboom.com/architecture/corten-steel-mass-colonial-building-kuala-lumpur-09-21-2021/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 25,
    title: "Top 10 reader submissions of 2020 - visualizations of the future",
    date: "2020-12-08",
    excerpt: "O2 Design Atelier's 'The Post-Pandemic City of Tomorrow' ranks 7th in designboom's Top 10 reader-submitted visualizations of the future, recognized for its concept of elevated self-sustaining towers that set nature free by allowing forests and rivers to thrive below.",
    image: '/Publications/BigStories.avif',
    slug: "top-10-reader-submissions-2020-post-pandemic-city",
    content: [
      {
        type: 'text',
        content: `Published on designboom on December 8, 2020, this roundup highlights innovative reader visions for the future, with O2 Design Atelier's project placed 7th for its bold response to 2020 events.`
      },
      {
        type: 'text',
        content: `The concept is praised as a series of self-sustaining elevated towers designed to regenerate nature on the ground while providing integrated urban living above.`
      },
      {
        type: 'text',
        content: `View the full Top 10 list on designboom <a href="https://www.designboom.com/design/top-10-reader-submissions-visualizations-of-the-future-12-08-2020/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 26,
    title: "About O2 Design Atelier (O2DA)",
    date: "",
    excerpt: "02 Design Atelier (02DA), founded by Malaysian architect Ar. Edric Choo Poo Liang, is a Selangor-based firm emphasizing context-responsive design, local culture, social behaviors, and climate considerations through meticulous processes across master planning, architecture, interiors, landscape, and furniture.",
    image: '/Publications/archify_o2.avif',
    slug: "about-02-design-atelier",
    content: [
      {
        type: 'text',
        content: `Led by Ar. Edric Choo Poo Liang (born 1976, with degrees from University of Malaya and Universiti Sains Malaysia), 02DA operates on a creative industries model without a fixed style, drawing from global training at firms like TR Hamzah & Yeang and WOHA.`
      },
      {
        type: 'text',
        content: `The studio prioritizes in-depth, site-specific responses to climate change and cultural contexts, delivering integrated design solutions across various scales.`
      },
      {
        type: 'text',
        content: `Learn more about the firm on Archify <a href="https://www.archify.com/my/02-design-atelier" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 27,
    title: "O2 design atelier",
    date: "",
    excerpt: "O2 Design Atelier (O2DA), founded by Malaysian architect Edric Choo Poo Liang, is a Kuala Lumpur-based firm that follows a creative industries model, delivering integrated designs across master planning, architecture, interiors, landscape, and furniture, with a focus on context-responsive solutions that address local culture, social behavior, climate change, and site-specific requirements through meticulous processes.",
    image: '/Publications/archello_o2.avif',
    slug: "o2-design-atelier-profile",
    content: [
      {
        type: 'text',
        content: `Led by Edric Choo Poo Liang (born 1976, with degrees from University of Malaya and Universiti Sains Malaysia), the firm draws from his extensive experience at renowned practices including TR Hamzah & Yeang, ZLG Design, RT+Q, W Architects, SCDA, and WOHA. O2DA avoids preconceived styles, instead crafting unique responses tailored to each project's nature, context, and challenges.`
      },
      {
        type: 'text',
        content: `Headquartered in Kuala Lumpur, the studio emphasizes sustainability, environmental responsiveness, and in-depth design exploration to create meaningful built environments.`
      },
      {
        type: 'text',
        content: `Learn more about the firm on Archello <a href="https://archello.com/brand/o2-design-atelier" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 28,
    title: "Design Works: In touch with nature, light and spatial experience",
    date: "2020-09-07",
    excerpt: "Edric Choo Poo Liang of O2 Design Atelier shares insights into his residential projects — including The Courtyard House (his own renovated terrace), A Home for 2, and 3 Courtyard House — emphasizing harmony with nature, natural light integration, spatial fluidity, sustainability, and user-centric design that blurs indoor-outdoor boundaries through courtyards, open plans, and thoughtful materials.",
    image: '/Gallery/Residential/CourtyardHouse/A10.avif',
    slug: "design-works-nature-light-spatial-experience",
    content: [
      {
        type: 'text',
        content: `Published in The Edge Malaysia (September 7-13, 2020), the article profiles three projects: The Courtyard House (2015 renovation in Sungai Buloh with extensions and open-plan courtyards); A Home for 2 (2018 revamp in Desa Park City featuring double-volume spaces and steel bridges); and 3 Courtyard House (2018 in Petaling Jaya with three courtyards for light and greenery).`
      },
      {
        type: 'text',
        content: `Choo stresses responsive architecture that balances art and science, incorporates cultural elements, and prioritizes environmental harmony using features like polycarbonate roofs, pre-cast vent blocks, metal screens, full-height glass, and courtyards to enhance ventilation, light, and connection to nature.`
      },
      {
        type: 'text',
        content: `Read the full article on The Edge Malaysia <a href="https://theedgemalaysia.com/article/design-works-touch-nature-light-and-spatial-experience" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 29,
    title: "Between History and Modernity: KL’s Old Railway Complex Revived into a Modern Office Building.",
    date: "2022-08-04",
    excerpt: "Sentul Works revives a 1904 colonial Federated Malay States Railways headquarters in Kuala Lumpur into a contemporary office, preserving the original brick-and-concrete arched façade while adding a recessed Corten steel mass above, supported by independent steel frames, for a harmonious blend of heritage symmetry and modern abstraction with warm textures and contextual views.",
    image: '/Gallery/Commercial/SentulWorks/A10.avif',
    slug: "between-history-and-modernity-sentul-works",
    content: [
      {
        type: 'text',
        content: `Published on Creative Home X (August 4, 2022), the project by O2 Design Atelier and YTL Land Design Group restores the dilapidated colonial structure in Sentul Park, maintaining its symmetry and central atrium while introducing flexible free-plan offices.`
      },
      {
        type: 'text',
        content: `Innovative elements include Corten steel cladding for the new upper levels, a central glass curtain wall for contrast, pop-out balconies and bay windows framing views to greenery and surrounding developments, creating a respectful coexistence of old and new.`
      },
      {
        type: 'text',
        content: `Read the full article on Creative Home X <a href="https://creativehomex.com/sentul-works-o2designatelier-ytl/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 30,
    title: "Children Eco-Village",
    date: "",
    excerpt: "Children Eco-Village is a conceptual or proposed sustainable community project by O2 Design Atelier, focusing on eco-friendly design principles tailored for children, emphasizing environmental integration, natural materials, and educational spaces that promote harmony with nature (details limited in available sources).",
    image: '/Gallery/Competition/KenyaOrph/CP.avif',
    slug: "children-eco-village",
    content: [
      {
        type: 'text',
        content: `This project reflects O2 Design Atelier's commitment to sustainability and climate-responsive architecture, likely incorporating green spaces, passive cooling, renewable elements, and child-centric planning to foster learning and connection to the environment.`
      },
      {
        type: 'text',
        content: `As part of the firm's portfolio of thoughtful, context-driven works, it aligns with broader themes of nature integration and future-oriented design.`
      },
      {
        type: 'text',
        content: `Explore the project on Architizer <a href="https://architizer.com/projects/children-eco-village/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 31,
    title: "UNO Retail Shop & KFC Drive-Thru",
    date: "",
    excerpt: "UNO Retail Shop & KFC Drive-Thru (associated with the Genkan House listing) features innovative retail design by O2 Design Atelier, likely incorporating the distinctive retro-modern elements seen in related projects such as full-height glass façades, curved forms, and elevated aesthetics to create engaging commercial spaces (details limited in available sources).",
    image: '/Gallery/Commercial/KFCBukitRaja/CP.avif',
    slug: "uno-retail-shop-kfc-drive-thru",
    content: [
      {
        type: 'text',
        content: `This commercial project aligns with O2 Design Atelier's approach to elevating everyday retail through thoughtful materiality, transparency, and user experience, potentially drawing from the firm's known work on drive-thru and retail typologies like the Bukit Raja KFC.`
      },
      {
        type: 'text',
        content: `It emphasizes functional innovation combined with visual appeal in a Malaysian context.`
      },
      {
        type: 'text',
        content: `View the project on Architizer <a href="https://architizer.com/projects/genkan-house/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 32,
    title: "Park by the River",
    date: "",
    excerpt: "Park by the River is a public green space project by O2 Design Atelier that integrates natural landscapes with urban riverfront revitalization, focusing on sustainable design, community accessibility, and ecological restoration through thoughtful pathways, native planting, and open recreational areas.",
    image: '/Publications/park-by-the-river.avif',
    slug: "park-by-the-river",
    content: [
      {
        type: 'text',
        content: `This project transforms a riverside site into a vibrant, nature-connected park, emphasizing passive sustainability, biodiversity, and public interaction in a Malaysian urban context.`
      },
      {
        type: 'text',
        content: `Key elements likely include integrated greenery, water-sensitive features, shaded gathering spaces, and seamless transitions between built and natural environments to enhance livability and environmental health.`
      },
      {
        type: 'text',
        content: `Explore the project on Architizer <a href="https://architizer.com/projects/park-by-the-river/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 33,
    title: "Kayu Ara Townhouse",
    date: "",
    excerpt: "Kayu Ara Townhouse by O2 Design Atelier reimagines contemporary townhouse living with tropical adaptations, incorporating natural ventilation, courtyards, timber-inspired elements, and spatial efficiency to create comfortable, context-responsive homes in a suburban Malaysian setting.",
    image: '/Publications/kayu-ara.avif',
    slug: "kayu-ara-townhouse",
    content: [
      {
        type: 'text',
        content: `This residential development draws from local materials and climate considerations, featuring open layouts, greenery integration, and thoughtful massing to balance privacy, light, and airflow in a dense urban typology.`
      },
      {
        type: 'text',
        content: `The design prioritizes user-centric features such as multi-level connections to nature and sustainable materials for enhanced living quality.`
      },
      {
        type: 'text',
        content: `View the project on Architizer <a href="https://architizer.com/projects/kayu-ara-townhouse/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 34,
    title: "Malaysia Green Building Council HQ",
    date: "",
    excerpt: "The Malaysia Green Building Council HQ, designed by O2 Design Atelier, serves as an exemplary sustainable headquarters that demonstrates green building principles through energy-efficient systems, natural materials, passive design strategies, and integration of greenery to promote environmental stewardship and occupant well-being.",
    image: '/Gallery/Competition/MGBC/CP.avif',
    slug: "malaysia-green-building-council-hq",
    content: [
      {
        type: 'text',
        content: `This project embodies GBI (Green Building Index) standards with features like solar shading, natural ventilation, rainwater harvesting, and biophilic elements to minimize environmental impact while creating a healthy, inspiring workspace.`
      },
      {
        type: 'text',
        content: `It showcases innovative use of local materials and technologies to achieve high sustainability ratings and serve as a model for future Malaysian buildings.`
      },
      {
        type: 'text',
        content: `Discover the project on Architizer <a href="https://architizer.com/projects/malaysia-green-building-council-hq/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 35,
    title: "THE HIGHWAY-CRUISE BLOCK - Capitalizing the Infinitely Urban Wasted Space",
    date: "",
    excerpt: "THE HIGHWAY-CRUISE BLOCK proposes an innovative urban intervention that reclaims wasted space beneath or along highways, transforming underutilized infrastructure into vibrant, multi-functional blocks for community use, mixed programs, and sustainable urban density.",
    image: '/Publications/highway.avif',
    slug: "highway-cruise-block",
    content: [
      {
        type: 'text',
        content: `This conceptual project addresses urban inefficiency by infilling highway-adjacent voids with stacked or elevated structures that support retail, recreation, housing, or green spaces, promoting connectivity and reducing sprawl.`
      },
      {
        type: 'text',
        content: `It emphasizes adaptive reuse, vertical expansion, and public activation to turn neglected areas into valuable community assets in dense cities.`
      },
      {
        type: 'text',
        content: `Explore the project on Architizer <a href="https://architizer.com/projects/the-highway-cruise-block-capitalizing-the-infinitely-urban-wasted-space/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 36,
    title: "GO BEYOND: Container design challenge",
    date: "",
    excerpt: "GO BEYOND is a container design challenge entry by O2 Design Atelier that pushes the boundaries of modular shipping container architecture, reimagining repurposed containers for innovative, sustainable, and adaptable living or programmatic solutions with creative spatial configurations.",
    image: '/Gallery/Competition/GoBeyond/CP.avif',
    slug: "go-beyond-container-design-challenge",
    content: [
      {
        type: 'text',
        content: `This competition project explores beyond-standard container uses through modular stacking, hybrid materials, and functional innovations to address housing, community, or commercial needs in a cost-effective, eco-friendly way.`
      },
      {
        type: 'text',
        content: `It highlights flexibility, rapid deployment, and sustainability inherent in container-based design while adding unique spatial experiences.`
      },
      {
        type: 'text',
        content: `View the project on <a href="https://gobeyond.ongfoundation.org/1/page/winners" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 37,
    title: "Hong Kong PIxel Housing",
    date: "",
    excerpt: "Hong Kong Pixel Housing is a conceptual high-density residential proposal by O2 Design Atelier that reimagines urban living in Hong Kong through a pixelated modular system, optimizing vertical stacking, natural light penetration, ventilation, and communal spaces in a compact, adaptable framework.",
    image: '/Gallery/Competition/HongKong/CP.avif',
    slug: "hong-kong-pixel-housing",
    content: [
      {
        type: 'text',
        content: `This visionary project addresses Hong Kong's extreme density challenges by using a pixel-like modular approach for flexible unit configurations, shared voids, and green pockets that enhance privacy, airflow, and community interaction.`
      },
      {
        type: 'text',
        content: `It incorporates sustainable strategies such as passive cooling, modular prefabrication, and integrated greenery to create more livable high-rise environments in constrained urban settings.`
      },
      {
        type: 'text',
        content: `Explore the project on <a href="https://architecturecompetitions.com/hongkongpixelhomes/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 38,
    title: "Affordable Housing @ Brickfield",
    date: "",
    excerpt: "Affordable Housing @ Brickfield by O2 Design Atelier proposes practical, cost-effective residential solutions for Brickfield, Kuala Lumpur, focusing on modular construction, community-oriented layouts, natural ventilation, and local materials to deliver quality, accessible homes in an urban context.",
    image: '/Publications/Affordable-Housing.avif',
    slug: "affordable-housing-brickfield",
    content: [
      {
        type: 'text',
        content: `This project tackles affordability and density in a multicultural neighborhood by emphasizing efficient spatial planning, shared amenities, and sustainable features like passive shading and rainwater systems.`
      },
      {
        type: 'text',
        content: `It prioritizes social connectivity, cultural sensitivity, and long-term livability for low-to-middle-income residents.`
      },
      {
        type: 'text',
        content: `View the project on Architizer <a href="https://architizer.com/projects/affordable-housing-brickfield/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 39,
    title: "Garisan",
    date: "",
    excerpt: "GARISAN (meaning 'line' in Malay) is a design exploration by O2 Design Atelier that uses linear elements, rhythmic forms, and spatial lines to create dynamic architecture, likely focusing on facade articulation, circulation flow, and integration with site context for a cohesive, expressive built environment.",
    image: '/Gallery/Housing/GarisanPuchong/A5.avif',
    slug: "garisan",
    content: [
      {
        type: 'text',
        content: `Drawing from the concept of 'garisan' as guiding lines, this project employs linear geometries to define spaces, guide movement, and enhance visual rhythm in residential or mixed-use architecture.`
      },
      {
        type: 'text',
        content: `It balances minimalism with tropical responsiveness, using lines for shading, ventilation, and aesthetic harmony.`
      },
      {
        type: 'text',
        content: `Discover the project on Architizer <a href="https://architizer.com/projects/garisan/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 40,
    title: "Courtyard House",
    date: "",
    excerpt: "Courtyard House (also known as A Home for 2) by O2 Design Atelier transforms an existing residence in Kuala Lumpur into a personalized, courtyard-centered home with open spatial planning, natural light, and indoor-outdoor flow, achieved through close collaboration and interior-focused upgrades.",
    image: '/Gallery/Residential/CourtyardHouse/A11.avif',
    slug: "courtyard-house",
    content: [
      {
        type: 'text',
        content: `This renovation emphasizes thoughtful courtyards, double-volume spaces, and premium fixtures to create a harmonious, user-centric living environment while preserving the original structure.`
      },
      {
        type: 'text',
        content: `It highlights collaborative design processes and tropical adaptations for enhanced comfort and connection to nature.`
      },
      {
        type: 'text',
        content: `Explore the project on Architizer <a href="https://architizer.com/projects/a-home-for-2/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 41,
    title: "3 Courtyards House",
    date: "",
    excerpt: "3 Courtyards House by O2 Design Atelier is a tropical residence in Petaling Jaya featuring three strategically placed courtyards that facilitate natural ventilation, daylighting, and privacy, creating a serene, nature-integrated home through passive design and open spatial voids.",
    image: '/Gallery/Residential/3CourtyardHouse/A12.avif',
    slug: "3-courtyards-house",
    content: [
      {
        type: 'text',
        content: `The layout centers around multiple courtyards to promote cross-breezes, shaded outdoor living, and a strong indoor-outdoor relationship suited to Malaysia's hot-humid climate.`
      },
      {
        type: 'text',
        content: `It incorporates biophilic elements, sustainable materials, and thoughtful massing for comfort and environmental harmony.`
      },
      {
        type: 'text',
        content: `View the project on Architizer <a href="https://architizer.com/projects/3-courtyards-house/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 42,
    title: "A Home For Two",
    date: "",
    excerpt: "A Home For Two (also referred to as Courtyard House) by O2 Design Atelier is a renovated residential project featuring a central courtyard garden that introduces natural light and greenery upon entry, creating a double-volume living space with seamless indoor-outdoor connection in a Kuala Lumpur home.",
    image: '/Gallery/Residential/Homefor2/A26.avif',
    slug: "a-home-for-two",
    content: [
      {
        type: 'text',
        content: `This private house renovation emphasizes thoughtful spatial organization with a welcoming courtyard garden adjacent to the living room, allowing abundant natural light and a sense of openness through double-volume elements.`
      },
      {
        type: 'text',
        content: `The design focuses on personalized comfort, blurring boundaries between interior and exterior, and creating a serene, nature-integrated living environment.`
      },
      {
        type: 'text',
        content: `Explore the project on Architizer <a href="https://architizer.com/projects/a-house-for-two/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 43,
    title: "Designer of the Year Awards 2017: Best Interior Design (Residential)- O2 Design Atelier Sdn Bhd",
    date: "2017",
    excerpt: "O2 Design Atelier Sdn Bhd won Best Interior Design (Residential) at the Designer of the Year Awards 2017 for their 'Terrace House' project, celebrated for bringing the outdoors inside through burnished cement walls, wooden furnishings, live plants creating a jungle-like ambiance, high ceilings for airiness, and a rustic yet secure and hospitable dwelling that feels like a magical concealment from the outside world.",
    image: '/Gallery/Residential/CourtyardHouse/A12.avif',
    slug: "designer-of-the-year-awards-2017-o2-design-atelier",
    content: [
      {
        type: 'text',
        content: `This award highlights the firm's innovative residential interior approach, combining concreteness and solidity of cement with warmth from wood and plants for a welcoming, nature-infused space.`
      },
      {
        type: 'text',
        content: `"Bringing the outdoors to your home is just what this project is all about." The rustic design allows residents to escape the external world in a secure, hospitable environment.`
      },
      {
        type: 'text',
        content: `Read the full feature on Designspeak Asia <a href="https://www.designspeak.asia/doty-o2-design-atelier-sdn-bhd/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 44,
    title: "Sentul Works Is An Immaculate Suburban Office In KL",
    date: "2021-09-25",
    excerpt: "Sentul Works revitalizes the 1904 Federated Malay States Railways headquarters in Kuala Lumpur into a modern suburban office, blending preserved heritage brickwork with contemporary steel frames, open-plan floors, and industrial-inspired elements in a symmetrical layout that honors classical roots while embracing the site's railway history.",
    image: '/Gallery/Commercial/SentulWorks/A12.avif',
    slug: "sentul-works-immaculate-suburban-office",
    content: [
      {
        type: 'text',
        content: `Designed in collaboration between Alexis Mariadass, O2 Design Atelier, and YTL Design Team for YTL Land & Development, the project reconstructs the dilapidated structure starting in 2018, using steel columns, ComFlor decking, and open ceilings to create flexible four-storey offices with minimal disruption.`
      },
      {
        type: 'text',
        content: `Inspired by projects like CaixaForum Madrid, it balances historical materiality with modern abstraction, activating heritage in Sentul's evolving landscape.`
      },
      {
        type: 'text',
        content: `Read the full article on Design and Architecture <a href="https://www.designandarchitecture.com/article/sentul-works-is-an-immaculate-suburban-office-in-kl.html" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 45,
    title: "Basic Selangor Double-Storey Terrace House is Transformed Into a Modern & Classic Masterpiece | Courtyard House by O2 Design Atelier",
    date: "",
    excerpt: "This renovation transforms a standard double-storey terrace house in Selangor into a modern-classic masterpiece known as Courtyard House, incorporating central courtyards, natural light, greenery, and open spatial planning to elevate everyday living through thoughtful extensions and tropical-responsive features.",
    image: '/Gallery/Residential/CourtyardHouse/A13.avif',
    slug: "courtyard-house-selangor-terrace-transformation",
    content: [
      {
        type: 'text',
        content: `The project reimagines conventional Malaysian terrace housing by inserting courtyards and voids for improved ventilation, daylight, and connection to nature, blending modern functionality with classic elegance.`
      },
      {
        type: 'text',
        content: `It draws from O2 Design Atelier's signature approach to heritage-inspired, user-centric renovations that create brighter, more breathable, and harmonious homes.`
      },
      {
        type: 'text',
        content: `Details available in the project spreadsheet <a href="https://homedecomalaysia.com/basic-selangor-double-storey-terrace-house-is-transformed-into-a-modern-classic-masterpiece/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">here</a>.`
      }
    ]
  },
  {
    id: 46,
    title: "O2 Design Atelier Wins International Competition to Design Kenyan Eco-Village for Orphaned Children",
    date: "2017",
    excerpt: "Malaysian firm O2 Design Atelier, led by Poo Liang Edric Choo, won the international Children’s Eco-Village Design Competition organized by the One Heart Foundation. The winning masterplan creates a sustainable, nurturing eco-village on an eight-acre site in Soy, Kenya, providing homes for 100 orphaned children, education for over 500, an income-generating eco-farm, and community skills training.",
    image: '/Gallery/Competition/KenyaOrph/A3.avif',
    slug: "o2-design-atelier-wins-kenyan-eco-village-competition",
    content: [
      {
        type: 'text',
        content: `The project serves as a sister campus to the existing One Heart Village in Turbo, Kenya. It embraces vernacular African architecture and locally sourced materials to create a warm, nurturing sense of place that helps orphaned and abandoned children feel at home while fostering community belonging and happiness.`
      },
      {
        type: 'text',
        content: `Key features of the masterplan include orphanage homes with courtyards, school buildings with dedicated courtyards and drop-off areas, an income-generating eco-farm, playing fields, a multi-purpose hall, and a storytelling pit. The design prioritizes environmental sustainability, low-cost and simple construction methods, and contextual responsiveness to the local climate, culture, and site.`
      },
      {
        type: 'text',
        content: `The competition attracted 45 entries from 21 countries. O2 Design Atelier will collaborate with Melbourne-based ClarkeHopkinsClarke for implementation, with construction planned to begin in early 2018. The jury, which included the Australian High Commissioner to Kenya and prominent architects, praised the proposal for its aesthetic beauty, functionality, and positive social impact through architecture.`
      },
      {
        type: 'text',
        content: `Details and images available in the original articles: <a href="https://architectureau.com/articles/o2-design-atelier-wins-competition-to-design-kenyan-eco-village/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">ArchitectureAU</a> and <a href="https://www.archdaily.com/805043/an-eco-village-for-orphaned-kenyan-children-competition-winners-announced" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">ArchDaily</a>.`
      }
    ],
  },
  {
    id: 47,
    title: "An Eco-Village for Orphaned Kenyan Children – Competition Winners Announced",
    date: "February 11, 2017",
    excerpt: "One Heart Foundation announced O2 Design Atelier (Malaysia) as the winner of the Children’s Eco-Village Design Competition. The eight-acre masterplan in Soy, Kenya, combines orphanage homes, school facilities, an eco-farm, and community spaces using vernacular architecture and local materials.",
    image: '/Gallery/Competition/KenyaOrph/A4.avif',
    slug: "kenyan-eco-village-orphaned-children-competition-winners",
    content: [
      {
        type: 'text',
        content: `The winning design was praised for creating a warm and nurturing sense of place through African-inspired architecture and locally sourced materials. It will house 100 orphaned children, provide education for over 500, create 50 local jobs, and generate income through the eco-farm.`
      },
      {
        type: 'text',
        content: `O2 Design Atelier, led by Poo Liang Edric Choo, will partner with ClarkeHopkinsClarke (Melbourne) for project realization, with work expected to start in early 2018. The competition received 45 entries from 21 countries.`
      },
      {
        type: 'text',
        content: `Read the full announcement: <a href="https://www.archdaily.com/805043/an-eco-village-for-orphaned-kenyan-children-competition-winners-announced" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-black/90">ArchDaily Winners Announcement</a>.`
      }
    ]
  }
];