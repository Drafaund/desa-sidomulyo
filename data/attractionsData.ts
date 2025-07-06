// src/data/attractionsData.ts

export interface CategoryColor {
  bg: string;
  hover: string;
  text: string;
  bgLight: string;
  borderLight: string;
}

export interface Attraction {
  id: number;
  title: string;
  slug: string; // Added slug field
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  link: string;
  contact: {
    phone?: string;
    email?: string;
    address: string;
  };
  operatingHours: {
    days: string;
    hours: string;
  };
  location: {
    lat: number;
    lng: number;
    embedUrl: string;
  };
}

export const categoryColors: Record<string, CategoryColor> = {
  Pertanian: {
    bg: "bg-green-500",
    hover: "hover:bg-green-100",
    text: "text-green-600",
    bgLight: "bg-green-50",
    borderLight: "border-green-200",
  },
  Peternakan: {
    bg: "bg-amber-500",
    hover: "hover:bg-amber-100",
    text: "text-amber-600",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
  },
  Wisata: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-100",
    text: "text-blue-600",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
  },
  Industri: {
    bg: "bg-purple-500",
    hover: "hover:bg-purple-100",
    text: "text-purple-600",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
  },
  Semua: {
    bg: "bg-gray-600",
    text: "text-gray-800",
    hover: "hover:bg-gray-100",
    bgLight: "bg-gray-50",
    borderLight: "border-gray-100",
  },
};

