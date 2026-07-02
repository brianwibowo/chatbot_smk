# Materi Instalasi Motor Listrik
## MEKANIS — Komponen Kelistrikan pada Instalasi Motor Listrik
### Kelas XI SMK — Fase F

1.  **Saklar TPST**

Saklar TPST (*Triple Pole Single Throw*) merupakan jenis saklar yang memiliki tiga kutub (*triple pole*) dan satu posisi kontak (*single throw*). Saklar ini dirancang untuk menghubungkan atau memutus tiga penghantar fasa secara bersamaan sehingga seluruh fasa dapat dikendalikan dalam satu kali pengoperasian. TPST hanya memiliki dua kondisi kerja, yaitu **ON** dan **OFF**. Saat saklar berada pada posisi ON, ketiga fasa akan terhubung ke beban, sedangkan pada posisi OFF seluruh fasa akan terputus secara serentak. Karakteristik tersebut menjadikan TPST sebagai saklar yang sederhana, mudah dioperasikan, dan aman untuk sistem tenaga listrik tiga fasa.

*[Gambar 1. Saklar TPST]*

Dalam instalasi motor listrik, saklar TPST umumnya digunakan sebagai saklar utama (*main switch*) atau saklar pemutus daya sebelum rangkaian kontrol maupun motor memperoleh suplai listrik. Penggunaan saklar ini bertujuan untuk menghubungkan dan memutus sumber tegangan tiga fasa secara cepat serta memberikan perlindungan saat dilakukan pemeriksaan atau pemeliharaan pada motor listrik. Karena seluruh fasa diputus secara bersamaan, risiko masih adanya tegangan pada salah satu penghantar dapat diminimalkan sehingga keselamatan kerja menjadi lebih terjamin.

2.  **Saklar TPDT**

Saklar TPDT (*Triple Pole Double Throw*) merupakan jenis saklar yang memiliki tiga kutub (*triple pole*) dan dua pilihan jalur kontak (*double throw*). Berbeda dengan TPST yang hanya memiliki fungsi menghubungkan dan memutus rangkaian, TPDT mampu mengalihkan hubungan ketiga fasa dari satu jalur ke jalur lainnya dalam satu kali pengoperasian. Setiap kutub memiliki dua kontak keluaran sehingga saklar ini dapat memilih salah satu dari dua konfigurasi rangkaian sesuai kebutuhan sistem.

*[Gambar 2. Saklar TPDT]*

Dalam instalasi motor listrik, saklar TPDT sering digunakan pada rangkaian yang memerlukan perubahan hubungan fasa, misalnya untuk membalik arah putaran motor tiga fasa (*forward-reverse*) atau memilih dua sumber maupun dua mode operasi yang berbeda. Kemampuan mengalihkan ketiga fasa secara bersamaan membuat proses perpindahan rangkaian menjadi lebih praktis, efisien, dan aman dibandingkan melakukan perubahan sambungan kabel secara manual. Oleh karena itu, TPDT banyak diterapkan pada sistem kendali motor yang membutuhkan fleksibilitas dalam pengoperasiannya.

3.  **MCB (Miniature Circuit Breaker)**

MCB (*Miniature Circuit Breaker*) atau Miniatur Pemutus Sirkuit adalah sebuah perangkat elektromekanikal yang berfungsi sebagai pelindung rangkaian listrik dari arus yang berlebihan.  Dengan kata lain, MCB dapat memutuskan arus listrik secara otomatis ketika arus listrik yang melewati MCB tesebut melebihi nilai yang ditentukan. Namun saat arus dalam kondisi normal, MCB dapat berfungsi sebagai saklar yang bisa menghubungkan atau memutuskan arus listrik secara manual.

*[Gambar 3. Miniature Circuit Breaker]*

MCB pada dasarnya memiliki fungsi yang hampir sama dengan Sekering (FUSE) yaitu memutuskan aliran arus listrik rangkaian ketika terjadi gangguan kelebihan arus. Terjadinya kelebihan arus listrik ini dapat dikarenakan adanya hubung singkat (*Short Circuit*) ataupun adanya beban lebih (*Overload*). Namun MCB dapat di-ON-kan kembali ketika rangkaian listrik sudah normal, sedangkan Fuse/Sekering yang terputus akibat gangguan kelebihan arus tersebut tidak dapat digunakan lagi. Dalam system pengendali, MCB berfungsi sebagai pembagi dan pembatas arus listrik antara rangkaian kontrol dan rangkaian daya.

4.  **Kontaktor Magnetik**

