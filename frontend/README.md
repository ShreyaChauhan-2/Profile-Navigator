# **Profile Navigator using React**  

This is a **React-based Profile Navigator** with an **Admin Dashboard** for adding, editing, and deleting profiles, along with a public profile display. It also integrates **Google Maps** to show profile locations.  

## **Features**  
✅ **Dashboard** – Manage profiles with **CRUD operations**  
✅ **Profile Display** – Public page to view profiles  
✅ **Google Maps Integration** – Show profiles’ locations  
✅ **React Router** – Separate routes for **Admin & User Views**  
✅ **Responsive UI** – Styled using **Tailwind CSS**  

---

## **🛠️ Installation & Setup**  
1️⃣ **Clone the repository**  
```sh
git clone https://github.com/ShreyaChauhan-2/Profile-Navigator
```

2️⃣ **Install dependencies**  
```sh
npm install
```

3️⃣ **Get a Google Maps API Key**  
- Go to [Google Cloud Console](https://console.cloud.google.com/)  
- Enable **Maps JavaScript API**  
- Get an **API Key**  
- Add the API key in the `ProfileDisplay.js` file where Google Maps is used.

4️⃣ **Run the application**  
```sh
npm start
```

---

## **📂 Project Structure**  
```
/react-profile-dashboard
│── src/
│   ├── components/
│   │   ├── Dashboard.js            # Admin panel with sidebar
│   │   ├── ProfileManagement.js    # Add/Edit/Delete profiles
│   │   ├── ProfileDisplay.js       # Public profile list
│   ├── App.js                      # Main application with routing
│   ├── index.js                    # React entry point
│── public/
│── package.json
│── README.md
```

---

## **🛠️ Technologies Used**  
- **React.js** – UI Framework  
- **React Router** – Navigation  
- **Tailwind CSS** – Styling  
- **Google Maps API** – Location Mapping  

---

### 👨‍💻 **Author**  
Developed by **Shreya Chauhan** 🚀

---