export const attractionsData: Attraction[] = [
  {
    id: 1,
    title: "Kebun Sayur Organik Desa",
    slug: "kebun-sayur-organik-desa",
    description:
      "Kebun sayur organik yang memproduksi berbagai jenis sayuran segar tanpa pestisida",
    fullDescription:
      "Kebun Sayur Organik Desa merupakan salah satu kebanggaan masyarakat setempat. Dengan luas area 2 hektar, kebun ini memproduksi berbagai jenis sayuran organik seperti kangkung, bayam, tomat, cabai, dan terong. Metode pertanian yang digunakan adalah sistem organik murni tanpa menggunakan pestisida kimia. Pengunjung dapat melihat langsung proses budidaya, belajar tentang teknik pertanian organik, dan membeli hasil panen segar langsung dari petani. Kebun ini juga menjadi pusat edukasi pertanian organik bagi masyarakat sekitar dan sekolah-sekolah yang berkunjung.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670980/pabrik-makanan-ringan_thqm8h.jpg",
    category: "Pertanian",
    link: "/PotensiDesa/kebun-sayur-organik-desa",
    contact: {
      phone: "+62 812-3456-7890",
      email: "kebunorganik@desa.com",
      address: "Jl. Raya Desa No. 123, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Senin - Sabtu",
      hours: "06:00 - 17:00 WIB",
    },
    location: {
      lat: -7.250445,
      lng: 112.768845,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.768845!3d-7.250445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDEuNiJTIDExMsKwNDYnMDcuOCJF!5e0!3m2!1sen!2sid!4v1234567890",
    },
  },
  {
    id: 2,
    title: "Peternakan Sapi Perah",
    slug: "peternakan-sapi-perah",
    description:
      "Peternakan sapi perah modern dengan produksi susu segar berkualitas tinggi",
    fullDescription:
      "Peternakan Sapi Perah Desa telah beroperasi selama lebih dari 15 tahun dengan populasi 50 ekor sapi perah. Peternakan ini menggunakan teknologi modern dalam proses pemerahan dan pengolahan susu. Susu segar yang dihasilkan memiliki kualitas tinggi dan telah mendapat sertifikat dari Dinas Peternakan. Pengunjung dapat melihat proses pemerahan, memberi makan sapi, dan mencicipi susu segar langsung dari peternakan. Peternakan ini juga menjadi sumber penghasilan utama bagi beberapa keluarga di desa dan berkontribusi pada perekonomian lokal.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670982/peternakan-sapi-perah_ztjxms.jpg",

    category: "Peternakan",
    link: "/PotensiDesa/peternakan-sapi-perah",
    contact: {
      phone: "+62 813-7890-1234",
      email: "sapiperah@desa.com",
      address: "Jl. Peternakan No. 456, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Setiap Hari",
      hours: "05:00 - 18:00 WIB",
    },
    location: {
      lat: -7.255445,
      lng: 112.773845,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.773845!3d-7.255445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMTkuNiJTIDExMsKwNDYnMjUuOCJF!5e0!3m2!1sen!2sid!4v1234567891",
    },
  },
  {
    id: 3,
    title: "Wisata Alam Hutan Bambu",
    slug: "wisata-alam-hutan-bambu",
    description:
      "Destinasi wisata alam dengan hutan bambu yang sejuk dan udara yang segar",
    fullDescription:
      "Wisata Alam Hutan Bambu merupakan destinasi wisata unggulan desa yang menawarkan suasana alam yang sejuk dan menenangkan. Hutan bambu seluas 5 hektar ini memiliki jalur trekking sepanjang 2 km yang dapat dilalui pengunjung. Di sepanjang perjalanan, pengunjung dapat menikmati rimbunnya bambu yang memberikan keteduhan alami. Terdapat juga spot foto instagramable dan area piknik keluarga. Wisata ini cocok untuk melepas penat dan menikmati keindahan alam. Pengelolaan wisata ini melibatkan masyarakat lokal sebagai pemandu dan penjaga kebersihan area wisata.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670981/wisata-hutan-bambu_mzsho8.jpg",

    category: "Wisata",
    link: "/PotensiDesa/wisata-alam-hutan-bambu",
    contact: {
      phone: "+62 814-2345-6789",
      email: "hutanbambu@desa.com",
      address: "Jl. Wisata Alam No. 789, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Setiap Hari",
      hours: "07:00 - 17:00 WIB",
    },
    location: {
      lat: -7.240445,
      lng: 112.765845,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.765845!3d-7.240445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMjUuNiJTIDExMsKwNDUnNTcuMCJF!5e0!3m2!1sen!2sid!4v1234567892",
    },
  },
  {
    id: 4,
    title: "Kebun Buah Lokal",
    slug: "kebun-buah-lokal",
    description:
      "Kebun buah yang menanam berbagai jenis buah lokal seperti mangga, rambutan, dan durian",
    fullDescription:
      "Kebun Buah Lokal merupakan salah satu aset pertanian desa yang menanam berbagai jenis buah-buahan lokal. Dengan luas area 3 hektar, kebun ini menjadi rumah bagi berbagai jenis pohon buah seperti mangga, rambutan, durian, jambu, dan jeruk. Kebun ini dikelola secara tradisional dengan teknik budidaya yang ramah lingkungan. Pengunjung dapat memetik buah langsung dari pohon saat musim panen, belajar tentang cara budidaya buah lokal, dan membeli buah segar dengan harga langsung dari petani. Kebun ini juga menjadi tempat wisata edukasi yang menarik bagi keluarga.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670975/kebun-buah_s1uh2f.jpg",
    category: "Pertanian",
    link: "/PotensiDesa/kebun-buah-lokal",
    contact: {
      phone: "+62 815-4567-8901",
      email: "kebunbuah@desa.com",
      address: "Jl. Kebun Raya No. 321, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Senin - Minggu",
      hours: "07:00 - 16:00 WIB",
    },
    location: {
      lat: -7.245445,
      lng: 112.770845,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.770845!3d-7.245445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnNDMuNiJTIDExMsKwNDYnMTUuMCJF!5e0!3m2!1sen!2sid!4v1234567893",
    },
  },
  {
    id: 5,
    title: "Peternakan Ayam Kampung",
    slug: "peternakan-ayam-kampung",
    description:
      "Peternakan ayam kampung dengan sistem pemeliharaan tradisional yang menghasilkan telur dan daging berkualitas",
    fullDescription:
      "Peternakan Ayam Kampung Desa telah beroperasi selama 10 tahun dengan populasi sekitar 200 ekor ayam kampung. Peternakan ini menggunakan sistem pemeliharaan semi-intensif yang memungkinkan ayam berkeliaran bebas di area yang luas. Ayam-ayam ini diberi pakan alami berupa dedak, jagung, dan sayuran hijau. Telur yang dihasilkan memiliki kualitas tinggi dengan kuning telur yang pekat dan rasa yang khas. Peternakan ini juga menjadi sumber penghasilan bagi keluarga peternak dan menyuplai kebutuhan telur dan daging ayam kampung untuk pasar lokal.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670980/peternakan-ayam_i7pe3d.jpg",

    category: "Peternakan",
    link: "/PotensiDesa/peternakan-ayam-kampung",
    contact: {
      phone: "+62 816-6789-0123",
      email: "ayamkampung@desa.com",
      address: "Jl. Peternakan Rakyat No. 654, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Setiap Hari",
      hours: "06:00 - 18:00 WIB",
    },
    location: {
      lat: -7.260445,
      lng: 112.775845,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.775845!3d-7.260445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMzguNCJTIDExMsKwNDYnMzMuMCJF!5e0!3m2!1sen!2sid!4v1234567894",
    },
  },
  {
    id: 6,
    title: "Pantai Pasir Putih",
    slug: "pantai-pasir-putih",
    description:
      "Pantai dengan pasir putih dan air laut yang jernih, cocok untuk berenang dan bersantai",
    fullDescription:
      "Pantai Pasir Putih merupakan destinasi wisata pantai yang memukau dengan hamparan pasir putih yang lembut dan air laut yang jernih berwarna biru kehijauan. Pantai ini memiliki panjang sekitar 1 km dengan ombak yang tenang, sangat cocok untuk berenang dan aktivitas air lainnya. Terdapat fasilitas gazebo untuk bersantai, warung makan yang menyajikan makanan laut segar, dan area parkir yang luas. Pantai ini juga menjadi spot favorit untuk menikmati sunset yang indah. Pengelolaan pantai ini melibatkan masyarakat lokal sebagai penjaga kebersihan dan keamanan.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670675/pantai-pasir-putih_l4eoh6.jpg",

    category: "Wisata",
    link: "/PotensiDesa/pantai-pasir-putih",
    contact: {
      phone: "+62 817-8901-2345",
      email: "pantaipasirputih@desa.com",
      address: "Jl. Pantai Indah No. 987, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Setiap Hari",
      hours: "24 Jam",
    },
    location: {
      lat: -7.235445,
      lng: 112.760845,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.760845!3d-7.235445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMDcuNiJTIDExMsKwNDUnMzkuMCJF!5e0!3m2!1sen!2sid!4v1234567895",
    },
  },
  {
    id: 7,
    title: "Pabrik Keramik Desa",
    slug: "pabrik-keramik-desa",
    description:
      "Pabrik keramik yang memproduksi berbagai jenis keramik berkualitas tinggi dengan teknik tradisional",
    fullDescription:
      "Pabrik Keramik Desa telah beroperasi sejak tahun 2005 dan menjadi salah satu pabrik keramik terkemuka di wilayah ini. Dengan menggunakan teknik tradisional yang dipadukan dengan teknologi modern, pabrik ini memproduksi berbagai jenis keramik seperti piring, mangkuk, dan vas bunga. Pengunjung dapat melihat langsung proses pembuatan keramik, mulai dari pengolahan tanah liat hingga pembakaran di oven. Pabrik ini juga menyediakan workshop bagi pengunjung yang ingin belajar membuat keramik sendiri.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670980/pabrik-keramik_e0kj7b.jpg",

    category: "Industri",
    link: "/PotensiDesa/pabrik-keramik-desa",
    contact: {
      phone: "+62 818-1234-5678",
      email: "pabrikkeramik@desa.com",
      address: "Jl. Industri No. 123, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Senin - Sabtu",
      hours: "08:00 - 17:00 WIB",
    },
    location: {
      lat: -7.25,
      lng: 112.76,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.760000!3d-7.250000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMDcuNiJTIDExMsKwNDUnMzguMCJF!5e0!3m2!1sen!2sid!4v1234567896",
    },
  },
  {
    id: 8,
    title: "Pabrik Makanan Ringan",
    slug: "pabrik-makanan-ringan",
    description:
      "Pabrik yang memproduksi berbagai jenis makanan ringan khas desa dengan bahan alami",
    fullDescription:
      "Pabrik Makanan Ringan Desa menyediakan berbagai jenis makanan ringan yang terbuat dari bahan-bahan alami dan berkualitas. Sejak didirikan pada tahun 2010, pabrik ini telah menjadi favorit masyarakat lokal dan wisatawan. Produk yang ditawarkan termasuk keripik singkong, kacang goreng, dan snack berbasis sayuran. Pengunjung dapat mengikuti tur pabrik untuk melihat proses produksi, mulai dari pemilihan bahan baku hingga pengemasan produk. Pabrik ini juga menawarkan sesi mencicipi produk untuk pengunjung.",
    image:
      "https://res.cloudinary.com/dviwzluld/image/upload/v1751670980/pabrik-makanan-ringan_thqm8h.jpg",

    category: "Industri",
    link: "/PotensiDesa/pabrik-makanan-ringan",
    contact: {
      phone: "+62 819-2345-6789",
      email: "pabrikmakanan@desa.com",
      address: "Jl. Makanan Ringan No. 456, Kecamatan ABC, Kabupaten XYZ",
    },
    operatingHours: {
      days: "Setiap Hari",
      hours: "09:00 - 18:00 WIB",
    },
    location: {
      lat: -7.255,
      lng: 112.765,
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0!2d112.765000!3d-7.255000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMTkuNiJTIDExMsKwNDYnMjUuMCJF!5e0!3m2!1sen!2sid!4v1234567897",
    },
  },
];
