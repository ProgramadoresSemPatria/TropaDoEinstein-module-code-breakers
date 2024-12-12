# Introduction

The NeetCode Clone is a visual representation of the recommended order to learn various algorithm topics.
It uses React Flow for creating and managing interactive graphs and uses Firebase for database storage and authentication.

# Content

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Components](#components)
- [Contexts](#contexts)

## Technologies Used

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React Flow](https://reactflow.dev)
- [Firebase](https://firebase.google.com)
- [Tailwind CSS](https://tailwindcss.com)

## Getting Started

**FIRST OF ALL:**

- Without the dependencies, the project will not run.

- To install the dependencies:

**npm install**

_To run the development server:_

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Components

- [Treemap](#Treemap)
- [Aside Section](#aside-section)
- [Modal Section](#modal-section)

## Treemap

The Treemap component is a core part of the application. It renders a treemap graph using React Flow, visually representing nodes (topics) and edges (relationships between topics). It includes features like automatic layout using dagre, custom node rendering, and interactive functionalities.

- [Treemap Structure](#Treemap-structure)
- [Props](#Props)
- [Component Logic](#Component-Logic)
- [Key Functionalities](#Key-Functionalities)
- [CustomNode Component](#CustomNode-Component)
- [initialNodes and initialEdges](#initialnodes-and-initialedges)

### Treemap Structure

For this Treemap Graph we use react flow for graph rendering, node/edge management, and controls.
To handles automatic layouting of nodes we use Dagre.
To manage modal state to display additional node information we use a custom context called [useIsModalOpenContext].(#useIsModalOpenContext)

**Dagre Layout Calculation**

- **getLayoutedElements**: A utility function that calculates and applies a top-to-bottom (TB) layout for nodes and edges using dagre.
- Adjusts node positions based on calculated layout from dagre.

# Component Logic

**State and Memoization:**

- nodes and edges: Derived from initialNodes and initialEdges, processed through getLayoutedElements for layout.
- nodeTypes: Defines a custom rendering for nodes using useMemo.

**Event Handlers:**

- handleNodeClick: Triggered when a node is clicked. It opens a modal with the node's ID.

**Custom Node Rendering**

- Nodes are styled with Tailwind CSS and have hover effects.

**Handle components:**

- Rendered conditionally to indicate input (target) and output (source) connections.
- Clicking a node triggers the handleNodeClick function to open the modal.

**Edge Styling**

- Custom edge styles (color, width, arrow marker) are applied dynamically.

**React Flow Configuration**

- Nodes and Edges: Rendered with calculated layout and custom styling.
- Controls: Provides UI controls for panning and zooming.

## Key Functionalities

1. Automatic Layout

- The getLayoutedElements function uses dagre to calculate the optimal position of nodes and edges in a top-to-bottom structure.
- Ensures that nodes don’t overlap and are spaced correctly.

2. Interactive Nodes

- Nodes are interactive and styled dynamically:
- Incoming and Outgoing Connections: Visualized using Handle components.
- On Click: Triggers a modal with additional node details (via handleNodeClick).

3. Custom Styling

- Nodes: Styled with Tailwind CSS (bg-purpleLogo, hover:bg-customPurpleBtn, etc.).
- Edges: Styled with a green stroke (--greenLogo) and custom arrow markers.

4. React Flow Integration

- Nodes and Edges: Dynamically rendered and styled.
- Controls: Enables zooming and panning for better graph exploration.
- FitView: Ensures the graph fits into the viewport.

## Props

### initialNodes and initialEdges

- Imported from a utility file (graphInfo).
- Contains the raw data for nodes and edges in the graph.

### useIsModalOpenContext

- Provides access to the setIsPrincipalModalSectionOpen function for managing modal visibility and node-specific data.

# CustomNode Component

Customizes the appearance and behavior of nodes rendered in the graph.

**Features:**

- Displays a label.
- Conditional rendering of Handle components:
- Input Handle (Position.Top): If the node has incoming edges.
- Output Handle (Position.Bottom): If the node has outgoing edges.
- Click functionality to open the modal.

# Aside Section

The AsideSection component is a sidebar. It provides navigation options (e.g., selecting a roadmap), displays progress with a progress bar, and includes a tooltip for additional guidance.

- [Aside Section Structure](#aside-section-structure)
- [Aside Section Props](#aside-section-props)
- [Aside Section States](#aside-section-states)
- [Aside Section Effects](#aside-section-effects)
- [Aside Section Key Functionalities](#aside-section-key-functionalities)

## Aside Section Structure

**Custom Components**

- ProgressBar: A reusable progress bar component.
- Context: useUserInfoContext to access user-related data.

**Key Sections**

- Header: Provides roadmap selection options (e.g., "Algorithms" and "Courses").
- Progress Bar: Displays the user's progress as a percentage of completed tasks.
- Footer: Includes a button with a tooltip for additional information.

## Aside Section Props

### Context Dependency

- userTotalProblemsStatusChecked: Represents the number of problems completed by the user out of a total of 150.

## Aside Section States

### State

**progressBarValue:**

- Tracks the progress value as a percentage.
- Initialized to 0 and updated via the useEffect hook.

## Aside Section Effects

### Effect

**useEffect:**

- Watches changes to userTotalProblemsStatusChecked.
- Calculates progress as (userTotalProblemsStatusChecked / 150) \* 100.
- Updates the progressBarValue state accordingly.
- Prevents calculations when userTotalProblemsStatusChecked is 0.

## Aside Section Key Functionalities

**Roadmap Selection**

- Two buttons (Algorithms and Courses) let the user select different roadmaps.
- Buttons include hover and active states, styled for smooth transitions using Tailwind CSS.

**Progress Bar**

- Displays the progress as a bar using the ProgressBar component.
- Accompanied by a text representation of progress in the format (X / 150).

**Tooltip**

- Wraps a button with a Material-UI QuestionMarkTwoToneIcon.
- Explains the purpose of the sidebar with the tooltip message: "What is this?".

# Modal Section

The ModalSection component serves as a modal interface that dynamically displays detailed information based on user interactions. It includes a progress bar, a list of prerequisites, and a data table. The modal fetches and processes data from both Firebase and local storage, ensuring the user's progress and related information are presented correctly.

- [Modal Section Structure](#modal-section-structure)
- [Modal Section Props](#modal-section-props)
- [Modal Section Table](#modal-section-table)

## Modal Section Structure

- [Custom Components](#custom-components)
- [Modal Section Contexts](#modal-section-contexts)
- [Data](#data)
- [Types](#types)

### Custom Components:

- CustomButton: For rendering a button to close the modal.
- ProgressBar: For visually representing progress.
- PrerequisiteCard: For displaying individual prerequisites.
- ModalSectionTable (dynamic import): Displays a table of problems related to the selected topic.

### Modal Section Contexts

- IsModalOpenContext: Tracks modal open/close state and associated metadata.
- NumberOfProblemsTableContext: Provides data on problem counts and status.
- AuthContext: Manages authentication state.
- UserInfoContext: Manages user-related information fetched from Firebase or local storage.

### Utility Functions:

- getDataFromDB: Fetches data from Firebase.
- validateUserDataFromDBType: Validates user data format.

### Data

- problemsData: Contains predefined roadmap data.

### Types

- GraphType and PrerequisitesType: Define the structure of roadmap and prerequisite data.

## Modal Section Props

- [Context Dependencies](#context-dependencies)
- [AuthContext](#authcontext)
- [UserInfoContext](#userinfocontext)
- [Modal Section States](#modal-section-states)
- [Modal Section Effects](#modal-section-effects)

### Context Dependencies

**IsModalOpenContext**

- isPrincipalModalSectionOpen: Determines if the modal is open and its associated ID.
- setIsPrincipalModalSectionOpen: Function to close the modal.
- principalModalTitle: Title displayed at the top of the modal.

**NumberOfProblemsTableContext**

- numberOfProblemsModalTable: Contains information about total problems and checked problems.

### AuthContext

- userAuth: Contains authentication state, including the user's uid.

### UserInfoContext

- setUserDataFromDatabase: Updates the user's data in context.

## Modal Section State and Effects

### Modal Section States

**prerequisiteData**

- Stores prerequisite information for the selected roadmap topic.
- Initialized as an empty array.

**progressBarInfo**

- Tracks progress bar details, including value, total problems, and resolved problems.
- Initialized with default values (e.g., progress value set to 0).

### Modal Section Effects

**Calculate Progress**

Calculates progress as a percentage and updates progressBarInfo.
Triggers whenever the modal ID or problem table data changes.

**Fetch Data**

Fetches resolved problem data from Firebase or local storage.
Determines the source (Firebase or local storage) based on the user's authentication state.

**Populate Prerequisites**

Extracts prerequisite information for the selected roadmap topic from problemsData.
Updates prerequisiteData state.

**Dynamic Table**

Dynamically imports and renders ModalSectionTable for displaying detailed problem data.

## Modal Section Table

The ModalSectionTable component displays a dynamic table of problem-solving tasks for a roadmap. Users can mark problems as solved, star them for importance, and access problem and solution links. The table also tracks and saves user progress in the database or local storage.

### Features

- Dynamic Table Population: Populates the table with data based on the selected roadmap section.

**User Interaction:**

- Mark problems as solved using a checkbox.
- Star problems for prioritization.
- Access problem and solution links directly from the table.

**Real-Time Progress Tracking:**

- Tracks the number of solved problems and updates the progress bar dynamically.
- Saves progress data to Firebase or local storage based on user authentication.

**Custom Styling:**

- Differentiates rows with solved problems using background colors.
- Displays difficulty with distinct colors for "Easy," "Medium," and "Hard."

### State Management

**State Variables:**

- tableData: Stores the current table data (problems, solved status, starred status, etc.)
- initialTableDataRef: Tracks the initial state of the table for detecting changes.

### Effects

- Data Population: Fills the table when the modal is open.
- Progress Tracking: Updates progress bar data whenever tableData changes.
- Data Saving: Saves user progress either to Firebase or local storage.

# Contexts

To ensure that the code would be clean and the application would have access to all of the shared states, we've encapsulate the context into a single wrapper which is called **ProviderWrapper**.
Here you can see the contexts that compose the Provider:

- [isModalOpenContext](#is-modal-open-context)
- [NumberOfProblemsTableContext](#number-of-problems-table-context)
- [TreemapContext](#treemapcontext)
- [UserInfoContext](#user-info-context)
- [WhatsThisContext](#whats-this-context)

# isModalOpenContext

The **IsModalOpenContext** provides a way to manage and access the state related to the visibility and configuration of the principal modal into the application.
The modal that is opened when you a card is clicked is managed by this context.

## Context Values

**isPrincipalModalSectionOpen:**

- Type: { value: boolean; id: number }
- Description: Tracks whether the modal is open (value) and its associated ID (id).

**setIsPrincipalModalSectionOpen:**

- Type: (value: { value: boolean; id: number }) => void
- Description: Function to update the modal's open state and ID.

**principalModalTitle:**

- Type: string
- Description: The title of the modal.

**setPrincipalModalTitle:**

- Type: (value: string) => void
- Description: Function to update the modal title.

# NumberOfProblemsTableContext

The **NumberOfProblemsTableContext** manages and provides access to the state related to the modal table's problem count and status in the application.

## Context Values

**numberOfProblemsModalTable:**

- Type: { quantityTableData: number; totalStatusChecked: number }
- Description: Represents the current state of the modal table:
- quantityTableData: Number of table data items.
- totalStatusChecked: Count of checked statuses.

**setNumberOfProblemsModalTable:**

- Type: (value: { quantityTableData: number; totalStatusChecked: number }) => void
- Description: Function to update the numberOfProblemsModalTable state.

# User Info Context

The UserInfoContext is a designed to manage and provide user-related data across the application. This includes user information retrieved from the database and their total problems' status checked.

## Context Values

**userDataFromDatabase**

- Type: UserDataFromDBArrayType
- Default Value: An empty array [].
- Description: Represents the user's data fetched from the database.

**setUserDataFromDatabase:**

- Type: (value: UserDataFromDBArrayType) => void
- Description: Function to update the userDataFromDatabase state.

**userTotalProblemsStatusChecked:**

- Type: number
- Default Value: 0.
- Description: Represents the total number of problems checked by the user.

**setUserTotalProblemsStatusChecked:**

- Type: (value: number) => void
- Description: Function to update the userTotalProblemsStatusChecked state.

# WhatsThisContext

The **WhatsThisContext** is a React context that provides state management for controlling the visibility of a "What's This?" section into the application.

## Context Values

**isWhatsThisOpen**

- Type: boolean
- Default Value: false
- Description: Indicates whether the "What's This?" modal or section is open (true) or closed (false).

**setWhatsThisOpen**

- Type: (value: boolean) => void
- Description: A function to update the state of isWhatsThisOpen. Pass true to open or false to close the modal.
