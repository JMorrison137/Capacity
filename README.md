# Interactive Capacity Planning Chart

A React-based interactive capacity planning dashboard built with Recharts, Tailwind CSS, and ShadCN UI components. This tool helps teams visualize story point allocations across multiple sprints with dynamic controls for team and sprint management.

![Capacity Planning Dashboard](https://github.com/user-attachments/assets/c1b3830f-d895-4c33-98bd-9c566fcedc4d)

## Features

### 📊 Interactive Charts
- **Capacity vs Commitment vs Completion**: Visualize planned capacity, committed story points, and actual completion across sprints
- **Velocity Trend Analysis**: Track team velocity over time with trend lines
- **Real-time Updates**: Charts update automatically when data changes

### 👥 Team Management
- **Dynamic Team Configuration**: Add, remove, and modify team members
- **Capacity Planning**: Set individual capacity and availability percentages
- **Automatic Calculations**: Real-time total team capacity calculations

### 🏃‍♂️ Sprint Management
- **Interactive Sprint Data**: Add new sprints and modify existing data
- **Editable Tables**: Update capacity, commitments, and completion directly in the interface
- **Data Persistence**: All changes are maintained during the session

### 🎨 Modern UI
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean Interface**: Built with Tailwind CSS for a professional look
- **Accessible Components**: Using ShadCN UI components for accessibility

## Technology Stack

- **React 19** with TypeScript for type-safe development
- **Recharts** for powerful, customizable charts
- **Tailwind CSS** for utility-first styling
- **ShadCN UI** components for consistent, accessible UI elements
- **Lucide React** for modern icons
- **Vite** for fast development and building

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JMorrison137/Capacity.git
cd Capacity
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Managing Team Members

1. Click the **Settings** button in the top right
2. In the Team Configuration panel:
   - Edit team member names by clicking on their name fields
   - Adjust individual capacity (points per sprint)
   - Set availability percentages (useful for part-time team members)
   - Add new members with the **Add Member** button
   - Remove members using the trash icon

### Managing Sprints

1. In the Sprint Management section:
   - Add new sprints by entering a name and capacity, then click **Add Sprint**
   - Edit existing sprint data directly in the table
   - Update capacity, committed points, and completed points
   - Remove sprints using the trash icon in the Actions column

### Reading the Charts

- **Blue bars**: Sprint capacity
- **Orange bars**: Committed story points
- **Green bars**: Completed story points
- **Red line**: Team velocity trend

The velocity trend chart helps identify patterns in team performance over time.

## Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── CapacityPlanningChart.tsx  # Main chart component
├── lib/
│   └── utils.ts          # Utility functions
├── App.tsx               # Main app component
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Roadmap

- [ ] Data export functionality (CSV, JSON)
- [ ] Sprint comparison views
- [ ] Burndown chart integration
- [ ] Team performance analytics
- [ ] Data persistence (local storage/database)
- [ ] Multi-team support
- [ ] Historical data visualization
