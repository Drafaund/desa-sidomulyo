// data/investmentData.ts
import { Leaf, Fence, TicketsPlane, Factory } from "lucide-react";

export interface InvestmentData {
  id: number;
  slug: string;
  title: string;
  category: "Pertanian" | "Peternakan" | "Wisata" | "Industri";
  roi: string;
  description: string;
  investasiMinimal: string;
  periode: string;
  detailDescription?: string;
  benefits?: string[];
  requirements?: string[];
  timeline?: string[];
  contact?: {
    name: string;
    phone: string;
    email: string;
  };
}

export const investmentData: InvestmentData[] = [
  {
    id: 1,
    slug: "agrowisata-terpadu",
    title: "Agrowisata Terpadu",
    category: "Pertanian",
    roi: "25-35%",
    description:
      "Pengembangan kawasan agrowisata dengan konsep farm-to-table, edukasi pertanian, dan homestay tradisional.",
    investasiMinimal: "Rp 500 Jt",
    periode: "3-5 Tahun",
    detailDescription:
      "Proyek agrowisata terpadu ini menggabungkan aktivitas pertanian produktif dengan pariwisata edukasi. Kawasan ini akan dilengkapi dengan fasilitas edukasi pertanian modern, area bermain anak, restoran farm-to-table, dan homestay tradisional yang nyaman. Konsep ini tidak hanya menghasilkan produk pertanian berkualitas tinggi, tetapi juga menarik wisatawan untuk belajar tentang praktik pertanian berkelanjutan.",
    benefits: [
      "Diversifikasi sumber pendapatan dari pertanian dan pariwisata",
      "Peningkatan nilai tambah produk pertanian lokal",
      "Penciptaan lapangan kerja untuk masyarakat sekitar",
      "Konservasi budaya pertanian tradisional",
      "Peningkatan kesadaran masyarakat tentang pertanian berkelanjutan",
    ],
    requirements: [
      "Lahan minimal 5 hektar dengan akses jalan yang baik",
      "Sumber air yang memadai untuk kebutuhan pertanian dan wisata",
      "Komitmen terhadap praktik pertanian berkelanjutan",
      "Kerjasama dengan petani lokal dan komunitas sekitar",
      "Izin usaha pariwisata dan pertanian yang lengkap",
    ],
    timeline: [
      "Tahun 1: Persiapan lahan dan infrastruktur dasar",
      "Tahun 2: Pembangunan fasilitas wisata dan penanaman",
      "Tahun 3: Operasional soft opening dan perbaikan",
      "Tahun 4-5: Operasional penuh dan ekspansi",
    ],
    contact: {
      name: "Budi Santoso",
      phone: "+62 812-3456-7890",
      email: "budi.santoso@desa-sidomulyo.go.id",
    },
  },
  {
    id: 2,
    slug: "industri-pengolahan",
    title: "Industri Pengolahan",
    category: "Industri",
    roi: "20-30%",
    description:
      "Pembangunan fasilitas pengolahan hasil pertanian dan peternakan dengan teknologi modern untuk meningkatkan nilai tambah.",
    investasiMinimal: "Rp 800 Jt",
    periode: "4-6 Tahun",
    detailDescription:
      "Fasilitas pengolahan modern ini dirancang untuk mengolah hasil pertanian dan peternakan lokal menjadi produk bernilai tambah tinggi. Dilengkapi dengan teknologi pengolahan terkini, cold storage, dan sistem packaging yang higienis untuk memenuhi standar ekspor. Industri ini akan menjadi hub pengolahan regional yang mendukung perekonomian desa dan sekitarnya.",
    benefits: [
      "Peningkatan nilai tambah produk pertanian hingga 300%",
      "Penyerapan tenaga kerja lokal dengan skill modern",
      "Stabilitas harga produk petani dengan jaminan pembelian",
      "Akses ke pasar regional dan ekspor",
      "Transfer teknologi pengolahan kepada masyarakat",
    ],
    requirements: [
      "Lahan industri minimal 2 hektar dengan zona industri",
      "Akses listrik dengan daya minimum 450 KVA",
      "Sumber air bersih yang memadai untuk proses produksi",
      "Akses transportasi yang mudah ke jalan utama",
      "Izin lingkungan dan operasional industri",
    ],
    timeline: [
      "Tahun 1: Perizinan dan pembangunan infrastruktur",
      "Tahun 2: Instalasi mesin dan commissioning",
      "Tahun 3: Uji coba produksi dan sertifikasi",
      "Tahun 4-6: Produksi komersial dan ekspansi pasar",
    ],
    contact: {
      name: "Siti Nurhasanah",
      phone: "+62 813-2345-6789",
      email: "siti.nurhasanah@desa-sidomulyo.go.id",
    },
  },
  {
    id: 3,
    slug: "peternakan-modern",
    title: "Peternakan Modern",
    category: "Peternakan",
    roi: "18-25%",
    description:
      "Pengembangan peternakan sapi dan kambing dengan sistem kandang modern, pakan berkualitas, dan manajemen kesehatan terpadu.",
    investasiMinimal: "Rp 600 Jt",
    periode: "3-4 Tahun",
    detailDescription:
      "Proyek peternakan modern ini menerapkan sistem manajemen peternakan terpadu dengan teknologi IoT untuk monitoring kesehatan ternak, sistem pakan otomatis, dan pengolahan limbah menjadi pupuk organik. Fasilitas ini dirancang untuk mengoptimalkan produktivitas ternak sambil menjaga kelestarian lingkungan.",
    benefits: [
      "Produktivitas ternak yang tinggi dengan mortalitas rendah",
      "Kualitas daging dan susu yang konsisten",
      "Pengolahan limbah menjadi pupuk organik bernilai ekonomis",
      "Penciptaan rantai nilai terintegrasi dari pakan hingga produk jadi",
      "Peningkatan kesejahteraan peternak lokal",
    ],
    requirements: [
      "Lahan minimal 3 hektar dengan topografi yang sesuai",
      "Akses air bersih yang memadai untuk kebutuhan ternak",
      "Sumber pakan hijauan yang berkelanjutan",
      "Tenaga kerja terlatih dalam manajemen peternakan modern",
      "Izin usaha peternakan dan lingkungan",
    ],
    timeline: [
      "Tahun 1: Pembangunan kandang dan infrastruktur",
      "Tahun 2: Pengadaan bibit dan operasional awal",
      "Tahun 3: Pengembangan produk dan pemasaran",
      "Tahun 4: Ekspansi dan diversifikasi produk",
    ],
    contact: {
      name: "Ahmad Wijaya",
      phone: "+62 814-3456-7890",
      email: "ahmad.wijaya@desa-sidomulyo.go.id",
    },
  },
  {
    id: 4,
    slug: "desa-wisata-budaya",
    title: "Desa Wisata Budaya",
    category: "Wisata",
    roi: "22-28%",
    description:
      "Pengembangan desa wisata dengan fokus pada pelestarian budaya lokal, kuliner tradisional, dan aktivitas wisata berbasis masyarakat.",
    investasiMinimal: "Rp 400 Jt",
    periode: "2-4 Tahun",
    detailDescription:
      "Proyek desa wisata budaya ini bertujuan mengembangkan pariwisata berbasis masyarakat yang memadukan kearifan lokal dengan fasilitas wisata modern. Pengunjung dapat menikmati pertunjukan seni tradisional, belajar membuat kerajinan lokal, menikmati kuliner khas desa, dan menginap di rumah tradisional yang telah dimodernisasi.",
    benefits: [
      "Pelestarian dan revitalisasi budaya lokal",
      "Peningkatan pendapatan masyarakat melalui pariwisata",
      "Pengembangan UMKM kerajinan dan kuliner lokal",
      "Promosi desa sebagai destinasi wisata budaya",
      "Pemberdayaan perempuan dan pemuda desa",
    ],
    requirements: [
      "Potensi budaya dan tradisi yang masih terjaga",
      "Dukungan penuh dari masyarakat dan tokoh adat",
      "Infrastruktur dasar yang memadai",
      "Pelatihan guide wisata dan hospitality",
      "Izin usaha pariwisata dan kebudayaan",
    ],
    timeline: [
      "Tahun 1: Pelatihan masyarakat dan renovasi fasilitas",
      "Tahun 2: Soft opening dan promosi awal",
      "Tahun 3: Operasional penuh dan pengembangan atraksi",
      "Tahun 4: Ekspansi dan branding regional",
    ],
    contact: {
      name: "Dewi Kusuma",
      phone: "+62 815-4567-8901",
      email: "dewi.kusuma@desa-sidomulyo.go.id",
    },
  },
];

export const getCategoryConfig = (category: InvestmentData["category"]) => {
  const configs = {
    Pertanian: {
      color: "green",
      bgColor: "bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      iconColor: "text-green-600",
      icon: Leaf,
    },
    Peternakan: {
      color: "orange",
      bgColor: "bg-orange-50",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      iconColor: "text-orange-600",
      icon: Fence,
    },
    Wisata: {
      color: "blue",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      iconColor: "text-blue-600",
      icon: TicketsPlane,
    },
    Industri: {
      color: "purple",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      iconColor: "text-purple-600",
      icon: Factory,
    },
  };

  return configs[category];
};

export const getInvestmentBySlug = (
  slug: string
): InvestmentData | undefined => {
  return investmentData.find((investment) => investment.slug === slug);
};
