const mode = document.getElementById("mode");
const hasil = document.getElementById("hasil");

const DATA = {
  kecepatan: { nama: "Kecepatan", rumus: "v = s ÷ t", satuan: "m/s", butuh: ["jarak", "waktu"], hitung: (n) => n.jarak / n.waktu },
  jarak: { nama: "Jarak", rumus: "s = v × t", satuan: "m", butuh: ["kecepatan", "waktu"], hitung: (n) => n.kecepatan * n.waktu },
  waktu: { nama: "Waktu",rumus: "t = s ÷ v", satuan: "s", butuh: ["jarak", "kecepatan"], hitung: (n) => n.jarak / n.kecepatan },
};

function ambil(nama) {
  return document.getElementById(nama);
}
function aturKolom() {
  ["jarak", "waktu", "kecepatan"].forEach(function (nama) {
    ambil("box-" + nama).style.display = nama === mode.value ? "none" : "block";
    ambil(nama).classList.remove("error");
  });
  hasil.textContent = "";
  hasil.className = "";
}

function tampilkanError(pesan) {
  hasil.className = "salah";
  hasil.textContent = pesan;
}

function hitung() {
  const pilihan = DATA[mode.value];
  const angka = {};
  const kosong = [];

  hasil.className = "";
  pilihan.butuh.forEach(function (nama) {
    const input = ambil(nama);
    const nilai = parseFloat(input.value);
    input.classList.remove("error");

    if (isNaN(nilai) || nilai < 0) {
      input.classList.add("error");
      kosong.push(nama);
    }
    angka[nama] = nilai;
  });

  if (kosong.length > 0) {
    tampilkanError("Isi " + kosong.join(" dan ") + " dengan angka 0 atau lebih.");
    return;
  }
  if (mode.value === "kecepatan" && angka.waktu === 0) {
    ambil("waktu").classList.add("error");
    return tampilkanError("Waktu tidak boleh 0.");
  }
  if (mode.value === "waktu" && angka.kecepatan === 0) {
    ambil("kecepatan").classList.add("error");
    return tampilkanError("Kecepatan tidak boleh 0.");
  }

  const jawaban = pilihan.hitung(angka);
  const teks = Number(jawaban.toPrecision(6)).toLocaleString("id-ID");

  hasil.innerHTML =
    "<strong>" + pilihan.nama + " = " + teks + " " + pilihan.satuan + "</strong>" +
    "Rumus: " + pilihan.rumus;
}

mode.addEventListener("change", aturKolom);
document.getElementById("hitung").addEventListener("click", hitung);
aturKolom();
