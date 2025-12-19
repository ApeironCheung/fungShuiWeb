Traditional Wisdom Web Suite
A lightweight, modular web application dedicated to traditional Chinese metaphysics, divination, and classical scriptures. Built with a custom MVC (Model-View-Controller) architecture and a Subscription-based rendering system.

🌟 Key Features
Yuen Hung Flying Stars (玄空飛星): A professional Feng Shui calculator to visualize annual and monthly energy charts.

Temple Oracle Sticks (靈籤): A digital divination module supporting various traditional stick sets with randomized drawing and explanation lookups.

Classic Scripture Reader (經典導讀): A hierarchical reader for Taoist, Buddhist, and Confucian classics. Features include:

Categorized browsing (Classics vs. Sutras).

Chapter-based navigation.

Dynamic content loading.

Multi-language Support: Seamless switching between Traditional Chinese (ZH) and English (EN).

🏗️ Technical Architecture
This project follows a strict separation of concerns to ensure maintainability:

Model: Manages application state and ID-based logic (e.g., classicModel.js).

View: Handles DOM construction using a functional approach (e.g., classicView.js).

Controller: Manages event listeners and bridges User Interface with Logic (e.g., classicCtrl.js).

Subscription System: A centralized updateSubscription engine that triggers partial DOM refreshes based on state changes, optimizing performance.

Data API: A unified localization engine (getText) that handles deep-copying and language fallbacks.

├── src
│   ├── Model/        # State management & logical constants
│   ├── View/         # UI components & HTML templates
│   ├── Controller/   # Event listeners & interaction logic
│   ├── Data/         # Localization keys & scripture content
│   └── APIs/         # Global helper functions (render, localization)
├── index.html        # Main entry point
└── assets/           # CSS styles and images
