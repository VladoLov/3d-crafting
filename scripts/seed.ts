import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Početak seed procesa...");

  // Kreiranje kategorija
  const categories = [
    {
      id: "graviranje",
      name: "Graviranje",
      slug: "graviranje",
      description: "Precizno graviranje na različitim materijalima",
      image: "/categories/graviranje.jpg",
    },
    {
      id: "cnc",
      name: "CNC Obrada",
      slug: "cnc-obrada",
      description: "CNC obrada drva, metala i plastike",
      image: "/categories/cnc.jpg",
    },
    {
      id: "3d-print",
      name: "3D Print",
      slug: "3d-print",
      description: "3D printanje prototipova i finalnih proizvoda",
      image: "/categories/3d-print.jpg",
    },
    {
      id: "svadbeni",
      name: "Svadbeni Proizvodi",
      slug: "svadbeni-proizvodi",
      description: "Personalizirani svadbeni proizvodi i dekoracije",
      image: "/categories/svadbeni.jpg",
    },
  ];

  // Upsert kategorije
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  console.log("✅ Kategorije kreirane");

  // Proizvodi za graviranje
  const graviranjeProducts = [
    {
      name: "Gravirana Pločica - Inox",
      slug: "gravirana-plocica-inox",
      description:
        "Profesionalna gravirana pločica od nehrđajućeg čelika, idealna za oznake i tablice.",
      price: 25.0,
      images: [
        "/products/graviranje/plocica-inox-1.jpg",
        "/products/graviranje/plocica-inox-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Personalizirani Privjesak",
      slug: "personalizirani-privjesak",
      description:
        "Elegantni privjesak s graviranjem po želji. Dostupan u različitim oblicima.",
      price: 15.0,
      images: [
        "/products/graviranje/privjesak-1.jpg",
        "/products/graviranje/privjesak-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Gravirana Čaša",
      slug: "gravirana-casa",
      description:
        "Staklena čaša s laserskim graviranjem. Savršena za poklon ili promociju.",
      price: 18.0,
      images: [
        "/products/graviranje/casa-1.jpg",
        "/products/graviranje/casa-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Drvena Plaketa",
      slug: "drvena-plaketa",
      description:
        "Elegantna drvena plaketa s preciznim graviranjem teksta i logotipa.",
      price: 35.0,
      images: [
        "/products/graviranje/plaketa-1.jpg",
        "/products/graviranje/plaketa-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Metalna Vizitka",
      slug: "metalna-vizitka",
      description:
        "Luksuzna metalna vizitka s graviranjem kontakt informacija.",
      price: 45.0,
      images: [
        "/products/graviranje/vizitka-1.jpg",
        "/products/graviranje/vizitka-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Gravirana Olovka",
      slug: "gravirana-olovka",
      description: "Kvalitetna metalna olovka s personaliziranim graviranjem.",
      price: 22.0,
      images: [
        "/products/graviranje/olovka-1.jpg",
        "/products/graviranje/olovka-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Kristalna Nagrada",
      slug: "kristalna-nagrada",
      description:
        "Prestižna kristalna nagrada s 3D graviranjem unutar kristala.",
      price: 85.0,
      images: [
        "/products/graviranje/kristal-1.jpg",
        "/products/graviranje/kristal-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Gravirana Tabla",
      slug: "gravirana-tabla",
      description:
        "Profesionalna tabla za vrata ili zid s graviranjem naziva i informacija.",
      price: 40.0,
      images: [
        "/products/graviranje/tabla-1.jpg",
        "/products/graviranje/tabla-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Personalizirani Sat",
      slug: "personalizirani-sat",
      description:
        "Drveni zidni sat s graviranjem po želji. Jedinstveni poklon.",
      price: 55.0,
      images: [
        "/products/graviranje/sat-1.jpg",
        "/products/graviranje/sat-2.jpg",
      ],
      categoryId: "graviranje",
    },
    {
      name: "Gravirana Kutija",
      slug: "gravirana-kutija",
      description:
        "Elegantna drvena kutija s graviranjem. Idealna za čuvanje dragocjenosti.",
      price: 65.0,
      images: [
        "/products/graviranje/kutija-1.jpg",
        "/products/graviranje/kutija-2.jpg",
      ],
      categoryId: "graviranje",
    },
  ];

  // Proizvodi za CNC obradu
  const cncProducts = [
    {
      name: "CNC Drveni Panel",
      slug: "cnc-drveni-panel",
      description:
        "Precizno izrezani drveni panel s kompleksnim uzorkom. Idealan za dekoraciju.",
      price: 120.0,
      images: ["/products/cnc/panel-1.jpg", "/products/cnc/panel-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Metalni Nosač",
      slug: "metalni-nosac",
      description:
        "CNC obrađeni metalni nosač po tehničkim crtežima. Visoka preciznost.",
      price: 95.0,
      images: ["/products/cnc/nosac-1.jpg", "/products/cnc/nosac-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Drvena Skulptura",
      slug: "drvena-skulptura",
      description:
        "3D CNC skulptura iz masivnog drva. Umjetničko djelo po narudžbi.",
      price: 250.0,
      images: [
        "/products/cnc/skulptura-1.jpg",
        "/products/cnc/skulptura-2.jpg",
      ],
      categoryId: "cnc",
    },
    {
      name: "Plastični Prototip",
      slug: "plasticni-prototip",
      description:
        "CNC obrađeni plastični prototip prema 3D modelu. Brza izrada.",
      price: 75.0,
      images: ["/products/cnc/prototip-1.jpg", "/products/cnc/prototip-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Aluminijski Dio",
      slug: "aluminijski-dio",
      description:
        "Precizni aluminijski dio obrađen na CNC stroju. Industrijska kvaliteta.",
      price: 85.0,
      images: ["/products/cnc/aluminij-1.jpg", "/products/cnc/aluminij-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Drveni Zupčanik",
      slug: "drveni-zupcalik",
      description: "Funkcionalni drveni zupčanik izrađen CNC tehnologijom.",
      price: 45.0,
      images: ["/products/cnc/zupcalik-1.jpg", "/products/cnc/zupcalik-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Kompleksni Kalup",
      slug: "kompleksni-kalup",
      description:
        "CNC obrađeni kalup za lijevanje. Visoka preciznost i glatka površina.",
      price: 180.0,
      images: ["/products/cnc/kalup-1.jpg", "/products/cnc/kalup-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Dekorativni Element",
      slug: "dekorativni-element",
      description: "Umjetnički dekorativni element obrađen CNC tehnologijom.",
      price: 65.0,
      images: ["/products/cnc/dekor-1.jpg", "/products/cnc/dekor-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Tehnički Dio",
      slug: "tehnicki-dio",
      description: "Precizni tehnički dio prema tehničkoj dokumentaciji.",
      price: 110.0,
      images: ["/products/cnc/tehnicki-1.jpg", "/products/cnc/tehnicki-2.jpg"],
      categoryId: "cnc",
    },
    {
      name: "Drvena Ploča s Uzorkom",
      slug: "drvena-ploca-uzorak",
      description: "Dekorativna drvena ploča s CNC izrezanim uzorkom.",
      price: 90.0,
      images: ["/products/cnc/ploca-1.jpg", "/products/cnc/ploca-2.jpg"],
      categoryId: "cnc",
    },
  ];

  // Proizvodi za 3D print
  const print3dProducts = [
    {
      name: "3D Prototip Proizvoda",
      slug: "3d-prototip-proizvoda",
      description:
        "Brzi prototip vašeg proizvoda u PLA materijalu. Idealno za testiranje.",
      price: 35.0,
      images: [
        "/products/3d-print/prototip-1.jpg",
        "/products/3d-print/prototip-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Personalizirana Figurica",
      slug: "personalizirana-figurica",
      description:
        "3D printana figurica prema fotografiji. Jedinstveni poklon.",
      price: 45.0,
      images: [
        "/products/3d-print/figurica-1.jpg",
        "/products/3d-print/figurica-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Funkcionalni Alat",
      slug: "funkcionalni-alat",
      description: "3D printani alat ili pomagalo prema specifikaciji.",
      price: 25.0,
      images: [
        "/products/3d-print/alat-1.jpg",
        "/products/3d-print/alat-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Arhitektonski Model",
      slug: "arhitektonski-model",
      description: "Detaljni 3D model zgrade ili objekta u mjerilu.",
      price: 150.0,
      images: [
        "/products/3d-print/model-1.jpg",
        "/products/3d-print/model-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Rezervni Dio",
      slug: "rezervni-dio",
      description: "3D printani rezervni dio za popravak uređaja.",
      price: 20.0,
      images: [
        "/products/3d-print/rezervni-1.jpg",
        "/products/3d-print/rezervni-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Dekorativna Vaza",
      slug: "dekorativna-vaza",
      description: "Elegantna 3D printana vaza s jedinstvenim dizajnom.",
      price: 40.0,
      images: [
        "/products/3d-print/vaza-1.jpg",
        "/products/3d-print/vaza-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Edukacijski Model",
      slug: "edukacijski-model",
      description: "3D model za edukaciju - anatomija, kemija, fizika.",
      price: 55.0,
      images: [
        "/products/3d-print/edukacija-1.jpg",
        "/products/3d-print/edukacija-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Igračka po Narudžbi",
      slug: "igracka-narudzbi",
      description: "Sigurna 3D printana igračka prema vašoj ideji.",
      price: 30.0,
      images: [
        "/products/3d-print/igracka-1.jpg",
        "/products/3d-print/igracka-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Tehnički Prototip",
      slug: "tehnicki-prototip",
      description: "Funkcionalni prototip s pokretnim dijelovima.",
      price: 75.0,
      images: [
        "/products/3d-print/tehnicki-1.jpg",
        "/products/3d-print/tehnicki-2.jpg",
      ],
      categoryId: "3d-print",
    },
    {
      name: "Umjetnička Skulptura",
      slug: "umjetnicka-skulptura",
      description: "Kompleksna umjetnička skulptura u visokoj rezoluciji.",
      price: 95.0,
      images: [
        "/products/3d-print/skulptura-1.jpg",
        "/products/3d-print/skulptura-2.jpg",
      ],
      categoryId: "3d-print",
    },
  ];

  // Svadbeni proizvodi
  const svadbeniProducts = [
    {
      name: "Personalizirane Pozivnice",
      slug: "personalizirane-pozivnice",
      description:
        "Elegantne svadbene pozivnice s laserskim rezanjem i graviranjem.",
      price: 8.0,
      images: [
        "/products/svadbeni/pozivnice-1.jpg",
        "/products/svadbeni/pozivnice-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Drveni Gostinjak",
      slug: "drveni-gostinjak",
      description: "Rustični drveni gostinjak s graviranjem imena mladenaca.",
      price: 120.0,
      images: [
        "/products/svadbeni/gostinjak-1.jpg",
        "/products/svadbeni/gostinjak-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Svadbene Čaše",
      slug: "svadbene-case",
      description:
        "Set graviranih čaša za mladence s personaliziranim natpisom.",
      price: 45.0,
      images: [
        "/products/svadbeni/case-1.jpg",
        "/products/svadbeni/case-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Kutija za Prstenje",
      slug: "kutija-prstenje",
      description: "Elegantna drvena kutija za vjenčane prstene s graviranjem.",
      price: 35.0,
      images: [
        "/products/svadbeni/kutija-1.jpg",
        "/products/svadbeni/kutija-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Svadbeni Topper",
      slug: "svadbeni-topper",
      description: "3D printani ili laserski izrezan topper za svadbenu tortu.",
      price: 25.0,
      images: [
        "/products/svadbeni/topper-1.jpg",
        "/products/svadbeni/topper-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Zahvalnice",
      slug: "zahvalnice",
      description: "Personalizirane zahvalnice s laserskim rezanjem.",
      price: 6.0,
      images: [
        "/products/svadbeni/zahvalnice-1.jpg",
        "/products/svadbeni/zahvalnice-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Svadbeni Okvir",
      slug: "svadbeni-okvir",
      description:
        "Dekorativni okvir za svadbenu fotografiju s graviranjem datuma.",
      price: 55.0,
      images: [
        "/products/svadbeni/okvir-1.jpg",
        "/products/svadbeni/okvir-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Centri za Stolove",
      slug: "centri-stolove",
      description: "Elegantni centri za svadbene stolove s LED osvjetljenjem.",
      price: 75.0,
      images: [
        "/products/svadbeni/centri-1.jpg",
        "/products/svadbeni/centri-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Svadbeni Album",
      slug: "svadbeni-album",
      description:
        "Luksuzni drveni album za svadbene fotografije s graviranjem.",
      price: 95.0,
      images: [
        "/products/svadbeni/album-1.jpg",
        "/products/svadbeni/album-2.jpg",
      ],
      categoryId: "svadbeni",
    },
    {
      name: "Personalizirani Privjesci",
      slug: "personalizirani-privjesci-svadbeni",
      description: "Mali privjesci za goste s imenima mladenaca i datumom.",
      price: 4.0,
      images: [
        "/products/svadbeni/privjesci-1.jpg",
        "/products/svadbeni/privjesci-2.jpg",
      ],
      categoryId: "svadbeni",
    },
  ];

  // Kombiniranje svih proizvoda
  const allProducts = [
    ...graviranjeProducts,
    ...cncProducts,
    ...print3dProducts,
    ...svadbeniProducts,
  ];

  // Kreiranje proizvoda
  for (const product of allProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("✅ Proizvodi kreirani");
  console.log(
    `📊 Ukupno kreirano: ${allProducts.length} proizvoda u ${categories.length} kategorije`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🎉 Seed proces završen uspješno!");
  })
  .catch(async (e) => {
    console.error("❌ Greška u seed procesu:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
