import { Home, Bookmark, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function NavBar2({
  handleTabChange,
  activeTab: parentActiveTab,
}) {
  const [activeTab, setActiveTab] = useState(parentActiveTab || "Feed");

  const changeTab = (tab) => {
    setActiveTab(tab);
    handleTabChange && handleTabChange(tab);
  };

  return (
    <div className="flex items-center m-4 bg-[#1E1E1E] rounded-lg px-2 py-1 space-x-4 text-sm">
      <NavItem
        icon={<Home size={16} />}
        label="Feed"
        active={activeTab === "Feed"}
        handleTabChange={changeTab}
      />
      <NavItem
        icon={<MessageCircle size={16} />}
        label="Chat"
        active={activeTab === "Chat"}
        handleTabChange={changeTab}
      />
      <NavItem
        icon={<Bookmark size={16} />}
        label="Bookmarks"
        active={activeTab === "Bookmarks"}
        handleTabChange={changeTab}
      />
    </div>
  );
}

function NavItem({ icon, label, active, handleTabChange }) {
  return (
    <button
      onClick={() => handleTabChange(label)}
      className={`flex items-center w-full justify-around space-x-1 px-2 py-1 rounded-lg transition-colors 
        ${active ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}
