"use client";
import StatCard from "@/components/StatCard";
import { MessageCircle, Mail, MessageSquare } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { TreePine, Truck, Triangle, Users } from "lucide-react";
import PotentialCard from "@/components/PotentialCard";
import InvestmentCard from "@/components/InvestmentCard";
import { Leaf, Factory } from "lucide-react";

const statistikData = [
  {
    icon: <TreePine className="w-8 h-8 text-green-600" />,
    jumlah: "850",
    label: "Hektar Lahan Pertanian",
    color: "text-green-600",
  },
  {
    icon: <Truck className="w-8 h-8 text-blue-600" />,
    jumlah: "320",
    label: "Kepala Ternak",
    color: "text-blue-600",
  },
  {
    icon: <Triangle className="w-8 h-8 text-orange-600" />,
    jumlah: "12",
    label: "Destinasi Wisata",
    color: "text-orange-600",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" />,
    jumlah: "2,450",
    label: "Penduduk Aktif",
    color: "text-purple-600",
  },
];

const kategoriPotensi = [
  {
    id: 1,
    title: "Pertanian",
    image: "/potensi-pertanian.png",
    description:
      "Lahan pertanian subur dengan sistem irigasi yang baik, menghasilkan padi, jagung, dan sayuran berkualitas tinggi.",
    features: [
      "850 Ha lahan produktif",
      "Irigasi teknis modern",
      "Organik certified",
    ],
    buttonColor: "bg-green-600 hover:bg-green-700",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Wisata",
    image: "/potensi-wisata.png",
    description:
      "Destinasi wisata alam dan budaya yang memukau dengan pemandangan pegunungan dan tradisi lokal yang kaya.",
    features: [
      "12 destinasi wisata",
      "Wisata budaya tradisional",
      "Akses mudah dijangkau",
    ],
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Peternakan",
    image: "/potensi-peternakan.png",
    description:
      "Usaha peternakan sapi, kambing, dan unggas dengan sistem pemeliharaan modern dan pakan alami berkualitas.",
    features: ["320 kepala ternak", "Pakan organik lokal", "Sistem modern"],
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    iconColor: "text-orange-600",
  },
];

const investasiData = [
  {
    id: 1,
    title: "Agrowisata Terpadu",
    roi: "25-35%",
    description:
      "Pengembangan kawasan agrowisata dengan konsep farm-to-table, edukasi pertanian, dan homestay tradisional.",
    investasiMinimal: "Rp 500 Jt",
    periode: "3-5 Tahun",
    color: "green",
    bgColor: "bg-green-50",
    buttonColor: "bg-green-600 hover:bg-green-700",
    icon: <Leaf className="w-6 h-6 text-green-600" />,
  },
  {
    id: 2,
    title: "Industri Pengolahan",
    roi: "20-30%",
    description:
      "Pembangunan fasilitas pengolahan hasil pertanian dan peternakan dengan teknologi modern untuk meningkatkan nilai tambah.",
    investasiMinimal: "Rp 800 Jt",
    periode: "4-6 Tahun",
    color: "blue",
    bgColor: "bg-blue-50",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    icon: <Factory className="w-6 h-6 text-blue-600" />,
  },
];

const PotensiDesa = () => {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistikData.map((item, index) => (
              <StatCard
                key={index}
                icon={item.icon}
                jumlah={item.jumlah}
                label={item.label}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Potential Desa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kategori Potensi Utama
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desa Sidomulyo memiliki berbagai potensi unggulan yang siap
              dikembangkan untuk kemajuan bersama
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kategoriPotensi.map((kategori) => (
              <PotentialCard key={kategori.id} data={kategori} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Peluang Investasi Desa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai peluang investasi strategis yang ditawarkan oleh
              Desa Sidomulyo untuk pengembangan ekonomi berkelanjutan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investasiData.map((investasi) => (
              <div key={investasi.id} className={` p-4 rounded-xl`}>
                <InvestmentCard
                  icon={investasi.icon}
                  title={investasi.title}
                  description={investasi.description}
                  roi={investasi.roi}
                  minInvestment={investasi.investasiMinimal}
                  period={investasi.periode}
                  buttonColor={investasi.buttonColor}
                  bgcolor={investasi.bgColor}
                  onButtonClick={() => {
                    console.log(`Klik investasi: ${investasi.title}`);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Tertarik Berinvestasi?</h2>
          <p className="text-lg mb-8 text-teal-200 max-w-2xl mx-auto">
            Hubungi kami untuk diskusi lebih lanjut tentang peluang investasi
            dan kemitraan di Desa Sidomulyo
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton
              icon={<MessageCircle className="w-5 h-5" />}
              variant="primary"
            >
              WhatsApp Desa
            </CTAButton>
            <CTAButton icon={<Mail className="w-5 h-5" />} variant="secondary">
              Kirim Email
            </CTAButton>
            <CTAButton
              icon={<MessageSquare className="w-5 h-5" />}
              variant="outline"
            >
              Chat AI Assistant
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
};
export default PotensiDesa;
