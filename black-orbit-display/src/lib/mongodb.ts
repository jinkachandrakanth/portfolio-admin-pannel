// Mock data providers for client-side use
// This file replaces the server-side MongoDB connection

// Mock skill data
export const getSkills = () => {
  return [
    { _id: "1", name: "Python", icon: "python" },
    { _id: "2", name: "Java", icon: "java" },
    { _id: "3", name: "JavaScript", icon: "js" },
    { _id: "4", name: "SQL", icon: "sql" },
    { _id: "5", name: "React", icon: "react" },
    { _id: "6", name: "TypeScript", icon: "typescript" },
    { _id: "7", name: "Node.js", icon: "node" },
    { _id: "8", name: "HTML", icon: "html" },
    { _id: "9", name: "CSS", icon: "css" },
    { _id: "10", name: "MongoDB", icon: "mongodb" }
  ];
};

// Mock project data
export const getProjects = () => {
  return [
    {
      _id: "1",
      title: "Auto ML",
      description: "End-to-end AutoML pipeline automating ML workflow stages including preprocessing, model selection and hyperparameter tuning.",
      tech: ["Python", "TensorFlow", "Scikit-Learn", "PyTorch"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop",
      link: "#",
      date: "Jan 2025"
    },
    {
      _id: "2",
      title: "Multi-Link News Articles Analysis",
      description: "Web app that extracts and processes news articles for AI-powered chatbot interactions with comprehensive insights.",
      tech: ["Streamlit", "LangChain", "FAISS", "Hugging Face"],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
      link: "#",
      date: "Dec 2024"
    }
  ];
};

// Mock messages data
export const getMessages = () => {
  return [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      message: "I'm interested in collaborating on a project",
      createdAt: new Date().toLocaleString()
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Your work is impressive! Would love to connect.",
      createdAt: new Date().toLocaleString()
    }
  ];
};