Kontaktor magnetik adalah sebuah komponen yang berfungsi sebagai penghubung/kontak dengan kapasitas yang besar dengan menggunakan daya minimal. Dalam arti lain kontaktor magnetik adalah sebuah relay yang memiliki kapasitas besat. Pada umumnya Kontaktor Magnetik terdiri dari 3 pole kontak utama dan kontak bantu. Untuk menghubungkan kontak utama hanya dengan cara memberikan tegangan pada koil kontaktor sesuai spesifikasinya. Komponen utama dari sebuah kontaktor magnetic adalah koil dan kontak utama

*[Gambar 4. Kontaktor Magnetik]*

Koil dipergunakan untuk menghasilkan medan magnet yang akan menarik kontak utama sehingga terhubung pada masing masing pole.kontaktor magnetic secara luas diaplikasikan dalam rangkaian pengendalian, terutama mengendalikan motor atau perangkat listrik lainnya.

5.  **TOR (Thermal Overload Relay)**

*Thermal relay* atau *overload relay* adalah peralatan switching yang peka terhadap suhu dan akan membuka atau menutup kontaktor pada saat suhu yang terjadi melebihi batas yang ditentukan atau peralatan kontrol listrik yang berfungsi untuk memutuskan jaringan listrik jika terjadi beban lebih.

*[Gambar 3. Bagian-bagian Thermal Overload Relay (TOR)]*

*Thermal overload relay* bekerja memutus rangkaian dengan cara mendeteksi panas yang diakibatkan oleh arus yang mengalir pada elemen bimetal yang terdapat pada *thermal overloar relay* itu sendiri. Cara kerja thermal overload relay hanya mendeteksi panas dari arus listrik yang mengalir pada kumparan motor listrik namun disebabkan thermal *overload relay* dipasang seri terhadap motor listrik maka arus yang mengaliar pada kumparan motor listrik sama dengan arus yang mengalir pada kontak bimetal thermal overload relay.

6.  **TDR (Time Delay Relay)**

TDR (*Time Delay Relay*) adalah relay yang bekerja berdasarkan pengaturan waktu (*time delay*), yaitu memberikan jeda tertentu sebelum kontak relay berubah posisi setelah menerima atau kehilangan sinyal kendali. Berbeda dengan relay biasa yang bekerja secara langsung ketika diberi tegangan, TDR memiliki mekanisme penundaan yang dapat diatur sesuai kebutuhan, mulai dari beberapa detik hingga beberapa menit. Penundaan waktu ini memungkinkan urutan kerja suatu rangkaian listrik berlangsung secara otomatis dan terkontrol.

*[Gambar 6. Time Delay Relay]*

Dalam instalasi motor listrik, TDR digunakan untuk mengatur urutan pengoperasian komponen pada rangkaian kontrol sehingga proses kerja motor menjadi lebih aman dan efisien. Salah satu penerapan yang paling umum adalah pada rangkaian starter bintang-segitiga **(**star-delta**)**, di mana TDR memberikan jeda waktu sebelum perpindahan dari hubungan bintang (*star*) ke segitiga (*delta*). Selain itu, TDR juga digunakan pada sistem kendali otomatis, seperti pengoperasian motor secara bertahap (*sequential control*), pengaturan waktu hidup atau mati motor, serta pengendalian beban yang memerlukan jeda waktu tertentu. Dengan penggunaan TDR, proses pengoperasian motor menjadi lebih teratur, mengurangi arus awal yang tinggi, serta membantu meningkatkan keandalan dan umur pakai peralatan listrik.

7.  **Push Button**

Push Button switch (saklar tombol tekan) adalah perangkat / saklar sederhana yang berfungsi untuk menghubungkan atau memutuskan aliran arus listrik dengan sistem kerja tekan unlock (tidak mengunci). Sistem kerja unlock disini berarti saklar akan bekerja sebagai device penghubung atau pemutus aliran arus listrik saat tombol ditekan, dan saat tombol tidak ditekan (dilepas), maka saklar akan kembali pada kondisi normal.

*[Gambar 4. Push Button]*

Sebagai device penghubung atau pemutus, push button switch hanya memiliki 2 kondisi, yaitu On dan Off (1 dan 0). Istilah On dan Off ini menjadi sangat penting karena semua perangkat listrik yang memerlukan sumber energi listrik pasti membutuhkan kondisi On dan Off. Karena sistem kerjanya yang unlock dan langsung berhubungan dengan operator, push button switch menjadi device paling utama yang biasa digunakan untuk memulai dan mengakhiri kerja mesin di industri. Secanggih apapun sebuah mesin bisa dipastikan sistem kerjanya tidak terlepas dari keberadaan sebuah saklar seperti push button switch atau perangkat lain yang sejenis yang bekerja mengatur pengkondisian On dan Off.

8.  **Pilot Lamp**

