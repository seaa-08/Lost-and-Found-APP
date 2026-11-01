import zzy from "../assets/zzy.jpg";
import ding from "../assets/ding.jpg";
import dompet from "../assets/dompet.jpeg";
import kunci from "../assets/kunci.jpeg";



const data = [
    {
        id: 1,
        username: "Zayn0416",
        profileImage: zzy,
        postImage: dompet,
        status: "lost",
        category: "Dompet",
        location: "Kantin kampus",
        characteristics: "Dompet kecil berwarna kuning dengan gantungan karakter.",
        description: "Dompet hilang. Mohon hubungi jika menemukannya."
    },
    {
        id: 2,
        username: "Ding0202",
        profileImage: ding,
        postImage: kunci,
        status: "found",
        category: "Kunci",
        location: "Parkiran gedung B",
        characteristics: "Seikat kunci logam dengan ring gantungan.",
        description: "Kunci ditemukan. Mohon hubungi pemiliknya."
    }
];

export default data;