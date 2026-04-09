# 🎨 Stitch → Next.js Conversion Guide

This document explains how to convert UI designs from `/stitch` into a scalable Next.js (App Router) frontend system using SSR and OOP architecture.

---

## 📁 Stitch Structure

Each folder in `/stitch` contains:

* `code.html` → UI design
* `screen.png` → visual reference

Example:

/stitch/admin_asset_management
/stitch/admin_dashboard
/stitch/admin_requests
/stitch/user_dashboard

---

## 🎯 Goal

Transform static HTML into:

* ✅ Next.js SSR pages
* ✅ Reusable React components
* ✅ OOP service architecture
* ✅ Scalable frontend system

---

## ⚠️ Rules

* Do NOT modify `/stitch`
* Use it as design source only
* Keep UI pixel-perfect
* No hardcoding in pages
* Always split into components

---

# 🧩 Step 1: Convert Single Page

Example:

```bash
/stitch/admin_asset_management
```

### Prompt (Cursor)

```
Convert this page first into Next.js SSR + components
```

---

### What to do:

Break HTML into:

* Sidebar
* Header
* SearchBar
* Table
* Stats

---

### Create:

```
/components/layout/AdminLayout.tsx
/components/Sidebar.tsx
/components/PageHeader.tsx
/components/AssetTable.tsx
/components/AssetRow.tsx
/components/StatsCard.tsx
```

---

### SSR Page:

```tsx
export default async function Page() {
  const assets = await AssetService.getAllAssets();

  return (
    <AdminLayout>
      <AssetTable assets={assets} />
    </AdminLayout>
  );
}
```

---

# 🔁 Step 2: Extract Reusable Components

### Prompt

```
Now extract reusable components
```

---

### Goal:

Make components reusable:

* Table → reusable
* Cards → reusable
* Header → reusable

---

### Example:

```tsx
<AssetRow asset={asset} />
```

---

# 🌍 Step 3: Apply to All Pages

### Prompt

```
Apply same structure to all stitch pages
```

---

### Mapping:

| Stitch Folder          | Route            |
| ---------------------- | ---------------- |
| login                  | /login           |
| user_dashboard         | /dashboard       |
| admin_dashboard        | /admin/dashboard |
| admin_asset_management | /admin/assets    |
| admin_requests         | /admin/requests  |
| admin_reports_settings | /admin/reports   |
| asset_details          | /asset/[id]      |
| my_borrowings          | /my-borrowings   |
| borrowing_history      | /history         |

---

# 🧠 Architecture

## OOP Structure

```
/models
/services
/store
/components
```

---

## Service Example

```ts
export class AssetService {
  static async getAllAssets() {
    return mockAssets;
  }
}
```

---

# ⚡ SSR Pattern

```tsx
export default async function Page() {
  const data = await Service.method();

  return <Component data={data} />;
}
```

---

# 🎨 Styling Rules

* Keep Tailwind classes from stitch
* DO NOT redesign initially
* Maintain spacing and layout

---

# 💡 Tips

* Always split large UI into components
* Do not duplicate UI code
* Reuse layout components
* Keep logic outside UI

---

# 🚀 Final Result

You will get:

* Full Next.js frontend
* Clean architecture
* Reusable components
* Production-ready UI

---

# 🔥 Next Step

* Add Zustand (client state)
* Add API integration
* Add authentication

---
