# QurriConfess 🎤

Nền tảng đọc và đăng bài viết nội bộ cho nhóm bạn thân.

## 🚀 Công nghệ

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Database
- **Lucide React** - Icons

## 🎯 Tính năng

✅ Đăng ký / Đăng nhập  
✅ Đăng bài viết ẩn danh  
✅ Xem bài viết của mọi người  
✅ Dark mode / Light mode  
✅ Xóa bài viết của chính mình  
✅ Lọc bài viết theo thời gian  

## 🔧 Setup

### 1. Clone repo

```bash
git clone https://github.com/qmac267-beep/qurriconfess.git
cd qurriconfess
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Setup Supabase

- Tạo tài khoản tại [supabase.com](https://supabase.com)
- Tạo project mới
- Chạy SQL từ `docs/database.sql` trong SQL Editor

### 4. Cấu hình môi trường

Tạo file `.env.local` từ `.env.example`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 5. Chạy dev server

```bash
npm run dev
```

Vào http://localhost:3000

## 📁 Cấu trúc

```
qurriconfess/
├── app/                 # Next.js pages
├── components/          # React components
├── lib/                 # Utilities
├── public/              # Static files
└── docs/                # Documentation
```

## 📝 License

MIT
