# Knowledge Test PT MAUJU

Saya melakukan sedikit improvisasi pada bagian public API, yakni menggunakan MockAPI.io. Hal ini dilakukan karena Reqres tidak fleksibel dalam penyediaan data untuk operasi CRUD. Selain itu, karena keterbatasan kemampuan dari MockAPI.io, saya menggunakan method GET untuk login, dan memfilternya untuk mendapatkan user yang sesuai.

## Akun Login
- Email: `user123@hotmail.com`
- Password: `user123`

## State Management
Saya juga mengimplementasikan state management menggunakan **Zustand** untuk mengelola data pengguna dan state di dalam aplikasi ini.

## Live Demo
[Cek demo aplikasi di sini](#)  <!-- https://knowledge-test-mauju.vercel.app/ -->

## Panduan Menjalankan Aplikasi

Berikut adalah langkah-langkah untuk menjalankan aplikasi ini secara lokal:

1. **Clone repositori ini**:
    ```bash
    git clone https://github.com/ajopi/knowledge-test-mauju
    cd knowledge-test-mauju
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Jalankan aplikasi**:
    ```bash
    npm start
    ```

4. **Akses aplikasi**:
   Buka browser dan akses `http://localhost:3000`.

## Teknologi yang Digunakan
- **React.js**
- **Zustand** untuk state management
- **MockAPI.io** untuk API public improvisasi
- **MUI** untuk UI components
- **React Router** untuk navigasi antar halaman
