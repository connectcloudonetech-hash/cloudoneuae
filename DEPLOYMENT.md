# Deployment Guide for Hostinger

This guide explains how to deploy your Cloud One Technologies website to Hostinger. Since this is a full-stack application (React + Node.js + SQLite), a **VPS (Virtual Private Server)** is the recommended hosting plan.

## Option 1: Hostinger VPS (Recommended)

A VPS gives you full control to run Node.js and the Express backend.

### 1. Prepare your VPS
*   Log in to your Hostinger hPanel.
*   Go to **VPS** and ensure you have a server running (Ubuntu 22.04 is recommended).
*   Install Node.js and NPM:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

### 2. Upload your Code
*   You can use Git to clone your repository or upload files via SFTP (using FileZilla).
*   Upload all files **except** `node_modules` and `.env`.

### 3. Install and Build
Navigate to your project folder on the server:
```bash
npm install
npm run build
```

### 4. Set Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=production
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
CONTACT_EMAIL=info@cloudonetechuae.com
```

### 5. Run with PM2
PM2 is a process manager that keeps your app running 24/7.
```bash
sudo npm install -g pm2
pm2 start server.ts --interpreter=npx --name "cloud-one"
pm2 save
pm2 startup
```

### 6. Configure Nginx (Reverse Proxy)
To point your domain to the app:
*   Install Nginx: `sudo apt install nginx`
*   Edit config: `sudo nano /etc/nginx/sites-available/default`
*   Update the `location /` block:
    ```nginx
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ```
*   Restart Nginx: `sudo systemctl restart nginx`

---

## Option 2: Hostinger Shared Hosting (Static Only)

If you only have Shared Hosting, you can host the **frontend**, but the contact form and database features will not work.

### 1. Build Locally
Run this command on your computer:
```bash
npm run build
```

### 2. Upload `dist` folder
*   Open **File Manager** in Hostinger hPanel.
*   Go to `public_html`.
*   Upload the **contents** of the `dist` folder directly into `public_html`.

### 3. Add `.htaccess`
Create a file named `.htaccess` in `public_html` to handle React routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Summary
*   **For full functionality:** Use a **VPS**.
*   **For just the design:** Use **Shared Hosting** and upload the `dist` folder.
