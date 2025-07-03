
 # Nexis.io

Nexis.io is a modern AI-powered note-taking app built with Next.js, shadcn/ui, and Supabase. It allows users to create, manage, and enhance their notes using advanced AI capabilities like summarization, rewriting, and translation.

## ✨Features
- User authentication (Supabase Auth)
- Create, edit, and delete notes
- AI-powered actions:
   
    ~ Summarize notes
   
    ~ Rephrase content
   
    ~ Translate notes

- Beautiful, responsive UI with shadcn/ui
  
- Dark mode support
  
- Secure cloud storage with Supabase

## Tech Stack

| Technology      | Description                |
|-----------------|----------------------------|
| **Next.js**     | React framework for the web |
| **shadcn/ui**   | Modern, accessible UI components |
| **Supabase**    | Auth & database (PostgreSQL) |
| **OpenAI API**  | AI features (summarization, etc.) |
| **Tailwind CSS**| Utility-first styling |
| **Vercel**      | Deployment & hosting |
---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/Nexis.io.git
cd Nexis.io 
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
Copy .env.example → .env.local and fill in:

.env
Copy Edit
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```
### 4. Run the Dev Server
```bash 
Copy 
Edit
npm run dev
```
### 5. Open

 http://localhost:3000

### Try Nexis at 

https://nexis-io.vercel.app

## License

[MIT](https://choosealicense.com/licenses/mit/)