Sebuah Pilot lamp atau dalam bahasa indonesia lampu pilot merupakan sebuah lampu LED yang biasa digunakan sebagai lampu indikator dalam rangkaian sebuah alat atau mesin. Pilot lamp tersebut dapat bekerja sebagai mestinya jika dialiri daya daya AC sebesar 220 VAC dengan toleransi 110 -- 240 VAC. Warna yang dihasilkan Pilot lamp ini adalah lapu putih. Karena fungsinya sebagai lampu indikator, Pilot lamp ini dibuat warna warni sinarnya dengan menambahkan penutup kaca yang berwarna sehingga tampak dari luar berwarna sinar yang dihasilkan.

*[Gambar 5. Pilot Lamp]*

Biasanya warna Pilot lamp ini ada 3 macam merah, hijau, kuning. Dalam control magnetik alat ini tergolong sebagai sinyal output yang berperan sebagai lampu indikator yang mengindikasikan/menunjukan apakah rangkaian itu telah aktif. Output dari control magnetik tersebut dihubungkan ke pilot lamp ini jika rangkaian tersebut sudah benar maka ketika rangkaian aktif alat ini akan aktif (menyala). Ketika Pilot lamp tersebut menyala kita dapat mengetahui bahwa rangkaian control magnetik tersebut sudah benar atau aktif. Karena fungsinya sebagai lampu indikatior pilot lamp ini akan bekerja jika dan hanya jika mendapat aliran listrik. Pilot lamp jumlahnya tergantung dari keperluan, dengan warna-warna yang dimiliki pilot lamp tersebut dapat mengindikasikan indikator yang berbeda. Biasanya lampu warna merah menunjukkan rangkaian tersebut tidak aktif, lampu warna hijau menunjukkan rangkaian itu aktif.

9.  **NO**

NO (*Normally Open*) adalah jenis kontak pada komponen listrik, seperti relay, kontaktor, maupun push button, yang dalam kondisi normal atau saat belum diberi energi berada pada posisi terbuka (*open*) sehingga arus listrik tidak dapat mengalir melalui kontak tersebut. Ketika komponen diaktifkan atau kumparannya (*coil*) diberi tegangan, kontak NO akan berubah menjadi tertutup (*closed*) sehingga arus listrik dapat mengalir dan rangkaian menjadi aktif. Dengan demikian, kondisi normal kontak NO adalah tidak menghantarkan arus, sedangkan saat bekerja kontak akan menutup untuk menghubungkan rangkaian.

*[Gambar 9. Normally Open (O)]*

Dalam instalasi motor listrik, kontak NO banyak digunakan sebagai kontak pengendali pada rangkaian kontrol. Contoh penerapannya terdapat pada *push button START**,*** kontak bantu (*auxiliary contact*) kontaktor untuk rangkaian pengunci (*self-holding*), serta berbagai sistem kontrol otomatis. Pada push button START, kontak NO akan menutup saat tombol ditekan sehingga kumparan kontaktor memperoleh tegangan dan motor mulai beroperasi. Setelah kontaktor bekerja, kontak bantu NO akan menutup untuk mempertahankan suplai ke kumparan kontaktor meskipun tombol START telah dilepas. Oleh karena itu, kontak NO berperan penting dalam proses mengaktifkan dan mempertahankan kerja motor listrik sesuai dengan rancangan sistem kontrol.

10. **NC**

NC (*Normally Closed*) adalah jenis kontak pada komponen listrik, seperti relay, kontaktor, maupun push button, yang dalam kondisi normal atau saat belum diberi energi berada pada posisi tertutup (*closed*) sehingga arus listrik dapat mengalir melalui kontak tersebut. Ketika komponen diaktifkan atau kumparannya (*coil*) diberi tegangan, kontak NC akan berubah menjadi terbuka (*open*) sehingga aliran arus listrik terputus. Dengan demikian, kondisi normal pada kontak NC adalah menghantarkan arus, sedangkan saat bekerja kontak akan memutus rangkaian.

*[Gambar 10. Normally Close]*

Dalam instalasi motor listrik, kontak NC banyak digunakan sebagai elemen pengaman dan pengendali pada rangkaian kontrol. Contohnya, kontak NC digunakan pada *push button STOP*, kontak *overload relay* (OLR)**,** serta rangkaian *interlock* pada sistem kendali motor. Pada *push button STOP*, arus akan mengalir selama tombol tidak ditekan, kemudian terputus saat tombol ditekan sehingga motor berhenti beroperasi. Sementara itu, pada *overload relay*, kontak NC akan terbuka ketika terjadi beban lebih sehingga memutus rangkaian kontrol dan menghentikan motor untuk mencegah kerusakan pada peralatan listrik.

