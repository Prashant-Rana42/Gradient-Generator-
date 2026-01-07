# 🌈 Linear Gradient Generator — React Project

A simple and customizable **React-based gradient generator** that allows users to create, preview, and download linear gradients as images. Built using React Hooks and `html2canvas`, the tool offers full control over colors, angle, stops, aspect ratio, and export scale.

---

## ✨ Features

- 🎨 Pick two colors and adjust gradient stops  
- 🔄 Random gradient generator (Shuffle option)  
- 📐 Adjust angle (0°–360°)  
- 📏 Choose aspect ratios (1:1, 16:9, 9:16, etc.)  
- 🔍 Scale multiplier for high-resolution exports  
- 🖼 Export gradient as PNG using `html2canvas`  
- ⚡ Smooth slider controls with throttling for performance  
- 📱 Responsive UI  

---

## 🛠 Tech Stack

- **React (Hooks)**  
- **html2canvas**  
- **CSS / Flexbox**

---

## 📦 Features Inside the Code

- Custom throttle function for optimized rendering  
- Real-time live preview of gradients  
- Controlled components for all sliders & inputs  
- `useRef` to capture gradient preview for export  
- Dynamic CSS gradient generation

---

## 🚀 Getting Started

### Prerequisites
- Node >= 14
- npm or yarn

### Install & Run
```bash
# clone
git clone https://github.com/Prashant-Rana42/Gradient-Generator-.git
cd Gradient-Generator

# install
npm install
# or
yarn

# start dev server (Vite / CRA)
npm run dev
# or
npm start
